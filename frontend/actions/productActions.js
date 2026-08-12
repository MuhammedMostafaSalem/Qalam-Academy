"use server";

import { authApi } from "@/services/authService";
import { revalidatePath } from "next/cache";

// Get All Products
export async function getProductsAction(queryString = "") {
    try {
        const response = await authApi(`/products?${queryString}`, {
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
            message: error?.message || "فشل جلب المنتجات",
            data: [],
            meta: null,
        };
    }
}

// Get Product by ID
export async function getProductByIdAction(id) {
    try {
        const response = await authApi(`/products/${id}`, {
            method: "GET",
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل جلب تفاصيل المنتج",
            data: null,
        };
    }
}

// Create Product
export async function createProductAction(prevState, formData) {
    try {
        const body = new FormData();

        body.append("title.ar", formData.get("titleAr") || "");
        body.append("title.en", formData.get("titleEn") || "");
        body.append("description.ar", formData.get("descriptionAr") || "");
        body.append("description.en", formData.get("descriptionEn") || "");

        const category = formData.get("category");
        if (category) body.append("category", category);

        const price = formData.get("price");
        if (price) body.append("price", price);

        const discountPrice = formData.get("discountPrice");
        if (discountPrice) body.append("discountPrice", discountPrice);

        const stock = formData.get("stock");
        if (stock) body.append("stock", stock);

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const pdf = formData.get("pdf");
        if (pdf instanceof File && pdf.size > 0) {
            body.append("pdf", pdf);
        }

        const response = await authApi("/products", {
            method: "POST",
            body,
        });

        revalidatePath("/dashboard/products");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم إنشاء المنتج بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل إنشاء المنتج",
            errors: error?.errors || null,
        };
    }
}

// Update Product
export async function updateProductAction(id, prevState, formData) {
    try {
        const body = new FormData();

        const titleAr = formData.get("titleAr");
        const titleEn = formData.get("titleEn");
        if (titleAr) body.append("title.ar", titleAr);
        if (titleEn) body.append("title.en", titleEn);

        const descriptionAr = formData.get("descriptionAr");
        const descriptionEn = formData.get("descriptionEn");
        if (descriptionAr) body.append("description.ar", descriptionAr);
        if (descriptionEn) body.append("description.en", descriptionEn);

        const category = formData.get("category");
        if (category) body.append("category", category);

        const price = formData.get("price");
        if (price) body.append("price", price);

        const discountPrice = formData.get("discountPrice");
        if (discountPrice) body.append("discountPrice", discountPrice);

        const stock = formData.get("stock");
        if (stock) body.append("stock", stock);

        const image = formData.get("image");
        if (image instanceof File && image.size > 0) {
            body.append("image", image);
        }

        const pdf = formData.get("pdf");
        if (pdf instanceof File && pdf.size > 0) {
            body.append("pdf", pdf);
        }

        const response = await authApi(`/products/${id}`, {
            method: "PATCH",
            body,
        });

        revalidatePath("/dashboard/products");

        return {
            success: true,
            data: response.data,
            message: response.message || "تم تحديث المنتج بنجاح",
            errors: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error?.message || "فشل تحديث المنتج",
            errors: error?.errors || null,
        };
    }
}

// Delete Product
export async function deleteProductAction(id) {
    try {
        await authApi(`/products/${id}`, {
            method: "DELETE",
        });

        revalidatePath("/dashboard/products");

        return {
            success: true,
            message: "تم حذف المنتج بنجاح",
        };
    } catch (error) {
        return {
            success: false,
            message: error?.message || "فشل حذف المنتج",
        };
    }
}
