import AuthProvider from "./context/AuthProvider";
import AppRoutes from "./routes";

function App() {
  return (
    <>
    <div className="bg-custom-dark bg-backgroundCard bg-custom-gradient">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      
    </div>
    </>
  );
}

export default App;
