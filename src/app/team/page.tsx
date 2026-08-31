"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import team data
import {
  getAvailableYears,
  getDepartmentsForYear,
  type HeadInfo,
  teamData,
} from "@/data/teamData";

// Department Head Card Component
function DepartmentHeadCard({ head }: { head: HeadInfo }) {
  return (
    <div className="group bg-white/4 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-white/25 w-full max-w-sm mx-auto">
      {/* Profile Image */}
      <div className="relative h-80 overflow-hidden bg-neutral-900">
        <Image
          src={head.image}
          alt={head.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: head.objectPosition ?? 'center 10%' }}
          sizes="(max-width: 768px) 100vw, 350px"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {/* Social Links */}
        <div className="absolute top-6 right-6 flex gap-3">
          {head.linkedin && (
            <a
              href={head.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/70 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              aria-label={`${head.name} LinkedIn Profile`}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {head.instagram && (
            <a
              href={head.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/70 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              aria-label={`Email ${head.name}`}
            >
              <svg
                role="img"
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Instagram</title>
                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
              </svg>
            </a>
          )}
        </div>

        {/* Name and Position Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-1">{head.name}</h3>
          <p className="text-white/50 font-medium text-lg">{head.position}</p>
        </div>
      </div>
    </div>
  );
}

// Department Menu Component
function DepartmentMenu({
  departments,
  activeDepartment,
  onSelectDepartment,
}: {
  departments: string[];
  activeDepartment: string;
  onSelectDepartment: (dept: string) => void;
}) {
  return (
    <nav className="bg-white/4 border border-white/10 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Departments</h2>
      <ul className="space-y-3">
        {departments.map((department) => (
          <li key={department}>
            <button
              onClick={() => onSelectDepartment(department)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                activeDepartment === department
                  ? "bg-white/15 text-white border border-white/30"
                  : "text-white/50 hover:bg-white/8 hover:text-white border border-transparent"
              }`}
            >
              <span className="font-medium">{department}</span>
              {activeDepartment === department && (
                <svg
                  className="w-5 h-5 float-right mt-0.5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Year Filter Dropdown Component
function YearFilterDropdown({
  availableYears,
  selectedYear,
  onYearChange,
}: {
  availableYears: string[];
  selectedYear: string;
  onYearChange: (newYear: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl hover:border-white/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-medium">Academic Year: {selectedYear}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute z-20 w-full mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="py-2">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    onYearChange(year);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3 transition-colors duration-200 ${
                    selectedYear === year
                      ? "bg-white/15 text-white"
                      : "text-white/50 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{year}</span>
                    {selectedYear === year && (
                      <svg
                        className="w-5 h-5 text-white/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default function TeamPage() {
  const availableYears = useMemo(() => getAvailableYears(), []);

  const yearRange = `${new Date().getFullYear()}-${(new Date().getFullYear() + 1).toString().slice(-2)}`;
  const [selectedYear, setSelectedYear] = useState(
    availableYears[0] || yearRange,
  );

  const departments = useMemo(
    () => getDepartmentsForYear(selectedYear),
    [selectedYear],
  );
  const [activeDepartment, setActiveDepartment] = useState(departments[0]);

  const handleYearChange = (newYear: string) => {
    setSelectedYear(newYear);
    const newDepartments = getDepartmentsForYear(newYear);
    if (newDepartments.length > 0) {
      setActiveDepartment(newDepartments[0]);
    }
  };

  const currentHeads = useMemo(
    () => teamData[selectedYear]?.[activeDepartment] || [],
    [selectedYear, activeDepartment],
  );
  const headsCount = currentHeads.length;

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />


      {/* Hero Section */}
      <section className="py-16 bg-black/40 backdrop-blur-sm border-b border-white/8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/30 text-xs font-medium tracking-[0.3em] uppercase mb-4">Who we are</p>
          <h1 className="text-5xl font-black mb-5 text-white tracking-tight">Meet Our Team</h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">Discover the passionate leaders driving innovation and fostering entrepreneurship across different departments at E-Cell MIT Manipal.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Department Menu - Left Side */}
            <div className="lg:col-span-1">
              {/* Filter Dropdowns */}
              <div className="flex justify-center md:justify-start mb-8">
                <YearFilterDropdown
                  availableYears={availableYears}
                  selectedYear={selectedYear}
                  onYearChange={handleYearChange}
                />
              </div>
              <div className="sticky top-8">
                <DepartmentMenu
                  departments={departments}
                  activeDepartment={activeDepartment}
                  onSelectDepartment={setActiveDepartment}
                />
              </div>
            </div>

            {/* Department Head Display - Right Side */}
            <div className="lg:col-span-2">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
                  {activeDepartment}
                </h2>
                <div className="w-20 h-0.5 bg-white/10 mx-auto rounded-full mb-5"></div>
                <p className="text-white/50 text-lg">
                  {activeDepartment === "Executive Board"
                    ? "Meet our Executive Board"
                    : `Meet the ${currentHeads.length <= 1 ? "head" : "heads"} of our ${activeDepartment} department`}
                </p>
              </div>

              {/* Department Head Card */}
              {currentHeads.length > 0 ? (
                <div
                  className={`grid gap-8 ${
                    headsCount === 1
                      ? "grid-cols-1 max-w-sm mx-auto"
                      : headsCount === 3
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
                      : "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                  }`}
                >
                  {currentHeads.map((head, idx) => (
                    <DepartmentHeadCard
                      head={head}
                      key={`${head.name}-${idx}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl text-white/50 mb-2">
                    No Team Head Available
                  </h3>
                  <p className="text-white/30">
                    This department currently has no designated head.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Join Team CTA */}
        <section className="py-16 border-t border-white/8 mt-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-5 text-white tracking-tight">
              Want to Join Our Leadership Team?
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
              Be part of MIT Manipal&apos;s premier entrepreneurship cell and
              lead the future of innovation on campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/about"
                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-white/90 transition-all duration-200"
              >
                Learn more About Us
              </a>
              <a
                href="/initiatives"
                className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-200"
              >
                Learn About Our Work
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
