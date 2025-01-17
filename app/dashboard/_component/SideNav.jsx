"use client";

import {
  CircleUserRound,
  Grid2x2PlusIcon,
  LayoutDashboard,
  ShieldPlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const path = usePathname();
  const MenuOption = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    {
      id: 2,
      name: "Create New",
      path: "/dashboard/create-new",
      icon: Grid2x2PlusIcon,
    },
    {
      id: 3,
      name: "Upgrade",
      path: "/dashboard/upgrade",
      icon: ShieldPlusIcon,
    },
    {
      id: 4,
      name: "Account",
      path: "/dashboard/account",
      icon: CircleUserRound,
    },
  ];
  return (
    <div className="w-64 shadow-md h-screen p-5">
      <div className="grid gap-3">
        {MenuOption.map((item, index) => (
          <Link href={item.path} key={index}>
            <div
              className={`flex items-center gap-3 p-3 hover:bg-primary hover:text-white rounded-md ${
                path === item.path && "bg-primary text-white"
              }`}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
