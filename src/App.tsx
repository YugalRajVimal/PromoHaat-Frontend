import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import SignIn from "./pages/SuperAdminPages/AuthPages/SignIn";

import NotFound from "./pages/SuperAdminPages/OtherPage/NotFound";
import Videos from "./pages/SuperAdminPages/UiElements/Videos";
import Images from "./pages/SuperAdminPages/UiElements/Images";
import Alerts from "./pages/SuperAdminPages/UiElements/Alerts";
import Badges from "./pages/SuperAdminPages/UiElements/Badges";
import Avatars from "./pages/SuperAdminPages/UiElements/Avatars";
import Buttons from "./pages/SuperAdminPages/UiElements/Buttons";
import LineChart from "./pages/SuperAdminPages/Charts/LineChart";
import BarChart from "./pages/SuperAdminPages/Charts/BarChart";
import Calendar from "./pages/SuperAdminPages/Calendar";
import BasicTables from "./pages/SuperAdminPages/Tables/BasicTables";
import FormElements from "./pages/SuperAdminPages/Forms/FormElements";
import Blank from "./pages/SuperAdminPages/Blank";
import { ScrollToTop } from "./components/common/ScrollToTop";
// import Home from "./pages/SuperAdminPages/Dashboard/Home";
// import SubAdminSignIn from "./pages/SuperAdminPages/AuthPages/SubAdmin/SignIn";

import SubAdminAppLayout from "./layout/Admin/AppLayout";

// import UploadedExcelSheets from "./pages/SubAdminPages/UploadedExcelSheets/UploadedExcelSheets";

import HomePage from "./pages/HomePage";


import SupervisorAppLayout from "./layout/Therapist/AppLayout";
import SupervisorHome from "./pages/TherapistPages/Dashboard/Home";
// import SupervisorSignIn from "./pages/SuperAdminPages/AuthPages/Supervisor/SignIn";

// import PrivacyPolicy from "./pages/PrivacyPolicy";


import ParentAppLayout from "./layout/Parent/AppLayout";
import ParentDashboard from "./pages/UserPages/Dashboard/Home";

import SubAdminHome from "./pages/AdminPages/Dashboard/Home";

// import AppointmentBookingSystem from "./pages/AdminPages/AppointmentBookingSystem/AppointmentBookingSystem";

import AuthPage from "./pages/AuthPages/SIgnInPage";

import MyChildrens from "./pages/UserPages/AllChildrens/MyChildrens";
import MyChildrenAppointmentsPage from "./pages/UserPages/MyChildrenAppointments/MyChildrenAppointmentsPage";
import ParentProfile from "./pages/UserPages/ProfilePage/ParentProfile";
import TherapistMyAppointments from "./pages/TherapistPages/MyAppointment/MyAppointments";
import CalendarAndSchedule from "./pages/TherapistPages/CalendarAndSchedule/CalendarAndSchedule";
import TherpaistProfile from "./pages/TherapistPages/TherapistProfile/TherpaistProfile";
import RequestAppointment from "./pages/UserPages/RequestAppointment/RequestAppointment";

import RequestEditAppointments from "./pages/UserPages/RequestEditInAppointments/RequestEditInAppointments";

import InvoiveAndPaymentsPage from "./pages/UserPages/InvoiveAndPaymentsPage/InvoiceAndPaymentsPage";

import AdminProfile from "./pages/AdminPages/ProfilePage/AdminProfile";
import LogOutAdmin from "./pages/AdminPages/LogOutAdmin";
import LogOutParent from "./pages/UserPages/LogOutParent";
import LogOutTherapist from "./pages/TherapistPages/LogOutTherapist";
import MyEarningsTherapist from "./pages/TherapistPages/MyEarnings/MyEarnings";
import TherapistSignUp from "./pages/TherapistPages/TherapistSignUpAdKYC/TherapistSignUp";
import CompleteProfilePage from "./pages/TherapistPages/IncompleteProfile/CompleteProfilePage";
import ApprovalPending from "./pages/TherapistPages/IncompleteProfile/ApprovalPending";
import ParentSignUp from "./pages/UserPages/ParentSignUp/ParentSignUpp";
import ParentCompleteProfile from "./pages/UserPages/ParentSignUp/ParentCompleteProfile";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import AllTasks from "./pages/UserPages/Tasks/AllTasks";
import Referrals from "./pages/UserPages/Referrals/Referrals";
import PromotionalIncomePage from "./pages/UserPages/PromotionalIncome/PromotionalIncomePage";
import Rewards from "./pages/UserPages/Rewards/Rewards";
import CompleteKYC from "./pages/UserPages/CompleteKYC";
import PurchasePackage from "./pages/UserPages/PurchasePackage/PurchasePackage";
import WalletAndHistory from "./pages/UserPages/WalletAndHistory/WalletAndHistory";
import AdminSignInPage from "./pages/AuthPages/AdminSignInPage";
import AllUsers from "./pages/AdminPages/Users/AllUsers";
import Tasks from "./pages/AdminPages/Tasks/Tasks";
import ReferralTree from "./pages/AdminPages/Users/UsersTree";
import KycApprovalPending from "./pages/UserPages/KycApprovalPendingMain";
import Payments from "./pages/AdminPages/Payments/Payments";
import PackagesPage from "./pages/AdminPages/Packages/Packages";


