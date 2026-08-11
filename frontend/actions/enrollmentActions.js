"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get My Enrollments (Student - courses)
export async function getMyCoursesAction(queryString = "") {
    try {
        const response = await authApi(`/enrollments/my-courses?${queryString}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
            meta: response.meta,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب كورساتك",
            data: [],
            meta: null,
        };
    }
}

// Get My Products / Downloads (Student)
export async function getMyProductsAction(queryString = "") {
    try {
        const response = await authApi(`/enrollments/my-products?${queryString}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
            meta: response.meta,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب منتجاتك",
            data: [],
            meta: null,
        };
    }
}

// Get All Enrollments (Admin/Instructor)
export async function getEnrollmentsAction(queryString = "") {
    try {
        const response = await authApi(`/enrollments?${queryString}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
            meta: response.meta,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب التسجيلات",
            data: [],
            meta: null,
        };
    }
}

// Get Enrollment by ID (Admin/Instructor)
export async function getEnrollmentByIdAction(id) {
    try {
        const response = await authApi(`/enrollments/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل التسجيل",
            data: null,
        };
    }
}
