import AppIndex from "./app/AppIndex";
import AdminIndex from "./admin/AdminIndex";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AnatomicalStructureListPage from "./admin/pages/AnatomicalStructureListPage";
import AnatomicalStructureSubjectListPage from "./admin/pages/AnatomicalStructureSubjectListPage";
import AnatomicalStructureSubjectEditPage from "./admin/pages/AnatomicalStructureSubjectEditPage";
import AnatomicalStructureEditPage from "./admin/pages/AnatomicalStructureEditPage";

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
            Component: AnatomicalStructureSubjectListPage,
        },
        {
            path: "/admin/AnatomicalStructureSubject/create",
            Component: AnatomicalStructureSubjectEditPage,
        },
        {
            path: "/admin/AnatomicalStructureSubject/:id",
            Component: AnatomicalStructureSubjectEditPage,
        },
        {
            path: "/admin/AnatomicalStructure",
            Component: AnatomicalStructureListPage,
        },
        {
            path: "/admin/AnatomicalStructure/create",
            Component: AnatomicalStructureEditPage,
        },
        {
            path: "/admin/AnatomicalStructure/:id",
            Component: AnatomicalStructureEditPage,
        },
        {
            path: "/admin/Study",
            // Component: Study,
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
