
import { cookies } from "next/headers";

export async function GET(request, { params }) {
    try {
        const { productId } = await params;

        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL ||
            "http://localhost:5000";

        const response = await fetch(
            `${baseUrl}/api/enrollments/my-products/${encodeURIComponent(productId)}/download`,
            {
                method: "GET",
                headers: {
                    Cookie: cookieHeader,
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return Response.json(
                {
                    success: false,
                    message:
                        response.status === 403
                            ? "You are not allowed to download this file"
                            : "Failed to download the file",
                },
                { status: response.status }
            );
        }

        const headers = new Headers();

        const contentType = response.headers.get("content-type");
        const contentDisposition = response.headers.get(
            "content-disposition"
        );

        if (contentType) {
            headers.set("Content-Type", contentType);
        }

        if (contentDisposition) {
            headers.set("Content-Disposition", contentDisposition);
        }

        headers.set("Cache-Control", "private, no-store");

        return new Response(response.body, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error("Product download error:", error);

        return Response.json(
            {
                success: false,
                message: "An unexpected error occurred",
            },
            { status: 500 }
        );
    }
}
