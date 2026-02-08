
import SupervisorSignInForm from "../../../../components/auth/Supervisor/SignInForm";
import PageMeta from "../../../../components/common/PageMeta";
import SupervisorAuthLayout from "./AuthPageLayout";

export default function SupervisorSignIn() {
  return (
    <>
      <PageMeta
        title="Promo Haat"
        description="Admin and Sub-Admin Panel for Promo Haat"
      />
      <SupervisorAuthLayout>
        <SupervisorSignInForm />
      </SupervisorAuthLayout>
    </>
  );
}
