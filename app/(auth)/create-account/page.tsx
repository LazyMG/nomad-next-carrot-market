"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

const CreateAccount = () => {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl gap-2 *:font-medium">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required={true}
          errors={state?.fieldErrors.username}
          maxLength={10}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.fieldErrors.confirm_password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormButton text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default CreateAccount;
