"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Home,
  LockKeyhole,
  UserRound,
} from "lucide-react";

export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="login-page">

      {/* LEFT LOGIN SIDE */}

      <div className="login-left">

        <Link href="/" className="login-brand">

          <span className="brand-mark large">

            <Home size={48} strokeWidth={2.2} />

            <span className="brand-leaf">
              ◆
            </span>

          </span>

          <strong>
            ASRA
          </strong>

          <small>
            Support · Guide · Empower
          </small>

        </Link>


        <div className="login-heading">

          <h1>
            Welcome Back!
          </h1>

          <p>
            Login to your ASRA account to continue
          </p>

        </div>


        <form
          className="login-card"
          onSubmit={(e) => e.preventDefault()}
        >

          <label>
            Email or Phone Number
          </label>

          <div className="input-wrap">

            <UserRound size={30} />

            <input
              type="text"
              placeholder="e.g. user@example.com"
            />

          </div>


          <label>
            Password
          </label>

          <div className="input-wrap">

            <LockKeyhole size={30} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>


          <div className="login-options">

            <label className="remember">

              <input type="checkbox" />

              <span>
                Remember me
              </span>

            </label>

            <a href="#">
              Forgot password?
            </a>

          </div>


          <button
            className="login-submit"
            type="submit"
          >

            Login

            <ArrowRight size={17} />

          </button>


          <div className="or">

            <span />

            OR

            <span />

          </div>


          <button
            className="google-btn"
            type="button"
          >

            <span className="google-g">
              G
            </span>

            Continue with Google

          </button>


          <p className="signup">

            Don&apos;t have an account?

            {" "}

            <a href="#">
              Sign Up
            </a>

          </p>

        </form>

      </div>


      {/* RIGHT ILLUSTRATION */}

      <div className="login-art">

        <div className="login-sun" />

        <div className="login-hills one" />

        <div className="login-hills two" />


        <div className="login-house">

          <div />

        </div>


        <div className="login-tree left">

          <i />
          <i />
          <i />

        </div>


        <div className="login-tree right">

          <i />
          <i />
          <i />

        </div>


        <div className="login-person">

          <div className="p-head" />

          <div className="p-hair" />

          <div className="p-body" />

          <div className="p-saree" />

        </div>

      </div>

    </main>
  );
}