import Link from "next/link";
import BrandLink from "@/components/norama/BrandLink";

const accountLinks = [
  { href: "/user/profile", label: "ملفي الشخصي" },
  { href: "/user/profile/edit", label: "تعديل الملف" },
  { href: "/user/change-password", label: "تغيير كلمة المرور" },
];

export default function AccountShell({ children }) {
  return (
    <div className="nt-account-shell">
      <header className="nt-account-header"><div className="nt-container"><BrandLink /><Link className="nt-button nt-button-quiet" href="/">العودة للموقع <span aria-hidden="true">↗</span></Link></div></header>
      <main className="nt-container nt-account-main">
        <div className="nt-dashboard-warning" role="note"><strong>معاينة حساب ثابتة</strong><span>لا يوجد تسجيل دخول أو مستخدم حقيقي؛ التعديلات لا تُحفظ بدون Backend.</span></div>
        <div className="nt-account-grid"><aside className="nt-account-nav"><span className="nt-overline">حساب المستخدم</span>{accountLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}<span aria-hidden="true">←</span></Link>)}</aside><section className="nt-account-content">{children}</section></div>
      </main>
    </div>
  );
}
