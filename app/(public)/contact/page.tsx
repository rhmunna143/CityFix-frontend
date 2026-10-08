import { Metadata } from "next";
import { ContactClient } from "@/components/public/ContactClient";

export const metadata: Metadata = {
  title: "Contact & Citizen Helpline - CityFix",
  description:
    "Reach CityFix municipal support, access emergency city hotlines, and send inquiries to departmental operations.",
  openGraph: {
    title: "CityFix Contact & Citizen Helpline",
    description: "Get in touch with municipal teams and city operations desk.",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
      <ContactClient />
    </div>
  );
}
