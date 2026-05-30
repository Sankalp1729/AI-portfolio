"use client";

import dynamic from "next/dynamic";

const AvatarIntro = dynamic(() => import("@/components/avatar/AvatarIntro"), {
  ssr: false,
});

export default function AvatarIntroClient() {
  return <AvatarIntro />;
}
