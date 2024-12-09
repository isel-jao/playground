import { BrowserRouter, Route, Routes } from "react-router";
import PrivateLayout from "@/pages/private/PrivateLayout";
import HomePage from "@/pages/private/home";
import AboutPage from "@/pages/private/about";
import ProfilePage from "@/pages/private/profile";
import ProfilesHomePage from "@/pages/private/profiles";
import ProfilesLayout from "@/pages/private/profiles/layout";
import DevPage from "@/pages/public/dev";
import NotfoundPage from "@/pages/public/notfound";
import LoginPage from "../public/login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profiles">
            <Route element={<ProfilesLayout />}>
              <Route index element={<ProfilesHomePage />} />
              <Route path=":profileId" element={<ProfilePage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
