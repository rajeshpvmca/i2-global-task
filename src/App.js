import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Layout from "./components/layout/Layout";
import Notes from "./components/pages/Notes";

const App = () => {

  const { loginInfo } = useSelector((State) => State.auth);
  const accessToken = localStorage.getItem('accessToken');

  return (
    <>
      <Suspense fallback="">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {accessToken ?
            <>
              <Route path="/notes" element={<Layout><Notes /></Layout>} />
            </>
            :
            <Route path="*" element={<Navigate replace to="/login" />} />
          }
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
