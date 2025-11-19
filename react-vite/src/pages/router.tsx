import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LoadingPage from "@/pages/loading";

const GlobalLayout = lazy(() => import("@/pages/layout"));
const LoginPage = lazy(() => import("@/pages/public/login"));
const HomePage = lazy(() => import("@/pages/private/home"));
const PrivateLayout = lazy(() => import("@/pages/private/layout"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
// const DevPage = lazy(() => import("@/pages/public/dev"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route element={<PrivateLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* {config.environment === "development" && (
              <Route path="/dev" element={<DevPage />} />
            )} */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
