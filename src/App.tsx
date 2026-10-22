import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import { useTheme } from "./context/ThemeContext";
import { Outlet } from "react-router";

export default function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
