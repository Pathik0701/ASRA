"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowLeft,
  Bell,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Search,
  ShieldCheck,
  Users,
  Briefcase,
  X,
  FileText,
} from "lucide-react";

type Scheme = {
  id: number;
  name: string;
  category: string;
  shortDescription: string;
  benefits: string;
  eligibility: string;
  documents: string[];
  process: string[];
};

const schemes: Scheme[] = [
  {
    id: 1,
    name: "Women Support",
    category: "Women",
    shortDescription:
      "Support and welfare information for women and families.",
    benefits:
      "Access to eligible welfare and support services.",
    eligibility:
      "Eligibility depends on the specific government program.",
    documents: [
      "Aadhaar Card",
      "Bank Account Details",
      "Address Proof",
    ],
    process: [
      "Check eligibility",
      "Keep required documents ready",
      "Apply through the official government channel",
    ],
  },

  {
    id: 2,
    name: "Education Support",
    category: "Education",
    shortDescription:
      "Financial and educational support for eligible students.",
    benefits:
      "May provide scholarships or educational assistance.",
    eligibility:
      "Eligibility varies according to the particular scheme.",
    documents: [
      "Student ID",
      "Aadhaar Card",
      "Income Certificate",
    ],
    process: [
      "Check the eligibility requirements",
      "Prepare the required documents",
      "Submit the application through the official portal",
    ],
  },

  {
    id: 3,
    name: "Housing Support",
    category: "Housing",
    shortDescription:
      "Information about housing assistance for eligible families.",
    benefits:
      "Eligible families may receive housing-related assistance.",
    eligibility:
      "Depends on household income, housing status and scheme rules.",
    documents: [
      "Aadhaar Card",
      "Address Proof",
      "Income Certificate",
    ],
    process: [
      "Check eligibility",
      "Collect documents",
      "Apply through the appropriate official channel",
    ],
  },

  {
    id: 4,
    name: "Health Support",
    category: "Healthcare",
    shortDescription:
      "Find healthcare assistance available to eligible families.",
    benefits:
      "Access to eligible healthcare-related benefits.",
    eligibility:
      "Eligibility depends on the healthcare program.",
    documents: [
      "Aadhaar Card",
      "Family Details",
      "Required Scheme Documents",
    ],
    process: [
      "Check eligibility",
      "Verify required documents",
      "Follow the official application process",
    ],
  },

  {
    id: 5,
    name: "Employment Support",
    category: "Employment",
    shortDescription:
      "Information about employment and livelihood support.",
    benefits:
      "May provide employment, training or livelihood assistance.",
    eligibility:
      "Requirements differ according to the program.",
    documents: [
      "Aadhaar Card",
      "Bank Account Details",
      "Address Proof",
    ],
    process: [
      "Check eligibility",
      "Complete required registration",
      "Follow the official application process",
    ],
  },

  {
    id: 6,
    name: "Pension Support",
    category: "Pensions",
    shortDescription:
      "Information about social security and pension assistance.",
    benefits:
      "Eligible individuals may receive social security benefits.",
    eligibility:
      "Depends on age, income and other scheme conditions.",
    documents: [
      "Aadhaar Card",
      "Bank Account Details",
      "Age Proof",
    ],
    process: [
      "Check eligibility",
      "Prepare documents",
      "Apply through the appropriate official channel",
    ],
  },
];

const categories = [
  {
    name: "All",
    icon: FileText,
  },
  {
    name: "Women",
    icon: Users,
  },
  {
    name: "Education",
    icon: GraduationCap,
  },
  {
    name: "Housing",
    icon: Building2,
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
  },
  {
    name: "Employment",
    icon: Briefcase,
  },
  {
    name: "Pensions",
    icon: Landmark,
  },
];

