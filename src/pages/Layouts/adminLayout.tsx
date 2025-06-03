
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";

const adminLayout = () => {
  return (
    <div className="h-sreen flex w-screen">
      <Sidebar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default adminLayout;
