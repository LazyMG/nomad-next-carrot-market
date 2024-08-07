import db from "@/lib/db";
import sessionLogin from "@/lib/login";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const { error, access_token } = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  }).then((result) => result.json());
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const { id, avatar_url, login } = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  }).then((result) => result.json());
  const data = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  }).then((result) => result.json());
  const email = data.filter((email) => email.primary !== true)[0].email;
  const user = await db.user.findUnique({
    where: {
      github_id: id.toString(),
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await sessionLogin(user.id);
    return redirect("/profile");
  }
  const newUser = await db.user.create({
    data: {
      username: login + "-gh",
      github_id: id.toString(),
      avatar: avatar_url,
      email,
    },
    select: {
      id: true,
    },
  });
  await sessionLogin(newUser.id);
  return redirect("/profile");
}
