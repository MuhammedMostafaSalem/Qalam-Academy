import Button from "../ui/Button";

const SectionCTA = ({
    href,
    children,
}) => {
    return (
        <div className="mt-10">
            <Button asChild>
                <Link href={href}>
                    {children}
                </Link>
            </Button>
        </div>
    );
}

export default SectionCTA