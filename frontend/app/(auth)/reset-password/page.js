import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/resetPassword/ResetPasswordForm";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/reset-password",
        title: {
            ar: "تعيين كلمة المرور الجديدة",
            en: "Reset Password",
        },
        description: {
            ar: "قم بتعيين كلمة مرور جديدة لحسابك في أكاديمية قلم.",
            en: "Set a new secure password for your Qalam Academy account.",
        },
        noIndex: true,
    });
}

export default function ResetPasswordPage() {
    return (
        <main
            className="
                flex
                min-h-screen
                items-center
                justify-center
                px-4
            "
        >
            <Suspense fallback={null}>
                <ResetPasswordForm />
            </Suspense>
        </main>
    );
}
