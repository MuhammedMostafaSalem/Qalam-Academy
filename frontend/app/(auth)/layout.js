import ThemeToggle from "@/components/shared/ThemeToggle";

export default function AuthLayout({ children }) {
    return (
        <>
            <div className="fixed right-4 top-4 z-50 rtl:right-auto rtl:left-4">
                <ThemeToggle compact />
            </div>
            {children}
        </>
    );
}
