import Link from "next/link";
import {
  ArrowRight,
  Bell,
  FileText,
  Home,
  Mic,
  WalletCards,
  Users,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Home Management",
    text: "Get help with daily tasks, from household planning to simple guidance.",
    className: "mint",
  },
  {
    icon: WalletCards,
    title: "Expense Tracking",
    text: "Manage your income, expenses and household budget easily.",
    className: "peach",
  },
  {
    icon: FileText,
    title: "Government Schemes",
    text: "Discover and understand welfare schemes and financial support.",
    className: "blue",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    text: "Talk, ask, get answers — with a simple voice command.",
    className: "green",
  },
  {
    icon: Bell,
    title: "Reminders & Alerts",
    text: "Never miss important dates, bills, or updates again.",
    className: "yellow",
  },
];

export default function HomePage() {
  return (
    <main className="asra-site">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <Link href="/" className="brand">

          <span className="brand-mark">
            <Home size={30} strokeWidth={2.5} />
            <span className="brand-leaf">◆</span>
          </span>

          <span>
            <strong>ASRA</strong>
            <small>Support · Guide · Empower</small>
          </span>

        </Link>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact</a>
        </nav>

        <Link href="/login" className="nav-login">
          Login
        </Link>

      </header>


      {/* ================= HERO ================= */}

      <section id="home" className="hero">

        <div className="hero-copy">

          <p className="eyebrow">
            YOUR HOME. OUR PRIORITY.
          </p>

          <h1>ASRA</h1>

          <h2>
            Because Every Woman
            <br />
            Deserves Support
          </h2>

          <p className="hero-text">
            ASRA is a smart digital and voice-enabled household support
            system designed for migration-affected families. It helps women
            who stay behind manage their home, finances and access government
            schemes — with ease, confidence and guidance.
          </p>

          <div className="hero-actions">

            <Link href="/login" className="primary-btn">
              Get Started
              <ArrowRight size={17} />
            </Link>

            <a href="#about" className="secondary-btn">
              Learn More
            </a>

          </div>

        </div>


        {/* HERO ART */}

        <div className="hero-art">

          <div className="hero-glow" />

          <div className="rural-scene">

            <div className="sun" />

            <div className="hill hill-one" />
            <div className="hill hill-two" />

            <div className="house">
              <div className="roof" />

              <div className="house-body">
                <div className="window" />
                <div className="door" />
              </div>
            </div>

            <div className="tree tree-left">
              <span />
              <span />
              <span />
            </div>

            <div className="tree tree-right">
              <span />
              <span />
              <span />
            </div>

            <div className="woman">
              <div className="woman-head" />
              <div className="woman-hair" />
              <div className="woman-body" />
              <div className="saree" />
            </div>

            <div className="asra-device">

              <div className="device-ring" />

              <Home size={22} />

            </div>

          </div>


          {/* VOICE MESSAGE */}

          <div className="voice-bubble">

            <span className="voice-icon">
              <Mic size={17} />
            </span>

            <span>

              <b>
                How can I help you today?
              </b>

              <small>
                मैं आपकी कैसे मदद करूँ?
              </small>

            </span>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section id="features" className="feature-strip">

        {features.map(
          ({ icon: Icon, title, text, className }) => (

            <div className="feature" key={title}>

              <div className={`feature-icon ${className}`}>
                <Icon size={25} strokeWidth={2} />
              </div>

              <h3>{title}</h3>

              <p>{text}</p>

            </div>

          )
        )}

      </section>


      {/* ================= IMPACT ================= */}

      <section id="about" className="impact-section">

        <div className="impact-image">

          <div className="impact-woman">

            <div className="impact-head" />
            <div className="impact-hair" />
            <div className="impact-saree" />
            <div className="impact-phone" />

          </div>

        </div>


        <div className="impact-quote">

          <p>
            “ASRA gives me the confidence
            <br />
            to manage my home and plan for
            <br />
            a better tomorrow.”
          </p>

          <span>
            — A proud ASRA user
          </span>

        </div>


        <div className="impact-stats">

          <div>
            <Home size={23} />

            <b>
              Safe
              <br />
              Homes
            </b>
          </div>


          <div>
            <Users size={23} />

            <b>
              Stronger
              <br />
              Families
            </b>
          </div>


          <div>
            <Sparkles size={23} />

            <b>
              Empowered
              <br />
              Women
            </b>
          </div>


          <div>

            <span className="sun-stat">
              ☀
            </span>

            <b>
              Brighter
              <br />
              Futures
            </b>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how-it-works"
        className="how-section"
      >

        <p className="eyebrow">
          SIMPLE. TRUSTED. MADE FOR HOME.
        </p>

        <h2>
          Support when you need it.
        </h2>


        <div className="steps">

          <div>

            <span>01</span>

            <b>Ask</b>

            <p>
              Speak naturally or use the website.
            </p>

          </div>


          <div>

            <span>02</span>

            <b>Understand</b>

            <p>
              ASRA explains the next step simply.
            </p>

          </div>


          <div>

            <span>03</span>

            <b>Act</b>

            <p>
              Follow guided steps with confidence.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer
        id="contact"
        className="footer"
      >

        <div>

          <div className="footer-brand">

            <Home size={28} />

            <strong>
              ASRA
            </strong>

          </div>

          <p>
            Together, we build stronger families
            <br />
            and empowered communities.
          </p>

        </div>


        <Link
          href="/login"
          className="footer-login"
        >

          Login Now

          <ArrowRight size={17} />

        </Link>


        <div className="footer-bottom">

          <span>
            © 2026 ASRA. All rights reserved.
          </span>

          <span>
            Privacy Policy
            &nbsp;&nbsp;
            Terms & Conditions
            &nbsp;&nbsp;
            Contact
          </span>

        </div>

      </footer>

    </main>
  );
}