import React from "react";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </ThemeProvider>
  );
}
export default App;