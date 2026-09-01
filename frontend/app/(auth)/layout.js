import ThemeToggle from "@/components/shared/ThemeToggle";
import LanguageSwitcher from "@/components/layout/website/Header/LanguageSwitcher";

export default function AuthLayout({ children }) {
    return (
        <>
            <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rtl:right-auto rtl:left-4">
                <LanguageSwitcher />
                <ThemeToggle compact />
            </div>
            {children}
        </>
    );
}
