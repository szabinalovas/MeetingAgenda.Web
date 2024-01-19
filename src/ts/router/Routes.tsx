import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import MeetingDashboard from "../components/Meetings/dashboard/MeetingDashboard";
import App from "../layout/App";
import MeetingForm from "../components/Meetings/form/MeetingForm";
import MeetingDetails from "../components/Meetings/details/MeetingDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MeetingDashboard /> },
      { path: "meeting/:id", element: <MeetingDetails /> },
      { path: "createMeeting", element: <MeetingForm key="create" /> },
      { path: "update/:id", element: <MeetingForm key="update" /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
