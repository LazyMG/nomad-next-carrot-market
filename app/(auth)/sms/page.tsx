"use client";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import React from "react";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

const SMSLogin = () => {
  const [state, dipatch] = useFormState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl gap-2 *:font-medium">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dipatch} className="flex flex-col gap-3">
        {state?.token ? (
          <FormInput
            name="token"
            type="number"
            placeholder="Verification code"
            required={true}
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <FormInput
            name="phone"
            type="text"
            placeholder="Phone number"
            required={true}
            errors={state.error?.formErrors}
          />
        )}
        <FormButton
          text={state.token ? "Verify Token" : "Send Verfication SMS"}
        />
      </form>
    </div>
  );
};

export default SMSLogin;
