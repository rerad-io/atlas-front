import AppIndex from "./app/AppIndex";
import AdminIndex from "./admin/AdminIndex";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AnatomicalStructurePage from "./admin/pages/AnatomicalStructurePage";

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
            path: "/admin/AnatomicalStructure",
            Component: AnatomicalStructurePage,
        },
        {
            path: "/admin/AnatomicalStructure/:id",
            //Component: AnatomicalStructureItemPage,
        },
        {
            path: "/admin/AnatomicalStructureSubject/:id",
            //Component: AnatomicalStructureSubjectItemPage,
        },
        {
            path: "/admin/AnatomicalStructureSubject/create",
            //Component: AnatomicalStructureEditPage,
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
