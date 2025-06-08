import { Route, Routes } from "react-router-dom";

import History from "@/pages/History";
import Home from "@/pages/Home";
import LogIn from "@/pages/LogIn";
import SignUp from "@/pages/sign-up";
import Topic from "@/pages/Topic";
import Vocabulary from "@/pages/Vocabulary";
import Conversation from "@/pages/conversation";
import ProtectedRoute from "./protected-route";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vocabulary"
        element={
          <ProtectedRoute>
            <Vocabulary />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/conversation/:id"
        element={
          <ProtectedRoute>
            <Conversation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/topic"
        element={
          <ProtectedRoute>
            <Topic />
          </ProtectedRoute>
        }
      />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
