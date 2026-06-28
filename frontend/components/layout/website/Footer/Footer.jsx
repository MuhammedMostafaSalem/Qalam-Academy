import Container from "@/components/ui/Container"

const Footer = () => {
    return (
        <footer className="border-t border-border bg-background-alt">
            <Container className="py-10">
                <p className="text-center text-text-secondary">
                    © {new Date().getFullYear()} Qalam Academy. All rights reserved.
                </p>
            </Container>
        </footer>
    )
}

export default Footer