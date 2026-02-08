import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface KYC {
  aadharNumber?: string;
  aadharFrontUrl?: string;
  aadharBackUrl?: string;
  panNumber?: string;
  panCardUrl?: string;
  kycSubmittedAt?: string;
  kycVerifiedAt?: string;
  kycStatus?: "pending" | "approved" | "rejected" | "none";
  kycRejectionReason?: string;
}

interface UserType {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  status: string;
  isDisabled: boolean;
  incompleteProfile: boolean;
  isKYCCompleted: boolean;
  kyc?: KYC;
  address?: Address;
  wallet?: number;
  leftCarry?: number;
  rightCarry?: number;
  referralCode?: string;
  referredOn?: string;
  referredBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

function getRoleColor(role: string) {
  switch (role) {
    case "user":
      return "primary";
    case "admin":
      return "purple";
    case "superadmin":
      return "success";
    default:
      return "warning";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "success";
    case "suspended":
      return "warning";
    case "deleted":
      return "error";
    default:
      return "default";
  }
}

function getKYCColor(kycStatus?: string) {
  switch (kycStatus) {
    case "approved":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
      return "error";
    default:
      return "default";
  }
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [kycAutoApprove, setKycAutoApprove] = useState<boolean>(false);
  const [kycLoading, setKycLoading] = useState<boolean>(false);
  const [kycError, setKycError] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<string | null>(null); // for per-user approve KYC
  const [bulkLoading, setBulkLoading] = useState<boolean>(false); // for Approve All
  const [approveError, setApproveError] = useState<string>("");

  // Fetch users and kycAutoApprove toggle value
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/users`
      );
      if (res.data.success) {
        setUsers(res.data.data);
        setKycAutoApprove(res.data.kycAutoApprove ?? false);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleKycAutoApprove = async () => {
    setKycLoading(true);
    setKycError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/users/kyc/auto-approve`,
        { enable: !kycAutoApprove }
      );
      if (res.data.success) {
        setKycAutoApprove(!kycAutoApprove);
      } else {
        setKycError(res.data.message || "Failed to update.");
      }
    } catch (err: any) {
      setKycError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setKycLoading(false);
    }
  };

  // Approve KYC for single user
  const handleApproveKYC = async (userId: string) => {
    setActionLoading(userId);
    setApproveError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/users/kyc/approve`,
        { userId }
      );
      if (res.data.success) {
        // Update that user's KYC status in users list
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId
              ? {
                  ...u,
                  kyc: {
                    ...u.kyc,
                    kycStatus: "approved",
                    kycVerifiedAt: new Date().toISOString(),
                    kycRejectionReason: "",
                  },
                  isKYCCompleted: true,
                }
              : u
          )
        );
      } else {
        setApproveError(res.data.message || "Failed to approve KYC.");
      }
    } catch (err: any) {
      setApproveError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(null);
    }
  };

  // Approve all pending users' KYC
  const handleApproveAllKYC = async () => {
    setBulkLoading(true);
    setApproveError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/users/kyc/approve-all`
      );
      if (res.data.success) {
        // Reload users to reflect changes
        await fetchUsers();
      } else {
        setApproveError(res.data.message || "Failed to approve all KYC.");
      }
    } catch (err: any) {
      setApproveError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <>
      <div className="overflow-y-auto h-full pb-20 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
          <h2 className="text-xl font-semibold">All Users</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                KYC Auto-Approve:{" "}
              </span>
              <Badge size="sm" color={kycAutoApprove ? "success" : "warning"}>
                {kycAutoApprove ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <button
              className={`ml-2 border border-gray-200 rounded px-3 py-1 text-xs font-semibold transition-colors ${
                kycAutoApprove
                  ? "bg-success-100 text-success-700 hover:bg-success-200"
                  : "bg-warning-100 text-warning-700 hover:bg-warning-200"
              } disabled:bg-gray-200 disabled:text-gray-400`}
              style={{ minWidth: 96 }}
              onClick={handleToggleKycAutoApprove}
              disabled={kycLoading}
            >
              {kycLoading
                ? "Updating..."
                : kycAutoApprove
                ? "Disable"
                : "Enable"}
            </button>
            <button
              type="button"
              className={`ml-2 border border-green-400 rounded px-3 py-1 text-xs font-semibold transition-colors ${
                bulkLoading
                  ? "bg-green-200 text-green-500"
                  : "bg-success-100 text-success-700 hover:bg-success-200"
              } disabled:bg-gray-200 disabled:text-gray-400`}
              style={{ minWidth: 160 }}
              onClick={handleApproveAllKYC}
              disabled={bulkLoading}
              title="Approve KYC for all users with pending KYC"
            >
              {bulkLoading ? "Approving All..." : "Approve All Pending KYC"}
            </button>
          </div>
        </div>
        {(kycError || approveError) && (
          <div className="mb-3 text-center text-xs text-red-600 font-medium">
            {kycError || approveError}
          </div>
        )}
        {loading && (
          <div className="py-10 text-center font-medium text-gray-600">
            Loading users...
          </div>
        )}
        {error && (
          <div className="py-10 text-center font-medium text-red-600">
            Error: {error}
          </div>
        )}
        {!loading && !error && (
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    KYC Status
                  </TableCell>
                  {/* Referral Code */}
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Referral Code
                  </TableCell>
                  {/* Referred By */}
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Referred By
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Wallet
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Created At
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users.length === 0 && (
                  <TableRow>
                    <TableCell
                      className="text-center py-8 text-gray-400"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
                {users.map((user) => (
                  <TableRow key={user._id}>
                    {/* Name */}
                    <TableCell className="px-5 py-3 text-gray-800 text-theme-sm dark:text-white/90">
                      <span className="block font-medium">{user.name}</span>
                    </TableCell>
                    {/* Email */}
                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {user.email || "-"}
                    </TableCell>
                    {/* Phone */}
                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {user.phone || "-"}
                    </TableCell>
                    {/* Role */}
                    <TableCell className="px-5 py-3 text-theme-sm">
                      <Badge
                        size="sm"
                        color={
                          (() => {
                            const color = getRoleColor(user.role);
                            // Only permit allowed BadgeColor: "primary" | "success" | "warning" | undefined
                            return (["primary", "success", "warning"].includes(color) ? color : undefined) as
                              | "primary"
                              | "success"
                              | "warning"
                              | undefined;
                          })()
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    {/* Status */}
                    <TableCell className="px-5 py-3 text-theme-sm">
                      <Badge
                        size="sm"
                        color={
                          (() => {
                            const color = getStatusColor(user.status);
                            // Only permit allowed BadgeColor: "success" | "warning" | "error" | undefined
                            return (["success", "warning", "error"].includes(color) ? color : undefined) as
                              | "success"
                              | "warning"
                              | "error"
                              | undefined;
                          })()
                        }
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    {/* KYC */}
                    <TableCell className="px-5 py-3 text-theme-sm">
                      <Badge
                        size="sm"
                        color={
                          (() => {
                            const color = getKYCColor(user.kyc?.kycStatus);
                            // Only permit allowed BadgeColor: "success" | "warning" | "error" | undefined
                            return (["success", "warning", "error"].includes(color) ? color : undefined) as
                              | "success"
                              | "warning"
                              | "error"
                              | undefined;
                          })()
                        }
                      >
                        {user.kyc && user.kyc.kycStatus
                          ? user.kyc.kycStatus.charAt(0).toUpperCase() +
                            user.kyc.kycStatus.slice(1)
                          : "None"}
                      </Badge>
                    </TableCell>
                    {/* Referral Code */}
                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {user.referralCode || "-"}
                    </TableCell>
                    {/* Referred By */}
                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {user.referredBy || "-"}
                    </TableCell>
                    {/* Wallet */}
                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {typeof user.wallet === "number" ? user.wallet : "-"}
                    </TableCell>
                    {/* Created At */}
                    <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    {/* Actions */}
                    <TableCell className="px-5 py-3 text-theme-sm">
                      {user.kyc?.kycStatus === "pending" && (
                        <button
                          className={`border border-green-400 rounded px-2 py-1 text-xs font-semibold transition-colors ${
                            actionLoading === user._id
                              ? "bg-green-200 text-green-500"
                              : "bg-success-100 text-success-700 hover:bg-success-200"
                          } disabled:bg-gray-200 disabled:text-gray-400`}
                          disabled={!!actionLoading || bulkLoading}
                          onClick={() => handleApproveKYC(user._id)}
                        >
                          {actionLoading === user._id
                            ? "Approving..."
                            : "Approve KYC"}
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllUsers;