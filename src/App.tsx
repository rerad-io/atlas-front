import AppIndex from "./app/AppIndex";
import AdminIndex from "./admin/AdminIndex";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//import AnatomicalStructureSubject from "./admin/pages/AnatomicalStructureSubject";

export default function App() {
    const routes = [
        {
            path: "/",
            Component: AppIndex,
        },
        {
            path: "/admin",
            Component: AdminIndex,
        },
        {
            path: "/admin/AnatomicalStructureSubject",
            //Component: AnatomicalStructureSubject,
        },
        {
            path: "/admin/AnatomicalStructure",
            //Component: AnatomicalStructure,
        },
        {
            path: "/admin/Study",
            //Component: Study,
        },
    ];
    const router = createBrowserRouter(routes, {
        basename: "/atlas",
    });

    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    );
}
