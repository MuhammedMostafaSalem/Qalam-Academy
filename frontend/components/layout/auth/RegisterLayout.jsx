import RegisterBanner from "@/components/auth/register/RegisterBanner";
import RegisterForm from "@/components/auth/register/RegisterForm";
import Section from "@/components/sections/Section";

const RegisterLayout = () => {
    return (
        <Section
            className="
                relative
                overflow-hidden
                px-4
                py-6
                lg:px-8
            "
        >
            {/* Main Card */}

            <div
                className="
                    mx-auto
                    flex
                    min-h-[calc(100vh-48px)]
                    max-w-7xl
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-border
                    bg-card/80
                "
            >
                {/* Left Side */}
                <div
                    className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        p-3
                    "
                >
                    <div className="w-full max-w-md">
                        <RegisterForm />
                    </div>
                </div>

                {/* Right Side */}
                <div
                    className="
                        hidden
                        lg:flex
                        lg:w-[38%]
                        border-s
                        border-border
                    "
                >
                    <RegisterBanner />
                </div>

            </div>
        </Section>
    );
};

export default RegisterLayout;