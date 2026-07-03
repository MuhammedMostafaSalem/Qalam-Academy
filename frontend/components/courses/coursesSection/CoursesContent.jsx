"use client";

import { useState } from "react";
import CoursesGrid from "./coursesGrid/CoursesGrid"
import CoursesToolbar from "./toolbar/CoursesToolbar"

const CoursesContent = () => {
    const [view, setView] = useState("grid");
    const toggleSwitcher = (type) => setView(type)
    return (
        <>
            {/* Top Toolbar */}
            <CoursesToolbar
                view={view}
                toggleSwitcher={toggleSwitcher}
            />

            {/* Sidebar + Courses */}
            <CoursesGrid view={view} />
        </>
    )
}

export default CoursesContent