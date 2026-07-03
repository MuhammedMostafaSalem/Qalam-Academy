import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ScrollToTop from "../ScrollToTop";

export default function AppLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
        </>
    )
}