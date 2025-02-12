import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthRedirectRoute } from "./context/AuthRedirectRoute";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AuthRedirectRoute element={<Home />} />} />
            <Route
              path="/login"
              element={<AuthRedirectRoute element={<Login />} />}
            />
            <Route
              path="/register"
              element={<AuthRedirectRoute element={<Register />} />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/chat-screen" element={<ChatPage />} />
            </Route>
            ChatPage
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
