import Image from "next/image";
import styles from "./wallupi.module.css";

/** Shared layout for supplied startup endorsements; the carousel owns its frame. */
export default function FounderTestimonial({
  startup,
}: {
  startup: "wallupi" | "pars";
}) {
  const isPARS = startup === "pars";
  return (
    <div className={styles.content} data-testimonial-content>
      <div className={styles.outlines} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Image
        src={
          isPARS
            ? "/images/business-clinic/pars-logo.svg"
            : "/images/business-clinic/wallupi-logo-transparent.svg"
        }
        alt={isPARS ? "PARS" : "WallUPI"}
        width={isPARS ? 64 : 612}
        height={isPARS ? 64 : 142}
        sizes={isPARS ? "64px" : "175px"}
        unoptimized
        className={styles.logo + (isPARS ? " " + styles.parsLogo : "")}
      />
      <span className={styles.label}>FOUNDER TESTIMONIAL</span>
      <h3 className={styles.headline}>
        {isPARS ? (
          <>
            Building a startup,
            <br />
            alongside academics.
          </>
        ) : (
          <>
            From an idea
            <br />
            to a product.
          </>
        )}
      </h3>
      <blockquote className={styles.quote}>
        {isPARS ? (
          <>
            <p>
              &ldquo;MIT Manipal&rsquo;s startup ecosystem has been a valuable
              part of our journey. The Innovation Centre has given us a platform
              to pursue <strong>entrepreneurship alongside academics</strong>{" "}
              and turn our idea into a <strong>real-world solution</strong>.
            </p>
            <p>
              We look forward to continuing to grow and develop PARS.&rdquo;
            </p>
          </>
        ) : (
          <>
            <p>
              &ldquo;E-Cell MIT and MAHE&rsquo;s Innovation Centre have helped
              us turn our vision into a product. From{" "}
              <strong>incubation</strong> and{" "}
              <strong>coworking space at AB4</strong> to{" "}
              <strong>hiring an intern</strong>, their support has made a real
              difference.
            </p>
            <p>
              We&rsquo;re especially grateful to Dr. Zuber and Dr. Peter for
              their belief, guidance, and encouragement throughout our
              journey.&rdquo;
            </p>
          </>
        )}
      </blockquote>
      <div className={styles.attribution}>
        <span>{isPARS ? "Advait Balachandar" : "Arhan Sapra"}</span>
        <small>Founder, {isPARS ? "PARS" : "WallUPI"}</small>
      </div>
    </div>
  );
}
