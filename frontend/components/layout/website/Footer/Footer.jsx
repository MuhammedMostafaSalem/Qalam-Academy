import Link from "next/link";
import {
    FaLinkedinIn,
    FaYoutube,
    FaTwitter,
    FaInstagram,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaArrowUp,
} from "react-icons/fa";

import Container from "@/components/ui/Container"
import logo from "@/public/assets/logos/logo-white.png"
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="relative bg-background border-t border-border mt-[80px]">
            <Container className="py-10">

                <div className="grid gap-10 lg:grid-cols-5 md:grid-cols-2">

                    {/* Logo */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <Image
                                src={logo}
                                alt="Qalam Academy Logo"
                                width={16}
                                priority
                                className="w-auto h-auto"
                            />

                            <div>
                                <h2 className="text-2xl font-bold">
                                    قلم أكاديمي
                                </h2>

                                <p className="text-sm text-text-secondary">
                                    لتطوير البرمجيات
                                </p>
                            </div>
                        </div>

                        <p className="text-text-secondary leading-8">
                            نحن شركة برمجيات متخصصة، نساعد الشركات والأفراد على
                            تحويل أفكارهم إلى منتجات رقمية مبتكرة.
                        </p>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">الموارد</h3>

                        <ul className="space-y-4 text-text-secondary">
                            <li>
                                <Link href="/">كورساتنا</Link>
                            </li>

                            <li>
                                <Link href="/">المدونة</Link>
                            </li>

                            <li>
                                <Link href="/">الأسئلة الشائعة</Link>
                            </li>

                            <li>
                                <Link href="/">سياسة الخصوصية</Link>
                            </li>

                            <li>
                                <Link href="/">الشروط والأحكام</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">خدماتنا</h3>

                        <ul className="space-y-4 text-text-secondary">
                            <li>تطوير المواقع</li>
                            <li>تطبيقات الجوال</li>
                            <li>الأنظمة المخصصة</li>
                            <li>تصميم UI/UX</li>
                            <li>التسويق الرقمي</li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">روابط سريعة</h3>

                        <ul className="space-y-4 text-text-secondary">
                            <li>
                                <Link href="/">الرئيسية</Link>
                            </li>

                            <li>
                                <Link href="/">من نحن</Link>
                            </li>

                            <li>
                                <Link href="/">خدماتنا</Link>
                            </li>

                            <li>
                                <Link href="/">المعرض</Link>
                            </li>

                            <li>
                                <Link href="/">تواصل معنا</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">تواصل معنا</h3>

                        <div className="space-y-5">

                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-primary mt-1" />

                                <p className="text-text-secondary leading-7">
                                    المملكة العربية السعودية
                                    <br />
                                    مكة المكرمة
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-primary" />

                                <span className="text-text-secondary">
                                    info@codenext.sa
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-primary" />

                                <span className="text-text-secondary">
                                    +966 50 123 4567
                                </span>
                            </div>

                            {/* Social */}
                            <div className="flex gap-3 pt-3">

                                {[
                                    FaLinkedinIn,
                                    FaYoutube,
                                    FaTwitter,
                                    FaInstagram,
                                ].map((Icon, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="w-10 h-10 rounded-full border border-border bg-card hover:bg-primary duration-300 flex items-center justify-center"
                                    >
                                        <Icon size={16} />
                                    </a>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}

                <div className="mt-14 pt-6 border-t border-border flex items-center justify-center relative">
                    <p className="text-text-muted text-sm">
                        جميع الحقوق محفوظة © CodeNext 2024
                    </p>
                </div>
            </Container>
        </footer>
    )
}

export default Footer