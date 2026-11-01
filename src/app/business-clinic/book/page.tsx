import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HomeNavbar from "@/components/home/HomeNavbar";
import BusinessClinicForm from "../BusinessClinicForm";
import styles from "./book.module.css";

export const metadata: Metadata = {
  title: "Book a Session | Business Clinic | E-Cell MIT",
  description:
    "Book a personalized consultation session with Business Clinic by E-Cell MIT. Share your startup idea, team details, and challenges.",
};

export default function BusinessClinicBookPage() {
  const isFormEnabled =
    process.env.NEXT_PUBLIC_BUSINESS_CLINIC_FORM_ENABLED === "true";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  const isConfigured =
    isFormEnabled && Boolean(supabaseUrl) && Boolean(publicKey);

  return (
    <div className={styles.pageContainer}>
      <HomeNavbar />
      <main className={styles.mainContent}>
        <div className={styles.topNavigation}>
          <Link href="/business-clinic" className={styles.backLink}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Business Clinic</span>
          </Link>
        </div>

        {isConfigured ? (
          <BusinessClinicForm
            supabaseUrl={supabaseUrl}
            publicKey={publicKey}
          />
        ) : (
          <div className={styles.fallbackCard}>
            <p className={styles.eyebrow}>04 / BUSINESS CLINIC</p>
            <h1 className={styles.fallbackTitle}>
              Booking intake is currently unavailable
            </h1>
            <p className={styles.fallbackText}>
              The Business Clinic booking form is currently undergoing updates or
              intake is temporarily paused. Please check back soon or explore our
              resources.
            </p>
            <Link href="/business-clinic" className={styles.returnButton}>
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Return to Business Clinic</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}