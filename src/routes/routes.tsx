import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import About from "../pages/About";
// import Contact from "../pages/Contact";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute role='admin'><App /></ProtectedRoute>,
    children: routeGenerator(adminPaths)
  },
  {
    path: '/faculty',
    element: <ProtectedRoute role='faculty'><App /></ProtectedRoute>,    children: routeGenerator(facultyPaths)
  },
  {
    path: '/student',
    element: <ProtectedRoute role='student'><App /></ProtectedRoute>,
    children: routeGenerator(studentPaths)
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/change-password',
    element: <ChangePassword />
  },
])

export default router;