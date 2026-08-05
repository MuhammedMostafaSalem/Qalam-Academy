import RegisterBanner from "@/components/auth/register/RegisterBanner";
import RegisterForm from "@/components/auth/register/RegisterForm";
import Section from "@/components/sections/Section";

const RegisterLayout = () => {
    return (
        <Section className="relative flex min-h-screen items-start lg:items-center justify-center px-4 py-4">
            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-7xl
                    max-h-[92vh]
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-border
                    bg-card
                    shadow-2xl
                "
            >
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4">
                    <div className="flex min-h-full items-center justify-center">
                        <RegisterForm />
                    </div>
                </div>

                <div className="hidden lg:flex lg:w-[40%] border-s border-border">
                    <RegisterBanner />
                </div>
            </div>
        </Section>
    );
};

export default RegisterLayout;