"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { Sidebar, SidebarBody, SidebarLink, useSidebar, LoadingSpinner } from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  IconDashboard,
  IconUser,
  IconSettings,
  IconDevices,
  IconLogout,
  IconUsers,
  IconReportMedical,
  IconClipboardData,
  IconHomeHeart,
  IconAlertTriangle,
  IconActivity,
} from "@tabler/icons-react";

// Separate component that uses the sidebar context
function DashboardContent({ user }: { user: any }) {
  const { open } = useSidebar();
  const pathname = usePathname();

  // Define links based on user role
  const patientLinks = [
    {
      label: "Dashboard",
      href: "/dashboard/patient",
      icon: <IconDashboard className="w-5 h-5" />,
    },
    {
      label: "Health Data",
      href: "/dashboard/patient/health-data",
      icon: <IconClipboardData className="w-5 h-5" />,
    },
    {
      label: "Devices",
      href: "/dashboard/patient/devices",
      icon: <IconDevices className="w-5 h-5" />,
    },
    {
      label: "Appointments",
      href: "/dashboard/patient/appointments",
      icon: <IconHomeHeart className="w-5 h-5" />,
    },
    {
      label: "Profile",
      href: "/dashboard/patient/profile",
      icon: <IconUser className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/dashboard/patient/settings",
      icon: <IconSettings className="w-5 h-5" />,
    },
  ];

  const adminLinks = [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
      icon: <IconDashboard className="w-5 h-5" />,
    },
    {
      label: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: <IconActivity className="w-5 h-5" />,
    },
    {
      label: "Manage Users",
      href: "/dashboard/admin/users",
      icon: <IconUsers className="w-5 h-5" />,
    },
    {
      label: "Patient Reports",
      href: "/dashboard/admin/reports",
      icon: <IconReportMedical className="w-5 h-5" />,
    },
    {
      label: "Devices",
      href: "/dashboard/admin/devices",
      icon: <IconDevices className="w-5 h-5" />,
    },
    {
      label: "Alerts",
      href: "/dashboard/admin/alerts",
      icon: <IconAlertTriangle className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/dashboard/admin/settings",
      icon: <IconSettings className="w-5 h-5" />,
    },
  ];

  const links = user.role === "admin" ? adminLinks : patientLinks;

  return (
    <SidebarBody>
      <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
        {/* Logo and Brand */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">🫁</span>
            </div>
            <motion.div
              className="text-white overflow-hidden"
            >
              <motion.h1 
                className="text-lg font-bold whitespace-nowrap"
                animate={{
                  opacity: 1,
                }}
              >
                BreatheSense
              </motion.h1>
            </motion.div>
          </div>
          
          {/* Navigation Links */}
          <nav className="space-y-1">
            {links.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </nav>
        </div>
        
        {/* Logout Section */}
        <div className="mt-auto mb-4 flex-shrink-0">
          <div
            className="flex items-center justify-start gap-3 py-2 px-3 text-red-400 hover:text-red-300 hover:bg-neutral-800 rounded-lg transition-all duration-200 cursor-pointer"
            onClick={() => {
              // Handle logout here
              window.location.href = '/';
            }}
          >
            <IconLogout className="w-5 h-5 flex-shrink-0" />
            <motion.span
              className="text-sm font-medium group-hover:translate-x-1 transition duration-200 whitespace-nowrap overflow-hidden"
            >
              Logout
            </motion.span>
          </div>
        </div>
      </div>
    </SidebarBody>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar>
        <DashboardContent user={user} />
      </Sidebar>
      {/* Main content area with proper spacing */}
      <div className="md:ml-[80px] min-h-screen pt-16 md:pt-0">
        <div className="p-3 md:p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
