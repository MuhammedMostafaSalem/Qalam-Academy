import Container from "@/components/ui/Container"
import NavLinks from "./NavLinks"
import LanguageSwitcher from "./LanguageSwitcher"
import MobileMenu from "./MobileMenu"

const Navbar = () => {
    return (
        <nav className="border-b border-border bg-white">
            <Container className="flex h-20 items-center justify-between">

                <div className="text-2xl font-bold text-primary">
                    Qalam Academy
                </div>

                <NavLinks />

                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <MobileMenu />
                </div>

            </Container>
        </nav>
    )
}

export default Navbar