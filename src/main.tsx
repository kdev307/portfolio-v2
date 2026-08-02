import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Dismiss the pre-render loader once the app has painted (min visible time).
const dismissLoader = () => {
  const loader = document.getElementById("initial-loader");
  if (!loader) return;
  loader.classList.add("is-hidden");
  window.setTimeout(() => loader.remove(), 600);
};
window.setTimeout(() => requestAnimationFrame(dismissLoader), 500);

