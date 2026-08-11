"use server";

import { authApi } from "@/services/authService";

// Get Student Dashboard
export async function getStudentDashboardAction() {
    try {
        const response = await authApi("/dashboard/student", {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب بيانات لوحة التحكم",
            data: null,
        };
    }
}

// Get Instructor Dashboard
export async function getInstructorDashboardAction() {
    try {
        const response = await authApi("/dashboard/instructor", {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب بيانات لوحة التحكم",
            data: null,
        };
    }
}

// Get Admin Dashboard (already exists but duplicated here for completeness)
export async function getAdminDashboardAction() {
    try {
        const response = await authApi("/dashboard/admin", {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب بيانات لوحة التحكم",
            data: null,
        };
    }
}