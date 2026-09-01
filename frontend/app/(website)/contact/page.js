import ContactHero from "@/components/contact/ContactHero";
import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/contact",
        title: {
            ar: "تواصل معنا",
            en: "Contact Us",
        },
        description: {
            ar: "هل لديك أي استفسار أو ترغب في الانضمام إلينا؟ تواصل مع فريق أكاديمية قلم الآن.",
            en: "Have questions or want to partner with us? Reach out to the Qalam Academy team today.",
        },
    });
}

export default function Contact() {
    return (
        <>
            <ContactHero />
        </>
    )
}