import SectionBadge from "@/components/sections/Section";

const ContactHeader = () => {
    return (
        <header
            className="
                mx-auto
                max-w-4xl
                text-center
            "
        >
            <SectionBadge>
                تواصل معنا
            </SectionBadge>

            <h1
                className="
                    mt-6
                    text-4xl
                    font-extrabold
                    leading-tight
                    text-text-primary
                    md:text-5xl
                    lg:text-6xl
                "
            >
                يسعدنا التواصل معك
            </h1>

            <p
                className="
                    mx-auto
                    mt-6
                    max-w-3xl
                    text-lg
                    leading-8
                    text-text-secondary
                "
            >
                سواء كنت ترغب في بدء مشروع جديد، أو لديك استفسار حول خدماتنا،
                أو تحتاج إلى استشارة تقنية، فإن فريق قلم أكاديمي جاهز للإجابة
                على جميع أسئلتك ومساعدتك في الوصول إلى أفضل الحلول الرقمية.
            </p>
        </header>
    );
};

export default ContactHeader;