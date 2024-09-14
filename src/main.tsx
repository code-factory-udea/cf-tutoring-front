import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AlertProvider } from "./context/alertContext";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
