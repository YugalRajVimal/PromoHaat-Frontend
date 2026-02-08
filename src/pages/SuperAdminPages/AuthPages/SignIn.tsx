import PageMeta from "../../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Promo Haat"
        description="Admin and Sub-Admin Panel for Promo Haat"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
