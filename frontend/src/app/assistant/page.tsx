"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowLeft,
  Bell,
  Bot,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  FileText,
  Home,
  Landmark,
  Menu,
  MessageCircle,
  Mic,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";

type Message = {
  id: number;
  type: "user" | "assistant";
  text: string;
};

const quickQuestions = [
  {
    title: "Manage my expenses",
    icon: Wallet,
    question: "How can I manage my household expenses?",
  },
  {
    title: "Banking help",
    icon: Landmark,
    question: "How can I do basic bank work?",
  },
  {
    title: "Government schemes",
    icon: FileText,
    question: "How can I find government schemes?",
  },
  {
    title: "Daily tasks",
    icon: CircleHelp,
    question: "Help me with my daily household tasks.",
  },
];


export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      text: "Namaste! 👋 I am ASRA Assistant.\n\nI can help you understand household expenses, banking, government schemes and everyday tasks.\n\nHow can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const sendMessage = async (question?: string) => {
    const messageText = question ?? input.trim();

    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: messageText,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/assistant/ask",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            question: messageText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: Date.now() + 1,
        type: "assistant",
        text: data.answer,
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);

    } catch (error) {

      console.error(error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        type: "assistant",
        text:
          "Sorry, I couldn't connect to ASRA right now. Please make sure the ASRA backend is running.",
      };

      setMessages((previous) => [
        ...previous,
        errorMessage,
      ]);
    }
  };

  return (
    <main className="assistant-page">

      {/* SIDEBAR */}

      <aside className="assistant-sidebar">

        <div className="assistant-brand">

          <div className="assistant-brand-icon">
            <Home size={21} />
          </div>

          <div>
            <strong>ASRA</strong>
            <small>
              Support · Guide · Empower
            </small>
          </div>

        </div>


        <nav className="assistant-navigation">

          <Link
            href="/dashboard"
            className="assistant-nav-item"
          >
            <Home size={19} />
            Home
          </Link>

          <Link
            href="/expenses"
            className="assistant-nav-item"
          >
            <Wallet size={19} />
            My Expenses
          </Link>

          <Link
            href="/schemes"
            className="assistant-nav-item"
          >
            <FileText size={19} />
            Government Schemes
          </Link>

          <Link
            href="/assistant"
            className="assistant-nav-item active"
          >
            <Bot size={19} />
            ASRA Assistant
          </Link>

        </nav>


        <div className="assistant-sidebar-bottom">

          <button className="assistant-nav-item">
            <Bell size={19} />
            Reminders
          </button>

          <button className="assistant-nav-item">
            Settings
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <section className="assistant-main">

        {/* HEADER */}

        <header className="assistant-header">

          <div>

            <Link
              href="/dashboard"
              className="assistant-back"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1>
              ASRA Assistant
            </h1>

            <p>
              Simple guidance for everyday household needs.
            </p>

          </div>


          <button className="assistant-notification">
            <Bell size={19} />
          </button>

        </header>


        {/* ASSISTANT INTRO */}

        <section className="assistant-intro">

          <div className="assistant-avatar">

            <Bot size={31} />

            <span />

          </div>


          <div>

            <h2>
              Namaste! How can I help?
            </h2>

            <p>
              Ask me a question in simple language.
              I will guide you step by step.
            </p>

          </div>

        </section>


        {/* QUICK QUESTIONS */}

        <section className="quick-section">

          <div className="quick-heading">

            <div>
              <h2>
                You can ask me about
              </h2>

              <p>
                Choose a question to get started.
              </p>
            </div>

            <Sparkles size={18} />

          </div>


          <div className="quick-grid">

            {quickQuestions.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  className="quick-card"
                  onClick={() =>
                    sendMessage(item.question)
                  }
                >

                  <div className="quick-icon">
                    <Icon size={19} />
                  </div>

                  <div className="quick-card-text">

                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      Ask ASRA
                    </span>

                  </div>

                  <ChevronRight size={16} />

                </button>
              );
            })}

          </div>

        </section>


        {/* CHAT */}

        <section className="assistant-chat">

          <div className="chat-header">

            <div className="chat-status">

              <div className="chat-bot-icon">
                <Bot size={18} />
              </div>

              <div>
                <strong>
                  ASRA Assistant
                </strong>

                <span>
                  ● Ready to help
                </span>
              </div>

            </div>

          </div>


          <div className="chat-messages">

            {messages.map((message) => (

              <div
                key={message.id}
                className={`chat-message ${
                  message.type === "user"
                    ? "user-message"
                    : "assistant-message"
                }`}
              >

                {message.type === "assistant" && (
                  <div className="message-avatar">
                    <Bot size={15} />
                  </div>
                )}

                <div className="message-bubble">
                  {message.text.split("\n").map(
                    (line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    )
                  )}
                </div>

              </div>

            ))}

          </div>


          {/* INPUT */}

          <div className="assistant-input-area">

            <div className="assistant-input-box">

              <input
                type="text"
                value={input}
                placeholder={
                  isListening
                    ? "Listening..."
                    : "Type your question here..."
                }
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />

            </div>


            <button
              className="send-button"
              onClick={() => sendMessage()}
            >
              <Send size={17} />
            </button>

          </div>

        </section>


        {/* SAFETY NOTE */}

        <div className="assistant-note">

          <ShieldCheck size={18} />

          <div>

            <strong>
              Your safety comes first
            </strong>

            <p>
              Never share your OTP, PIN, password or
              other confidential banking information.
              ASRA will guide you toward safe and
              official services.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}