export default function App() {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router >
        <ScrollToTop />
        
        <Routes>
          <Route index path="/" element={<HomePage />} />
          {/* Dashboard Layout */}
          {/* <Route element={<AppLayout />}>
         
            <Route index path="/super-admin" element={<SubAdminHome />} />
            <Route path="/super-admin/all-users" element={<AllUsers />} />
            <Route path="/super-admin/all-appointments" element={<AllAppointments />} />
            <Route path="/super-admin/onboard-sub-admin" element={<OnboardSubAdmin />} />
            <Route path="/super-admin/therapy-types" element={<TherapyTypesPage />} />
            <Route path="/super-admin/packages" element={<PackagesPage />} />
            <Route path="/super-admin/discount-coupons" element={<ManageDiscounts />} />
            <Route path="/super-admin/audit-logs" element={<AllLogs/>} />
            <Route path="/super-admin/finances" element={<FinancesSuperAdminPage/>} />
            <Route path="/super-admin/full-calendar" element={<SuperAdminFullCalendar/>} />
            <Route path="/super-admin/therapists" element={<SuperAdminTherapistsPage/>} />




            <Route path="/super-admin/profile" element={<SuperAdminProfile />} />
            <Route path="/super-admin/logout" element={<LogOutSuperAdmin />} />
       
          </Route> */}

          <Route element={<SubAdminAppLayout />}>
            <Route index path="/admin" element={<SubAdminHome />} />
            <Route path="/admin/all-users" element={<AllUsers/>} />

            <Route path="/admin/user-tree/:id" element={<ReferralTree />} />

            <Route path="/admin/manage-packages" element={<PackagesPage/>} />
            <Route path="/admin/manage-task" element={<Tasks />} />
            <Route path="/admin/manage-rewards" element={<div>Manage Rewards (HTML placeholder)</div>} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/finances" element={<Payments />} />
            <Route path="/admin/logout" element={<LogOutAdmin />} />
          </Route>


          <Route path="/admin/signin" element={<AdminSignInPage />} />


          <Route element={<SupervisorAppLayout />}>
            <Route index path="/therapist" element={<SupervisorHome />} />
            <Route path="/therapist/appointments" element={<TherapistMyAppointments />} />
            <Route path="/therapist/calendar" element={<CalendarAndSchedule />} />
            <Route path="/therapist/earnings" element={<MyEarningsTherapist/>} />
            <Route path="/therapist/profile" element={<TherpaistProfile />} />
            <Route path="/therapist/earnings" element={<MyEarningsTherapist/>} />
          

          </Route>

          <Route path="/therapist/signup" element={<TherapistSignUp />} />
          <Route path="/therapist/complete-profile" element={<CompleteProfilePage />} />
          <Route path="/therapist/pending-approval" element={<ApprovalPending/>} />
          <Route path="/therapist/logout" element={<LogOutTherapist/>} />


          <Route  element={<ParentAppLayout />}>
            <Route index path="/user" element={<ParentDashboard />} />
            <Route index path="/tasks" element={<AllTasks />} />
            <Route index path="/referral" element={<Referrals />} />
            <Route index path="/promotional-page" element={<PromotionalIncomePage />} />
            <Route index path="/rewards" element={<Rewards />} />

            <Route path="/user/profile" element={<ParentProfile />} />
            <Route path="/wallet-history" element={<WalletAndHistory />} />
          





            <Route path="/user/children" element={<MyChildrens />} />
            <Route path="/user/appointments" element={<MyChildrenAppointmentsPage  />} />
            <Route path="/user/invoices-payments" element={<InvoiveAndPaymentsPage/>} />
            <Route path="/user/request-appointment" element={<RequestAppointment />} />
            <Route path="/user/request-edit-appointment" element={<RequestEditAppointments />} />


          </Route>       

          <Route path="/user/signup" element={<ParentSignUp />} />
          <Route path="/user/complete-parent-profile" element={<ParentCompleteProfile />} />
          <Route path="/user/logout" element={<LogOutParent />} />



          <Route path="/signin" element={<AuthPage />} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/complete-kyc" element={<CompleteKYC />} />
          <Route path="/kyc-pending" element={<KycApprovalPending />} />
          <Route path="/purchase-package" element={<PurchasePackage />} />
        
          {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}

          {/* <Route path="/sub-admin/signup" element={<SubAdminSignUpForm />} /> */}

          <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />


            <Route path="/form-elements" element={<FormElements />} />


            <Route path="/basic-tables" element={<BasicTables />} />


            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />


            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
