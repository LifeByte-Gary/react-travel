import React from "react";
import { AuthLayout } from "../../layouts/authLayout";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage: React.FC = (props) => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
