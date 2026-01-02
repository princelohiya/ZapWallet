import { Outlet } from "react-router-dom";
import { Appbar } from "./components/Appbar";

const Layout = ({ name }) => {
  return (
    // 1. Changed bg-gray-50 to bg-black to match your dark theme
    // 2. min-h-screen ensures the black background covers the whole page even if content is short
    <div className="min-h-screen bg-neutral-950 text-gray-200">
      <Appbar name={name} />

      {/* 3. ADDED 'pt-20' (padding-top: 5rem). 
         The Appbar is h-16 (4rem). We add pt-20 to push content down 
         so it doesn't hide behind the header.
      */}
      <div className="pt-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
