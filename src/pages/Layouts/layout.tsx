
import { Outlet } from "react-router-dom";

import PhoneNavbar from "../../components/phoneNavbar";

const layout = () => {
  return (
    <>
      <PhoneNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default layout;
