import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layouts/layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import { useContext } from "react";
import { AppContext } from "./Context/AppProvider";
import ErrorPage from "./pages/errorPage";
import AddEvent from "./pages/Dashboard/events/addEvent";
import UpdateEvent from "./pages/Dashboard/events/updateEvent";
import AdminLayout from "./pages/Layouts/adminLayout";
import UserDashboard from "./pages/Dashboard/users/userDashboard";
import AddAnnouncements from "./pages/Dashboard/announcements/addAnnouncements";
import UpdateAnnouncements from "./pages/Dashboard/announcements/updateAnnouncements";
import UserEvents from "./pages/User/userEvents";
import UserAnnouncements from "./pages/User/userAnnouncements";
import Events from "./pages/Dashboard/events/events";
import Announcements from "./pages/Dashboard/announcements/announcements";

function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Events" element={<UserEvents />} />
          <Route path="/Announcements" element={<UserAnnouncements />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        {user?.role == "admin" && (
          <Route path="/Dashboard" element={<AdminLayout />}>
            <Route
              index
              element={
                user?.role == "admin" ? <UserDashboard /> : <ErrorPage />
              }
            ></Route>

            <Route
              path="/Dashboard/announcements"
              element={user?.role != "admin" && <ErrorPage />}
            />
            <Route
              index
              element={
                user?.role == "admin" ? <Announcements /> : <ErrorPage />
              }
            />
            <Route
              path="/Dashboard/announcements/"
              element={
                user?.role == "admin" ? <Announcements /> : <ErrorPage />
              }
            />
            <Route
              path="/Dashboard/announcements/addAnnouncements"
              element={
                user?.role == "admin" ? <AddAnnouncements /> : <ErrorPage />
              }
            />
            <Route
              path="/Dashboard/announcements/updateAnnouncements/:id"
              element={
                user?.role == "admin" ? <UpdateAnnouncements /> : <ErrorPage />
              }
            />
            <Route />

            <Route
              path="/Dashboard/events"
              element={user?.role != "admin" && <ErrorPage />}
            />
            <Route
              index
              element={user?.role != "admin" ? <Events /> : <ErrorPage />}
            />
            <Route
              path="/Dashboard/events/"
              element={user?.role == "admin" ? <Events /> : <ErrorPage />}
            />
            <Route
              path="/Dashboard/events/addEvent"
              element={user?.role == "admin" ? <AddEvent /> : <ErrorPage />}
            />
            <Route
              path="/Dashboard/events/updateEvent/:id"
              element={user?.role == "admin" ? <UpdateEvent /> : <ErrorPage />}
            />
            <Route />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
