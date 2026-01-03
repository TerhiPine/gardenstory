import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <SplashScreen onFinish={() => setLoading(false)} />
      ) : (
        <Home />
      )}
    </>
  );
}



