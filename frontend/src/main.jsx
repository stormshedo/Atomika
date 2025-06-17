import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import Teacher from "./Teacher";
import Moderator from "./Moderator";
import Student from "./Student";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/teacher",
        element: <Teacher />
    },
    {
        path: "/moder",
        element: <Moderator />
    },
    {
        path: "/student",
        element: <Student />
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
]);

const app = ReactDOMClient.createRoot(document.getElementById("app"));

app.render(<RouterProvider router={router} />);