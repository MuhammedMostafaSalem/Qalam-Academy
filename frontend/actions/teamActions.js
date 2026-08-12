"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Team Members
export async function getTeamAction(queryString = "") {
    try {
        const response = await authApi(`/team?${queryString}`, {
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
            message: error?.message || "فشل جلب أعضاء الفريق",
            data: [],
            meta: null,
        };
    }
}

// Create Team Member (links a user to the team)
export async function createTeamMemberAction(prevState, formData) {
    try {
        const user = formData.get("user");
        const position = formData.get("position");
        const bio = formData.get("bio");
        const socialLinks = formData.get("socialLinks");

        const body = { user };
        if (position) body.position = position;

        const response = await authApi("/team", {
            method: "POST",
            body: JSON.stringify(body),
        });

        revalidatePath("/dashboard/team");
        revalidatePath("/about");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إضافة عضو الفريق بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل إضافة عضو الفريق",
            errors: error?.errors || null,
        };
    }
}

// Update Team Member
export async function updateTeamMemberAction(id, updateData) {
    try {
        const response = await authApi(`/team/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateData),
        });

        revalidatePath("/dashboard/team");
        revalidatePath("/about");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث عضو الفريق بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل تحديث عضو الفريق",
        };
    }
}

// Delete Team Member
export async function deleteTeamMemberAction(id) {
    try {
        await authApi(`/team/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/team");
        revalidatePath("/about");

        return {
            success: true,
            message: "تم حذف عضو الفريق بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف عضو الفريق",
        };
    }
}
