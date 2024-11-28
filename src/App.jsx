// ** Router Import
import React, { useEffect } from "react";
import Router from "./router/Router";

const App = () => {
  // useEffect(() => {
  //   const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
  //   if (!rememberMe) {
  //     const token = sessionStorage.getItem("token");
  //     const userData = sessionStorage.getItem("userData");
  //     const lang = localStorage.getItem("lang") || "en";
  //     const prevPath = localStorage.getItem("prevPath");
  //     if (!token && !userData) {
  //       localStorage.clear();
  //       localStorage.setItem("lang", lang);
  //       prevPath && localStorage.setItem("prevPath", prevPath);
  //     }
  //   }
  // }, []);

  return (
    <>
      <Router />
    </>
  );
};

export default App;
