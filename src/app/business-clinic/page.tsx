import type { Metadata } from "next";
import HomeNavbar from "@/components/home/HomeNavbar";
import ClinicHero from "./ClinicHero";
import ClinicExperience from "./ClinicExperience";
import ClinicBookingCTA, { ClinicBookingProvider } from "./ClinicBookingCTA";
import ClinicIntroduction from "./ClinicIntroduction";
import ClinicServices from "./ClinicServices";
import FounderTestimonials from "./FounderTestimonials";
import styles from "./clinic.module.css";

export const metadata: Metadata = {
  title: "Business Clinic | E-Cell MIT",
  description:
    "Practical guidance. Real conversations. Meaningful progress. Business Clinic by E-Cell MIT helps founders find their next step.",
};

export default function BusinessClinicPage() {
  return (
    <ClinicBookingProvider>
      <HomeNavbar />
      <ClinicExperience>
        <a
          href="#discover"
          className="sr-only focus:not-sr-only focus:fixed focus:top-24 focus:left-6 focus:z-[80] focus:bg-white focus:p-4 focus:text-black"
        >
          Skip to Business Clinic content
        </a>
        <main>
          <ClinicHero />
          <div
            id="discover"
            className={styles.backgroundRegion}
            data-clinic-background-region
          >
            <div className={styles.standaloneBooking}>
              <ClinicBookingCTA className={styles.bookingPill} />
            </div>
            <ClinicIntroduction />
            <ClinicServices />
            <FounderTestimonials />
          </div>
        </main>
      </ClinicExperience>
    </ClinicBookingProvider>
  );
}
