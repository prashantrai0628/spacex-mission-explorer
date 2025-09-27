import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply dark theme by default for space aesthetic
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(<App />);
