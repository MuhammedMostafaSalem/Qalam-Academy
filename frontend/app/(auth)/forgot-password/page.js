import ForgetPasswordLayout from "@/components/layout/auth/ForgetPasswordLayout";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/forgot-password",
        title: {
            ar: "استعادة كلمة المرور",
            en: "Forgot Password",
        },
        description: {
            ar: "استعادة كلمة المرور الخاصة بحسابك في أكاديمية قلم بسهولة وأمان.",
            en: "Reset your Qalam Academy account password securely.",
        },
        noIndex: true,
    });
}

const ForgotPasswordForm = () => {
    return (
        <ForgetPasswordLayout />
    )
};

export default ForgotPasswordForm;