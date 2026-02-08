import SignInForm from "../../../../components/auth/SubAdmin/SignInForm";
import PageMeta from "../../../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SubAdminSignIn() {
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
