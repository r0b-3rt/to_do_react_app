import { MotionConfig } from "framer-motion";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* Respect the system "reduce motion" setting */}
        <MotionConfig reducedMotion="user">
            <App />
        </MotionConfig>
    </StrictMode>,
);
