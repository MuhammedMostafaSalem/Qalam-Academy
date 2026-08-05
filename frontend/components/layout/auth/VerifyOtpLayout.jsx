import Section from "@/components/sections/Section";
import VerifyOtpForm from "@/components/auth/verifyOtp/VerifyOtpForm";


const VerifyOtpLayout = () => {
    return (
        <Section
            className="
                flex
                min-h-screen
                items-center
                justify-center
                px-4
            "
        >
            <div
                className="
                    w-full
                    max-w-md
                "
            >
                <VerifyOtpForm />
            </div>
        </Section>
    );
};


export default VerifyOtpLayout;