export default function SchemesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScheme, setSelectedScheme] =
    useState<Scheme | null>(null);

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCategory =
      selectedCategory === "All" ||
      scheme.category === selectedCategory;

    const matchesSearch =
      scheme.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      scheme.shortDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="schemes-page">

      {/* SIDEBAR */}

      <aside className="schemes-sidebar">

        <div className="schemes-brand">

          <div className="schemes-brand-icon">
            <Home size={21} />
          </div>

          <div>
            <strong>ASRA</strong>
            <small>Support · Guide · Empower</small>
          </div>

        </div>


        <nav className="schemes-navigation">

          <Link
            href="/dashboard"
            className="schemes-nav-item"
          >
            <Home size={19} />
            Home
          </Link>

          <Link
            href="/expenses"
            className="schemes-nav-item"
          >
            <Landmark size={19} />
            My Expenses
          </Link>

          <Link
            href="/schemes"
            className="schemes-nav-item active"
          >
            <FileText size={19} />
            Government Schemes
          </Link>

          <Link
            href="/assistant"
            className="schemes-nav-item"
          >
            <ShieldCheck size={19} />
            ASRA Assistant
          </Link>

        </nav>


        <div className="schemes-sidebar-bottom">

          <button className="schemes-nav-item">
            <Bell size={19} />
            Reminders
          </button>

          <button className="schemes-nav-item">
            Settings
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <section className="schemes-main">

        <header className="schemes-header">

          <div>

            <Link
              href="/dashboard"
              className="schemes-back"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1>
              Government Schemes
            </h1>

            <p>
              Find support and benefits that may be available
              for you and your family.
            </p>

          </div>


          <button className="schemes-notification">
            <Bell size={19} />
          </button>

        </header>


        {/* SEARCH */}

        <div className="schemes-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search for a scheme or support..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="clear-search"
            >
              <X size={17} />
            </button>
          )}

        </div>


        {/* CATEGORIES */}

        <section className="scheme-categories">

          <div className="scheme-section-title">

            <h2>
              Browse by category
            </h2>

            <p>
              Find information based on your needs.
            </p>

          </div>


          <div className="category-list">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <button
                  key={category.name}
                  className={`category-button ${
                    selectedCategory === category.name
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(category.name)
                  }
                >
                  <Icon size={17} />
                  {category.name}
                </button>
              );

            })}

          </div>

        </section>


        {/* SCHEME LIST */}

        <section className="scheme-results">

          <div className="scheme-results-header">

            <div>
              <h2>
                Available Support
              </h2>

              <p>
                {filteredSchemes.length} options found
              </p>
            </div>

          </div>


          <div className="scheme-grid">

            {filteredSchemes.map((scheme) => (

              <article
                className="scheme-card"
                key={scheme.id}
              >

                <div className="scheme-card-top">

                  <div className="scheme-card-icon">
                    <BookOpen size={21} />
                  </div>

                  <span>
                    {scheme.category}
                  </span>

                </div>


                <h3>
                  {scheme.name}
                </h3>


                <p className="scheme-description">
                  {scheme.shortDescription}
                </p>


                <div className="scheme-benefit">

                  <CheckCircle2 size={15} />

                  <span>
                    {scheme.benefits}
                  </span>

                </div>


                <button
                  className="scheme-learn-button"
                  onClick={() =>
                    setSelectedScheme(scheme)
                  }
                >
                  View Details
                  <ChevronRight size={16} />
                </button>

              </article>

            ))}

          </div>


          {filteredSchemes.length === 0 && (

            <div className="no-schemes">

              <Search size={30} />

              <h3>
                No schemes found
              </h3>

              <p>
                Try searching with a different word or
                choose another category.
              </p>

            </div>

          )}

        </section>


        {/* INFORMATION NOTE */}

        <div className="scheme-information-note">

          <ShieldCheck size={20} />

          <div>

            <strong>
              Simple information, verified sources
            </strong>

            <p>
              ASRA will explain government support in
              simple language and guide users toward
              official application channels.
            </p>

          </div>

        </div>

      </section>


      {/* DETAILS MODAL */}

      {selectedScheme && (

        <div className="scheme-modal-overlay">

          <div className="scheme-modal">

            <div className="scheme-modal-header">

              <div>

                <span>
                  {selectedScheme.category}
                </span>

                <h2>
                  {selectedScheme.name}
                </h2>

              </div>

              <button
                className="scheme-modal-close"
                onClick={() =>
                  setSelectedScheme(null)
                }
              >
                <X size={19} />
              </button>

            </div>


            <div className="scheme-modal-content">

              <div className="scheme-detail-block">

                <h3>
                  What is it?
                </h3>

                <p>
                  {selectedScheme.shortDescription}
                </p>

              </div>


              <div className="scheme-detail-block">

                <h3>
                  Benefits
                </h3>

                <p>
                  {selectedScheme.benefits}
                </p>

              </div>


              <div className="scheme-detail-block">

                <h3>
                  Who may be eligible?
                </h3>

                <p>
                  {selectedScheme.eligibility}
                </p>

              </div>


              <div className="scheme-detail-block">

                <h3>
                  Documents
                </h3>

                <ul>

                  {selectedScheme.documents.map(
                    (document) => (
                      <li key={document}>
                        <CheckCircle2 size={14} />
                        {document}
                      </li>
                    )
                  )}

                </ul>

              </div>


              <div className="scheme-detail-block">

                <h3>
                  How to apply
                </h3>

                <ol>

                  {selectedScheme.process.map(
                    (step, index) => (
                      <li key={step}>
                        <span>
                          {index + 1}
                        </span>

                        {step}
                      </li>
                    )
                  )}

                </ol>

              </div>

            </div>


            <div className="scheme-modal-footer">

              <p>
                Always verify current eligibility and
                application details through the official
                government source.
              </p>

              <button
                className="scheme-close-button"
                onClick={() =>
                  setSelectedScheme(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}