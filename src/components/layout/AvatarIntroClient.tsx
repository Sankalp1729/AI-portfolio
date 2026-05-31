"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const AvatarIntro = dynamic(() => import("@/components/avatar/AvatarIntro"), {
  ssr: false,
});

export default function AvatarIntroClient() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return <AvatarIntro />;
}
