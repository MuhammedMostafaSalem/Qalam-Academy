import PublicFooter from "@/components/norama/public/PublicFooter";
import PublicHeader from "@/components/norama/public/PublicHeader";

export default function PublicLayout({ children }) {
  return (
    <div className="nt-public-frame">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
