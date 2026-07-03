import { fadeUp } from "@/lib/animationHelpers";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactSection = () => {
    return (
        <section
            id="contact-form"
            className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-border
                bg-background
                shadow-xl
                shadow-primary/5
            "
        >
            <div
                {...fadeUp(300)}
                className="
                    grid
                    lg:grid-cols-[380px_1fr]
                "
            >
                {/* Contact Information */}

                <aside
                    className="
                        border-b
                        border-border
                        bg-background-alt
                        p-8
                        lg:border-b-0
                        lg:border-l
                        lg:p-10
                    "
                >
                    <ContactInfo />
                </aside>

                {/* Contact Form */}

                <div className="p-8 lg:p-10">

                    <ContactForm />

                </div>

            </div>
        </section>
    );
};

export default ContactSection;