import PageMeta from "../../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
     <PageMeta
        title="Promo Haat"
        description="Admin and Sub-Admin Panel for Promo Haat"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
