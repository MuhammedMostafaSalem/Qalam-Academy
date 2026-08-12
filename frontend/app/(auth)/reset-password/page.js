import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/resetPassword/ResetPasswordForm";

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
