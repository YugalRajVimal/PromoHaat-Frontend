import { Link } from "react-router";
import {
  FaUsers,
  FaLock,
  FaGlobe,
  FaRocket,
  FaTasks,
} from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-[#fafafa]">

      {/* Top Accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

      <div className="relative min-h-screen flex items-center justify-center px-6">

        <div className="w-full max-w-5xl text-center">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold">
              <FaRocket className="h-4 w-4" />
              PROMOHATT • DIGITAL EARNING PLATFORM
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-[42px] md:text-[56px] font-extrabold text-slate-900 leading-tight">
            Build Your Digital Income
            <br />
            With{" "}
            <span className="text-blue-600">PromoHaat</span>
          </h1>

          {/* Sub Text */}
          <p className="mt-5 max-w-2xl mx-auto text-slate-500 leading-relaxed">
            Complete real digital promotion tasks, earn consistently,
            and grow your online presence with verified campaigns.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

            <div className="px-5 py-2 rounded-lg bg-pink-100 text-pink-800 text-sm font-semibold border border-pink-200">
              🚀 10K+ Users
            </div>

            <div className="px-5 py-2 rounded-lg bg-green-100 text-green-800 text-sm font-semibold border border-green-200 flex items-center gap-2">
              <FaTasks /> 50K+ Tasks
            </div>

            <div className="px-5 py-2 rounded-lg bg-purple-100 text-purple-800 text-sm font-semibold border border-purple-200 flex items-center gap-2">
              <MdCampaign /> 500+ Campaigns
            </div>

          </div>

          {/* Main CTA */}
          <div className="mt-12 flex flex-col items-center gap-4">

            <Link
              to="/user"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all"
            >
              <FaUsers className="h-5 w-5" />
              Enter User Dashboard
              <HiOutlineArrowNarrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>

            <span className="text-sm text-blue-500 font-medium">
              Login • Complete Tasks • Withdraw Earnings
            </span>

          </div>

          {/* Trust Bar */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">

            <span className="flex items-center gap-2">
              <FaGlobe />
              Public Access
            </span>

            <span className="flex items-center gap-2">
              <FaLock />
              Secure Platform
            </span>

            <span>
              Version 1.0 (Beta)
            </span>

          </div>

          {/* Footer */}
          <div className="mt-6 text-xs text-slate-300">
            © {new Date().getFullYear()} PromoHaat. All rights reserved.
          </div>

        </div>

      </div>
    </div>
  );
};

export default HomePage;
