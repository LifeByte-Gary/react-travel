import React from "react";
import { AuthLayout } from "../../layouts/authLayout";
import { SignInForm } from "./SignInForm";

export const SignInPage: React.FC = (props) => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};
