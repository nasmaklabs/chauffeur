"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LogoutOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { signOut, useSession } from "next-auth/react";
import { App } from "antd";

export default function AdminHeader() {
  const { message } = App.useApp();
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/admin/login" });
      message.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Failed to logout");
    }
  };

  if (!session) return null;

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="AA Comfort"
              width={240}
              height={70}
              className="w-40 h-auto"
            />
            <span className="text-lg font-semibold text-gray-600 border-l pl-3 border-gray-300">
              Admin
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/admin/change-password">
            <Button size="large" icon={<LockOutlined />}>
              Change Password
            </Button>
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <UserOutlined className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {session.user?.email}
            </span>
          </div>
          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            size="large"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
