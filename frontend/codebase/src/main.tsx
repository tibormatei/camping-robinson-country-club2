import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "@/i18n";

import App from "@/App";


const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error('The root element was not found! Unable to mount React application.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
