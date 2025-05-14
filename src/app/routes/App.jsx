import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "../styles/app.scss";
import {
  HomePage,
  AfishaPage,
  AfishaDetail,
  ServicesPage,
  ProjectPage,
  ProjectDetail,
  NewsPage,
  NewsDetail,
  CatalogPage,
  ReaderPage,
  AboutPage,
  SupportPage,
  ElectronicPage,
  ProfessionalPage,
} from "../../pages";
import { Footer, Header, Breadcrumb, Scroll } from "../../widgets";

import React, { useEffect } from "react";
import Register from "../../pages/Register/Register";
import { useDispatch } from "react-redux";
import { switchingPage } from "../store/reducers/auth";
import Login from "../../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";

export const routesArr = [
  {
    path: "/",
    title: "main",
    element: <HomePage />,
    type: false,
  },
  {
    path: "/afisha",
    title: "afisha",
    element: <AfishaPage />,
    type: false,
  },
  {
    path: "/afisha-detail/:id",
    title: "afisha",
    element: <AfishaDetail />,
    type: false,
  },
  {
    path: "/services",
    title: "services",
    element: <ServicesPage />,
    type: false,
  },
  {
    path: "/project",
    title: "projects",
    element: <ProjectPage />,
    type: false,
  },
  {
    path: "/project-detail/:id",
    title: "projects",
    element: <ProjectDetail />,
    type: false,
  },
  {
    path: "/news",
    title: "news",
    element: <NewsPage />,
    type: false,
  },
  {
    path: "/news-detail/:id",
    title: "news",
    element: <NewsDetail />,
    type: false,
  },
  {
    path: "/catalog",
    title: "catalog",
    element: <CatalogPage />,
    type: true,
  },
  {
    path: "/reader",
    title: "readers",
    element: <ReaderPage />,
    type: false,
  },
  {
    path: "/about",
    title: "about",
    element: <AboutPage />,
    type: false,
  },
  {
    path: "/support",
    title: "support",
    element: <SupportPage />,
    type: false,
  },
  {
    path: "/electronic",
    title: "electronic",
    element: <ElectronicPage />,
    type: true,
  },
  {
    path: "/professional",
    title: "professional",
    element: <ProfessionalPage />,
    type: false,
  },
];

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return children;
};

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchingPage());
  }, [pathname, dispatch]);
  return (
    <React.Fragment>
      {pathname !== "/register" && pathname !== "/login" && <Header />}
      <ScrollToTop>
        {pathname !== "/register" && pathname !== "/login" && (
          <Breadcrumb routes={routesArr} />
        )}
        <Scroll />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/afisha"} element={<AfishaPage />} />
          <Route path={"/afisha-detail/:id"} element={<AfishaDetail />} />
          <Route path={"/services"} element={<ServicesPage />} />
          <Route path={"/project"} element={<ProjectPage />} />
          <Route path={"/project-detail/:id"} element={<ProjectDetail />} />
          <Route path={"/news/:id"} element={<NewsPage />} />
          <Route path={"/news-detail/:id"} element={<NewsDetail />} />

          <Route path={"/reader/:id"} element={<ReaderPage />} />
          <Route path={"/about"} element={<AboutPage />} />
          <Route path={"/support"} element={<SupportPage />} />
          <Route
            path={"/catalog"}
            element={
              <ProtectedRoute>
                <CatalogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/electronic"}
            element={
              <ProtectedRoute>
                <ElectronicPage />
              </ProtectedRoute>
            }
          />
          <Route path={"/professional"} element={<ProfessionalPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {pathname !== "/register" && pathname !== "/login" && <Footer />}
      </ScrollToTop>
    </React.Fragment>
  );
}

export default App;
