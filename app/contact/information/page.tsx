"use client";

import ContactHeader from "@/components/Contact/ContactHeader";
import ProfileInfo from "@/components/Information/ProfileInfo";
import ContactInfo from "@/components/Information/ContactInfo";

export default function InformationPage() {
  return (
    <div className="w-full h-full relative bg-black">
      <ContactHeader pageType="information" />
      <div className="h-full absolute top-0 right-0 border-l border-gray-50 text-white w-[75vw] pl-24 pt-48 xl:w-[77vw] xl:pl-32 xl:pt-64">
        <ProfileInfo />
        <div className="w-full pt-40 xl:pt-64">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
