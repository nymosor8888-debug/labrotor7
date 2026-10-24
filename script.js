"use strict";

/* ---------- 1. Theme (dark / light) ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const isLight = theme === "light";
    themeBtn.setAttribute("aria-pressed", String(isLight));
    themeLabel.textContent = isLight ? "Харанхуй горим" : "Цайвар горим";
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) { /* хадгалах боломжгүй */ }

const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(saved || (prefersLight ? "light" : "dark"));

themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* алгасна */ }
});

/* ---------- 2. Flip card товч ---------- */
document.querySelectorAll(".flip-card").forEach((card) => {
    card.querySelectorAll(".btn--flip").forEach((btn) => {
        btn.addEventListener("click", () => {
            const flipped = card.classList.toggle("is-flipped");
            const target = card.querySelector(
                flipped
                    ? ".flip-card__face--back .btn--flip"
                    : ".flip-card__face--front .btn--flip"
            );
            setTimeout(() => target.focus(), 360);
        });
    });
});

/* ---------- 3. Hamburger цэс ---------- */
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

navToggle.addEventListener("click", () => {
    const open = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.textContent = open ? "✕" : "☰";
});
