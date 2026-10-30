import ClinicIdeaNetwork from "./ClinicIdeaNetwork";
import styles from "./clinic.module.css";

export default function ClinicIntroduction() {
  return (
    <section
      className={styles.section + " " + styles.introduction}
      aria-labelledby="intro-title"
    >
      <div data-reveal>
        <p className={styles.eyebrow}>01 / THE INTRODUCTION</p>
        <h2 id="intro-title">
          WHAT IS
          <br />
          BUSINESS CLINIC?
        </h2>
        <p className={styles.bodyCopy}>
          Business Clinic is an initiative by E-Cell MIT that helps aspiring
          entrepreneurs and early-stage founders navigate the challenges of
          building a startup.
        </p>
        <p className={styles.bodyCopy}>
          Through meaningful conversations, practical insights, and guidance
          from experienced individuals, we help founders gain clarity and
          identify their next steps.
        </p>
      </div>
      <div className={styles.clarityVisual} data-reveal>
        <ClinicIdeaNetwork />
      </div>
    </section>
  );
}
