import VerifyOtpLayout from "@/components/layout/auth/VerifyOtpLayout";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/verify-otp",
        title: {
            ar: "التحقق من رمز OTP",
            en: "Verify OTP",
        },
        description: {
            ar: "تأكيد رمز التحقق الخاص بحسابك في أكاديمية قلم.",
            en: "Verify your OTP code for Qalam Academy account authentication.",
        },
        noIndex: true,
    });
}

export default function VerifyOtp() {
    return (
        <VerifyOtpLayout />
    );

}