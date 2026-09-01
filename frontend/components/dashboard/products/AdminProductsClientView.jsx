"use client";

import { Suspense } from "react";
import ProductsHeader from "@/components/dashboard/products/ProductsHeader";
import ProductsTable from "@/components/dashboard/products/ProductsTable";
import ProductsToolbar from "@/components/dashboard/products/ProductsToolbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminProductsClientView() {
    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <div
                className="
                    glass
                    rounded-3xl
                    border
                    border-border
                    p-6
                    shadow-sm
                "
            >
                <ProductsHeader />
                <Suspense fallback={<div className="mt-[20px] h-12 w-full animate-pulse rounded-2xl bg-card" />}>
                    <ProductsToolbar />
                </Suspense>
                <Suspense fallback={<div className="mt-[20px] h-64 w-full animate-pulse rounded-2xl bg-card" />}>
                    <ProductsTable />
                </Suspense>
            </div>
        </ProtectedRoute>
    );
}
