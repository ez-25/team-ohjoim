"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "콘서트", path: "/ticket" },
  { label: "앨범", path: "/album" },
  { label: "굿즈", path: "/goods" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 h-screen p-4 flex flex-col gap-4 bg-white border-r shadow">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          href={tab.path}
          className={`flex items-center justify-center rounded-lg border p-4 text-lg font-semibold
            hover:bg-gray-100 transition
            ${
              pathname.startsWith(tab.path)
                ? "bg-purple-500 text-white border-purple-500"
                : "text-gray-800 border-gray-300"
            }`}
        >
          {tab.label}
        </Link>
      ))}
    </aside>
  );
}