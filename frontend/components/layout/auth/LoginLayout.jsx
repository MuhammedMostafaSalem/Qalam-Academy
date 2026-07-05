import LoginBanner from "@/components/auth/login/LoginBanner";
import LoginForm from "@/components/auth/login/LoginForm";
import Section from "@/components/sections/Section";

const LoginLayout = () => {
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
            {/* Background Glow */}

            <div
                className="
                    absolute
                    left-0
                    top-0
                    h-96
                    w-96
                    rounded-full
                    bg-primary/10
                    blur-[180px]
                    -z-10
                "
            />

            <div
                className="
                    absolute
                    bottom-0
                    right-0
                    h-[450px]
                    w-[450px]
                    rounded-full
                    bg-secondary/10
                    blur-[200px]
                    -z-10
                "
            />

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
                    backdrop-blur-xl
                    shadow-[0_20px_60px_rgba(0,0,0,.35)]
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
                        <LoginForm />
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
                    <LoginBanner />
                </div>
                
            </div>
        </Section>
    );
};

export default LoginLayout;