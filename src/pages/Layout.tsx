import NavBar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <NavBar />
      <main>
        <div className="flex h-[calc(100vh-72px)] w-full items-center justify-center">
          <Outlet />
          <Toaster position="bottom-right" />
        </div>
      </main>
    </div>
  );
}

export default Layout;
