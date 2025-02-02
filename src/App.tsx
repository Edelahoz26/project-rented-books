import { ThemeProvider } from "@emotion/react";
import AuthProvider from "./context/AuthProvider";
import AppRoutes from "./routes";
import theme from "./components/Theme/theme";

function App() {
  return (
    <>
      <div className="bg-custom-dark bg-backgroundCard bg-custom-gradient">
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <AppRoutes />
          </ThemeProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
