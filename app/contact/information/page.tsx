"use client";

import ContactHeader from "@/components/Contact/ContactHeader";
import ProfileInfo from "@/components/Information/ProfileInfo";
import ContactInfo from "@/components/Information/ContactInfo";

export default function InformationPage() {
  return (
    <div className="w-full h-full relative bg-black">
      <ContactHeader pageType="information" />
      <div className="h-full absolute top-0 right-[160px] border-l border-gray-50 text-white w-[67vw] pl-24 pt-48 xl:pl-32 xl:pt-60 xl:right-[200px]">
        <ProfileInfo />
        <div className="w-full pt-40 xl:pt-64">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
