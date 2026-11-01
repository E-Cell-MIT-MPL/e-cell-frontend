"use client";

import { useState, type FormEvent } from "react";
import styles from "./businessClinicForm.module.css";

const yearsOfStudy = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "5th year",
];

const stages = [
  "Idea Stage",
  "Prototype/MVP Developed",
  "Early Traction/Pilot Program",
  "Revenue Generating",
  "Other",
];

const supportOptions = [
  "Mentorship",
  "Funding Opportunities",
  "Networking",
  "Legal Advice",
  "Marketing Strategy",
  "Technical Development",
  "Other",
];

type Props = {
  supabaseUrl: string;
  publicKey: string;
};

export default function BusinessClinicForm({ supabaseUrl, publicKey }: Props) {
  // Navigation
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Step 1: Personal & Team Details
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [hasTeam, setHasTeam] = useState<string>(""); // "true" | "false" | ""
  const [teamStrengthRoles, setTeamStrengthRoles] = useState("");
  const [cofounderInfo, setCofounderInfo] = useState("");
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});

  // Step 2: Startup Details
  const [startupName, setStartupName] = useState("");
  const [startupDescription, setStartupDescription] = useState("");
  const [stage, setStage] = useState("");
  const [stageOther, setStageOther] = useState("");
  const [supportTypes, setSupportTypes] = useState<string[]>([]);
  const [supportOther, setSupportOther] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [websiteOrLinkedIn, setWebsiteOrLinkedIn] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState("");

  // Form Status
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function validateStep1(): boolean {
    const errors: Record<string, string> = {};

    const trimmedName = submitterName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      errors.submitterName = "Enter your full name (at least 2 characters).";
    } else if (trimmedName.length > 100) {
      errors.submitterName = "Name must be 100 characters or fewer.";
    }

    const trimmedEmail = submitterEmail.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.submitterEmail = "Enter a valid email address.";
    } else if (trimmedEmail.length > 255) {
      errors.submitterEmail = "Email must be 255 characters or fewer.";
    }

    const trimmedPhone = contactNumber.trim();
    if (!trimmedPhone || !/^\d{10,15}$/.test(trimmedPhone)) {
      errors.contactNumber = "Enter a valid contact number (10 to 15 digits).";
    }

    if (!yearOfStudy) {
      errors.yearOfStudy = "Please select your year of study.";
    }

    if (hasTeam !== "true" && hasTeam !== "false") {
      errors.hasTeam = "Please indicate whether you have a team.";
    }

    if (hasTeam === "true" && teamStrengthRoles.length > 1000) {
      errors.teamStrengthRoles = "Team strength description must be 1000 characters or fewer.";
    }

    if (cofounderInfo.length > 1000) {
      errors.cofounderInfo = "Co-founder info must be 1000 characters or fewer.";
    }

    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleSupport(option: string) {
    setSupportTypes((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Re-verify Step 1 before final submission
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }

    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setStatus("error");
      setMessage("Please choose one file that is 10 MB or smaller.");
      return;
    }

    const data = new FormData();
    // Honeypot
    data.set("companyWebsite", honeypot);

    // Page 1 fields
    data.set("submitterName", submitterName.trim());
    data.set("submitterEmail", submitterEmail.trim());
    data.set("contactNumber", contactNumber.trim());
    data.set("yearOfStudy", yearOfStudy);
    data.set("hasTeam", hasTeam);
    data.set("teamStrengthRoles", hasTeam === "true" ? teamStrengthRoles.trim() : "");
    data.set("cofounderInfo", cofounderInfo.trim());

    // Page 2 fields
    data.set("startupName", startupName.trim());
    data.set("startupDescription", startupDescription.trim());
    data.set("startupStage", stage);
    data.set("startupStageOther", stage === "Other" ? stageOther.trim() : "");
    data.set("supportTypes", JSON.stringify(supportTypes));
    data.set("supportOther", supportTypes.includes("Other") ? supportOther.trim() : "");
    data.set("additionalInfo", additionalInfo.trim());
    data.set("websiteOrLinkedIn", websiteOrLinkedIn.trim());
    if (selectedFile) data.set("supportingDocument", selectedFile);

    setStatus("submitting");
    setMessage("");

    try {
      const endpoint =
        supabaseUrl.replace(/\/$/, "") + "/functions/v1/business-clinic-submit";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { apikey: publicKey },
        body: data,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.message || "We could not send your form. Please try again.");
      }

      // Reset form
      setSubmitterName("");
      setSubmitterEmail("");
      setContactNumber("");
      setYearOfStudy("");
      setHasTeam("");
      setTeamStrengthRoles("");
      setCofounderInfo("");
      setStartupName("");
      setStartupDescription("");
      setStage("");
      setStageOther("");
      setSupportTypes([]);
      setSupportOther("");
      setAdditionalInfo("");
      setWebsiteOrLinkedIn("");
      setSelectedFile(null);
      setStep1Errors({});
      setCurrentStep(1);

      setStatus("success");
      setMessage("Thanks. Your Business Clinic request has been received.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not send your form. Please try again.",
      );
    }
  }

  return (
    <section className={styles.section} aria-labelledby="business-clinic-form-title">
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>04 / BUSINESS CLINIC</p>
          <h2 id="business-clinic-form-title">
            {currentStep === 1 ? "Tell us about yourself & your team." : "Tell us about your startup."}
          </h2>
          <p className={styles.intro}>
            {currentStep === 1
              ? "Share your contact details and team structure so our mentors can connect with you."
              : "Share what you are building and the kind of support that would help you move forward."}
          </p>
        </div>

        {/* Step progress indicator */}
        <div className={styles.stepProgressContainer} aria-label={`Step ${currentStep} of 2`}>
          <div className={styles.stepHeader}>
            <span className={styles.stepBadge}>
              Step {currentStep} of 2: {currentStep === 1 ? "Personal & Team Info" : "Startup Details"}
            </span>
          </div>
          <div className={styles.progressBar} role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={2}>
            <div
              className={styles.progressFill}
              style={{ width: currentStep === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>

        <form className={styles.form} onSubmit={submit} noValidate>
          {/* Honeypot field */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="companyWebsite">Leave this field empty</label>
            <input
              id="companyWebsite"
              name="companyWebsite"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* ========================================================= */}
          {/* PAGE 1: Personal & Team Information                      */}
          {/* ========================================================= */}
          {currentStep === 1 && (
            <div className={styles.pageContent}>
              <div className={styles.field}>
                <label htmlFor="submitterName">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="submitterName"
                  name="submitterName"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                  value={submitterName}
                  onChange={(e) => {
                    setSubmitterName(e.target.value);
                    if (step1Errors.submitterName) {
                      setStep1Errors((prev) => ({ ...prev, submitterName: "" }));
                    }
                  }}
                  className={step1Errors.submitterName ? styles.inputError : ""}
                />
                {step1Errors.submitterName && (
                  <p className={styles.fieldError} role="alert">{step1Errors.submitterName}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="submitterEmail">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="submitterEmail"
                  name="submitterEmail"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  required
                  value={submitterEmail}
                  onChange={(e) => {
                    setSubmitterEmail(e.target.value);
                    if (step1Errors.submitterEmail) {
                      setStep1Errors((prev) => ({ ...prev, submitterEmail: "" }));
                    }
                  }}
                  className={step1Errors.submitterEmail ? styles.inputError : ""}
                />
                {step1Errors.submitterEmail && (
                  <p className={styles.fieldError} role="alert">{step1Errors.submitterEmail}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contactNumber">
                  Contact Number <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  autoComplete="tel"
                  maxLength={15}
                  placeholder="e.g. 9876543210"
                  required
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                    if (step1Errors.contactNumber) {
                      setStep1Errors((prev) => ({ ...prev, contactNumber: "" }));
                    }
                  }}
                  className={step1Errors.contactNumber ? styles.inputError : ""}
                />
                {step1Errors.contactNumber && (
                  <p className={styles.fieldError} role="alert">{step1Errors.contactNumber}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="yearOfStudy">
                  Year of Study <span aria-hidden="true">*</span>
                </label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={yearOfStudy}
                  onChange={(e) => {
                    setYearOfStudy(e.target.value);
                    if (step1Errors.yearOfStudy) {
                      setStep1Errors((prev) => ({ ...prev, yearOfStudy: "" }));
                    }
                  }}
                  className={step1Errors.yearOfStudy ? styles.inputError : ""}
                  required
                >
                  <option value="">Select your year of study</option>
                  {yearsOfStudy.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {step1Errors.yearOfStudy && (
                  <p className={styles.fieldError} role="alert">{step1Errors.yearOfStudy}</p>
                )}
              </div>

              {/* Team Details Section */}
              <div className={styles.teamSection}>
                <fieldset className={styles.radioFieldset}>
                  <legend className={styles.radioLegend}>
                    Do you have a team? (Co-founder, team member, etc.) <span aria-hidden="true">*</span>
                  </legend>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="hasTeam"
                        value="true"
                        checked={hasTeam === "true"}
                        onChange={() => {
                          setHasTeam("true");
                          if (step1Errors.hasTeam) {
                            setStep1Errors((prev) => ({ ...prev, hasTeam: "" }));
                          }
                        }}
                      />
                      <span>Yes</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="hasTeam"
                        value="false"
                        checked={hasTeam === "false"}
                        onChange={() => {
                          setHasTeam("false");
                          if (step1Errors.hasTeam) {
                            setStep1Errors((prev) => ({ ...prev, hasTeam: "" }));
                          }
                        }}
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {step1Errors.hasTeam && (
                    <p className={styles.fieldError} role="alert">{step1Errors.hasTeam}</p>
                  )}
                </fieldset>

                {hasTeam === "true" && (
                  <div className={styles.conditionalTeamFields}>
                    <div className={styles.field}>
                      <label htmlFor="teamStrengthRoles">
                        If yes, what is the team strength and what are their roles?
                      </label>
                      <textarea
                        id="teamStrengthRoles"
                        name="teamStrengthRoles"
                        rows={3}
                        maxLength={1000}
                        placeholder="e.g. 3 members: 1 Tech Lead, 1 Designer, 1 Business Development"
                        value={teamStrengthRoles}
                        onChange={(e) => setTeamStrengthRoles(e.target.value)}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="cofounderInfo">
                        Name, email and contact number of Co-founder (if any)
                      </label>
                      <textarea
                        id="cofounderInfo"
                        name="cofounderInfo"
                        rows={3}
                        maxLength={1000}
                        placeholder="e.g. John Doe, john@example.com, 9876543210"
                        value={cofounderInfo}
                        onChange={(e) => setCofounderInfo(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.pageActions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleNext}
                >
                  Next Page &rarr;
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PAGE 2: Startup Details                                   */}
          {/* ========================================================= */}
          {currentStep === 2 && (
            <div className={styles.pageContent}>
              <div className={styles.field}>
                <label htmlFor="startupName">
                  Startup Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="startupName"
                  name="startupName"
                  type="text"
                  autoComplete="organization"
                  maxLength={160}
                  required
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="startupDescription">
                  Briefly describe your startup idea and the primary problem it aims to solve
                </label>
                <textarea
                  id="startupDescription"
                  name="startupDescription"
                  rows={4}
                  maxLength={2000}
                  placeholder="Tell us what problem your startup solves and your vision..."
                  value={startupDescription}
                  onChange={(e) => setStartupDescription(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="startupStage">What stage is your startup currently in?</label>
                <select
                  id="startupStage"
                  name="startupStage"
                  value={stage}
                  onChange={(event) => setStage(event.target.value)}
                >
                  <option value="">Select a stage (optional)</option>
                  {stages.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {stage === "Other" && (
                <div className={styles.field}>
                  <label htmlFor="startupStageOther">Please describe the stage</label>
                  <input
                    id="startupStageOther"
                    name="startupStageOther"
                    type="text"
                    maxLength={120}
                    required
                    value={stageOther}
                    onChange={(e) => setStageOther(e.target.value)}
                  />
                </div>
              )}

              <fieldset className={styles.options}>
                <legend>What kind of support are you seeking from the Business Clinic?</legend>
                <div className={styles.optionGrid}>
                  {supportOptions.map((option) => (
                    <label className={styles.checkOption} key={option}>
                      <input
                        type="checkbox"
                        name="supportOption"
                        value={option}
                        checked={supportTypes.includes(option)}
                        onChange={() => toggleSupport(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {supportTypes.includes("Other") && (
                <div className={styles.field}>
                  <label htmlFor="supportOther">Please describe the support you need</label>
                  <input
                    id="supportOther"
                    name="supportOther"
                    type="text"
                    maxLength={300}
                    required
                    value={supportOther}
                    onChange={(e) => setSupportOther(e.target.value)}
                  />
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor="additionalInfo">
                  Is there anything else you would like us to know about your startup?
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  maxLength={3000}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="websiteOrLinkedIn">
                  Startup website or LinkedIn profile <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  id="websiteOrLinkedIn"
                  name="websiteOrLinkedIn"
                  type="url"
                  inputMode="url"
                  maxLength={500}
                  placeholder="https://"
                  value={websiteOrLinkedIn}
                  onChange={(e) => setWebsiteOrLinkedIn(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="supportingDocument">
                  Supporting document <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  id="supportingDocument"
                  name="supportingDocument"
                  type="file"
                  accept=".pdf,.docx,.pptx,.xlsx,.png,.jpg,.jpeg"
                  onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                />
                <p className={styles.help}>
                  One PDF, DOCX, PPTX, XLSX, PNG, or JPEG file, up to 10 MB. Files are stored privately.
                </p>
              </div>

              <div className={styles.footer}>
                <div className={styles.footerButtons}>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={handleBack}
                    disabled={status === "submitting"}
                  >
                    &larr; Back
                  </button>
                  <button
                    className={styles.submit}
                    type="submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending…" : "Send request"}
                  </button>
                </div>
                <p
                  className={styles.status}
                  role={status === "error" ? "alert" : "status"}
                  aria-live="polite"
                >
                  {message}
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
