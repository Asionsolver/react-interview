import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * MovieForm with a custom animated dropdown (Tailwind-only for visuals).
 *
 * Features:
 * - Custom dropdown replacing the native <select>.
 * - Keyboard navigation (ArrowUp/ArrowDown, Enter to select, Escape to close).
 * - Click-outside to close.
 * - Smooth scale + fade animation using Tailwind classes only.
 * - Accessible roles/aria attributes (combobox / listbox / option).
 *
 * Paste this file into your project and ensure Tailwind is configured.
 */

const cx = (...classes) => classes.filter(Boolean).join(" ");

const CustomDropdown = ({
  id,
  value,
  onChange,
  placeholder = "Select OTT Platform",
  options,
}) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) setHighlighted(-1);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Keyboard navigation
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setHighlighted((h) => {
          const next = h + 1;
          return next >= options.length ? 0 : next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
        setHighlighted((h) => {
          const prev = h - 1;
          return prev < 0 ? options.length - 1 : prev;
        });
      } else if (e.key === "Enter" || e.key === " ") {
        // Space or Enter toggles / selects
        e.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          if (highlighted >= 0) {
            const opt = options[highlighted];
            onChange(opt.value);
            setOpen(false);
            buttonRef.current?.focus();
          }
        }
      } else if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      } else if (e.key === "Tab") {
        setOpen(false);
      }
    },
    [highlighted, onChange, open, options]
  );

  // Ensure highlighted item scrolls into view
  useEffect(() => {
    if (highlighted >= 0 && listRef.current) {
      const el =
        listRef.current.querySelectorAll("[role='option']")[highlighted];
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted]);

  return (
    <div ref={containerRef} className="relative w-full md:w-72">
      <button
        id={id}
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className="w-full text-left flex items-center justify-between gap-3 px-3 py-2 border border-gray-700 bg-gray-800 rounded-md text-white
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition"
      >
        <span
          className={cx("truncate", selected ? "text-white" : "text-gray-400")}
        >
          {selected ? selected.label : placeholder}
        </span>

        {/* chevron */}
        <svg
          className={cx(
            "w-4 h-4 text-gray-300 transform transition-transform duration-200",
            open ? "rotate-180" : "rotate-0"
          )}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* options panel */}
      <div
        ref={listRef}
        id={`${id}-listbox`}
        role="listbox"
        aria-labelledby={id}
        tabIndex={-1}
        className={cx(
          "absolute left-0 right-0 z-10 mt-2 max-h-56 overflow-auto rounded-lg border border-gray-700 bg-gray-900 py-1 shadow-lg transform origin-top transition duration-150",
          "custom-scrollbar",
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 pointer-events-none -translate-y-1"
        )}
      >
        {options.map((opt, idx) => {
          const isSelected = opt.value === value;
          const isHighlighted = idx === highlighted;
          return (
            <div
              key={opt.value}
              role="option"
              aria-selected={isSelected}
              onMouseEnter={() => setHighlighted(idx)}
              onMouseLeave={() => setHighlighted(-1)}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className={cx(
                "cursor-pointer px-3 py-2 flex items-center justify-between text-sm",
                isHighlighted
                  ? "bg-gray-700 text-white"
                  : "text-gray-200 hover:bg-gray-800",
                isSelected ? "font-semibold" : "font-normal"
              )}
            >
              <span className="truncate">{opt.label}</span>
              {isSelected && (
                <svg
                  className="w-4 h-4 text-indigo-400"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10l3 3 9-9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomDropdown;
