import React, { useEffect, useState } from "react";
import { ArrowLeft, Moon, Sun } from "phosphor-react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[var(--background)] px-4 py-3 shadow transition-all duration-1000">
      {/* Conditionally render header layout */}
      {isScrolled ? (
        // Compact Header (on scroll)
        <div className="flex items-center justify-between w-full">
          {/* Back + Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center bg-[var(--q3-surface-dimmer)] rounded-full w-[36px] h-[36px]">
              <ArrowLeft size={20} weight="bold" />
            </div>
            <h1
              className="text-xl font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Leaderboard
            </h1>
          </div>

          {/* Dark/Light toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-md transition-all duration-300"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            {darkMode ? (
              <>
                <Sun size={16} /> Light
              </>
            ) : (
              <>
                <Moon size={16} /> Dark
              </>
            )}
          </button>
        </div>
      ) : (
        // Full Header (top of page)
        <div className="flex flex-col gap-4">
          {/* Top bar */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center bg-[var(--q3-surface-dimmer)] rounded-full w-[40px] h-[40px]">
              <ArrowLeft size={22} weight="bold" />
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-md transition-all duration-300"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              {darkMode ? (
                <>
                  <Sun size={18} /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} /> Dark Mode
                </>
              )}
            </button>
          </div>

          {/* Title + Subheading */}
          <div className="flex flex-col gap-2">
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Leaderboard
            </h1>
            <h2
              className="text-sm whitespace-nowrap overflow-auto scrollbar-hide"
              style={{ color: "var(--q3-neutral-light)" }}
            >
              JEE Main Test series / Quizrr Part Test / Quizrr Part Test (QPT) -
              1 (Old) / Analysis / Leaderboard
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
