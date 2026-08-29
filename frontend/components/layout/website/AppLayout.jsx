import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ScrollToTop from "../ScrollToTop";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export default function AppLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
        </>
    )
}
