import ForgetPasswordForm from "@/components/auth/forgetPassword/ForgetPasswordForm";
import Section from "@/components/sections/Section";

const ForgetPasswordLayout = () => {
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
                <ForgetPasswordForm />
            </div>
        </Section>
    );
}

export default ForgetPasswordLayout