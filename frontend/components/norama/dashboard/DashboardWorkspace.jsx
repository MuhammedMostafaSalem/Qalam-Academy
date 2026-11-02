"use client";

import Link from "next/link";
import { useState } from "react";
import { PROJECTS } from "@/data/norama";

const records = {
  projects: PROJECTS.map((project) => ({ id: project.id, name: project.name, detail: project.category, status: "مفهوم تجريبي", href: `/dashboard/projects/${project.id}/edit` })),
  categories: [
    { id: "cat-ecommerce", name: "تجارة إلكترونية", detail: "1 مشروع", status: "نشط", href: "/dashboard/categories/cat-ecommerce/edit" },
    { id: "cat-dashboard", name: "لوحات التحكم", detail: "1 مشروع", status: "نشط", href: "/dashboard/categories/cat-dashboard/edit" },
    { id: "cat-health", name: "الصحة والعافية", detail: "1 مشروع", status: "نشط", href: "/dashboard/categories/cat-health/edit" },
  ],
  users: [
    { id: "USR-008", name: "مستخدم تجريبي", detail: "user@example.com", status: "بيانات تجريبية", href: "/dashboard/users/USR-008" },
    { id: "USR-004", name: "مدير تجريبي", detail: "admin@example.com", status: "بيانات تجريبية", href: "/dashboard/users/USR-004" },
  ],
  messages: [
    { id: "MSG-005", name: "طلب استفسار تجريبي", detail: "رسالة للعرض فقط", status: "غير مرسلة", href: "/dashboard/messages/MSG-005" },
    { id: "MSG-002", name: "طلب تعاون تجريبي", detail: "رسالة للعرض فقط", status: "غير مرسلة", href: "/dashboard/messages/MSG-002" },
  ],
  reviews: [
    { id: "REV-003", name: "تقييم تجريبي", detail: "واجهة تصميم المنتج", status: "للمراجعة", href: "/dashboard/reviews/REV-003" },
    { id: "REV-001", name: "تقييم تجريبي", detail: "تطوير المواقع", status: "للمراجعة", href: "/dashboard/reviews/REV-001" },
  ],
};

const listTitles = {
  projects: "المشاريع",
  categories: "التصنيفات",
  users: "المستخدمون",
  messages: "رسائل التواصل",
  reviews: "التقييمات",
};

const createPaths = { projects: "/dashboard/projects/create", categories: "/dashboard/categories/create" };

function WorkspaceHeader({ title, description, actionHref, actionLabel }) {
  return <div className="nt-workspace-header"><div><span className="nt-overline">مساحة الإدارة</span><h1>{title}</h1><p>{description}</p></div>{actionHref && <Link className="nt-button nt-button-primary" href={actionHref}>+ {actionLabel}</Link>}</div>;
}

function Overview() {
  const metrics = [
    ["03", "نماذج المشاريع", "بيانات ثابتة للعرض"],
    ["00", "مشاريع منشورة", "لا يوجد حفظ أو نشر"],
    ["00", "مستخدمون", "لا توجد حسابات حقيقية"],
    ["00", "رسائل جديدة", "النموذج غير متصل"],
  ];

  return <>
    <WorkspaceHeader title="نظرة عامة" description="ملخص تجريبي لمحتوى Norama Tech — الأرقام أدناه لا تمثل بيانات حقيقية." />
    <div className="nt-metrics-grid">{metrics.map(([value, label, hint]) => <article className="nt-metric-card" key={label}><span className="nt-metric-label">{label}</span><strong>{value}</strong><small>{hint}</small></article>)}</div>
    <div className="nt-dashboard-lower-grid">
      <section className="nt-dashboard-panel"><div className="nt-panel-heading"><div><span className="nt-overline">أحدث المحتوى</span><h2>نماذج المشاريع</h2></div><Link href="/dashboard/projects">عرض الكل <span aria-hidden="true">←</span></Link></div><div className="nt-dashboard-rows">{PROJECTS.map((project) => <div className="nt-dashboard-row" key={project.slug}><img src={project.image} alt="" /><div><strong>{project.name}</strong><small>{project.category}</small></div><span className="nt-status-chip">مفهوم تجريبي</span></div>)}</div></section>
      <section className="nt-dashboard-panel nt-dashboard-side-panel"><span className="nt-overline">ملاحظة مهمة</span><h2>لا توجد بيانات حقيقية هنا.</h2><p>هذه الواجهة ثابتة بدون backend؛ لذلك لا يتم إنشاء المستخدمين أو حفظ المشاريع أو استقبال الرسائل.</p><Link className="nt-button nt-button-outline" href="/projects">معاينة المشاريع</Link></section>
    </div>
  </>;
}

function Collection({ entity, title, description }) {
  const items = records[entity] || [];
  const actionHref = createPaths[entity];
  return <>
    <WorkspaceHeader title={title || listTitles[entity]} description={description || "بيانات توضيحية ثابتة — التعديلات غير محفوظة."} actionHref={actionHref} actionLabel={entity === "projects" ? "مشروع جديد" : "تصنيف جديد"} />
    <section className="nt-dashboard-panel nt-table-panel">
      <div className="nt-table-heading"><div><h2>{listTitles[entity]}</h2><span>{items.length} عناصر تجريبية</span></div><span className="nt-table-preview-label">بيانات للعرض فقط</span></div>
      <div className="nt-table-scroll"><table className="nt-data-table"><thead><tr><th>العنصر</th><th>التفاصيل</th><th>الحالة</th><th>الإجراء</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small>{item.id}</small></td><td>{item.detail}</td><td><span className="nt-status-chip">{item.status}</span></td><td>{item.href === "#" ? <span className="nt-muted-action">غير متاح</span> : <Link className="nt-table-link" href={item.href}>عرض <span aria-hidden="true">↗</span></Link>}</td></tr>)}</tbody></table></div>
    </section>
  </>;
}

function PreviewForm({ title, description, entity, recordId }) {
  const [notice, setNotice] = useState("");
  const fields = entity === "project"
    ? [["اسم المشروع", "text"], ["الرابط المختصر", "text"], ["التصنيف", "text"], ["وصف المشروع", "textarea"]]
    : entity === "category"
      ? [["اسم التصنيف", "text"], ["الوصف", "textarea"]]
      : entity === "password"
        ? [["كلمة المرور الحالية", "password"], ["كلمة المرور الجديدة", "password"], ["تأكيد كلمة المرور", "password"]]
        : [["الاسم", "text"], ["البريد الإلكتروني", "email"], ["رقم الهاتف", "tel"]];

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("لم يتم حفظ أي تغيير. هذه الواجهة تعمل دون backend أو تخزين بيانات.");
  }

  return <>
    <WorkspaceHeader title={title} description={description} />
    <form className="nt-dashboard-panel nt-editor-form nt-form" onSubmit={handleSubmit}>
      <div className="nt-editor-topline"><span className="nt-overline">{recordId ? `معرّف العرض: ${recordId}` : "نموذج معاينة"}</span><span className="nt-table-preview-label">لن تُحفظ التغييرات</span></div>
      {fields.map(([label, type]) => <label key={label}>{label}{type === "textarea" ? <textarea rows={4} placeholder="أدخل محتوى للمعاينة" /> : <input type={type} placeholder={label} />}</label>)}
      <label>الحالة<select defaultValue="draft"><option value="draft">مسودة</option><option value="published">منشور</option></select></label>
      <div className="nt-form-actions"><button className="nt-button nt-button-primary" type="submit">حفظ المعاينة</button><Link className="nt-button nt-button-quiet" href="/dashboard">إلغاء</Link></div>
      {notice && <p className="nt-form-status" role="status">{notice}</p>}
    </form>
  </>;
}

function RecordDetail({ entity, recordId, title, description }) {
  const item = (records[entity] || []).find((record) => record.id === recordId) || (records[entity] || [])[0];
  return <>
    <WorkspaceHeader title={title} description={description} />
    <section className="nt-dashboard-panel nt-record-panel">
      <div className="nt-record-top"><div><span className="nt-overline">سجل توضيحي</span><h2>{item?.name || "عنصر تجريبي"}</h2><p>{item?.detail || "لا توجد بيانات محفوظة لهذا السجل."}</p></div><span className="nt-status-chip">{item?.status || "معاينة"}</span></div>
      <div className="nt-record-grid"><div><span>المعرّف</span><strong>{recordId || item?.id || "—"}</strong></div><div><span>نوع البيانات</span><strong>مثال ثابت للعرض</strong></div><div><span>حالة التخزين</span><strong>غير متصل</strong></div></div>
      {entity === "messages" && <div className="nt-static-notice"><strong>هذه ليست رسالة واردة حقيقية.</strong><p>لا يتصل نموذج التواصل بهذه الواجهة؛ لذلك لا يمكن استقبال الرسائل أو تخزينها.</p></div>}
      <Link className="nt-button nt-button-outline" href={`/dashboard/${entity}`}>العودة للقائمة</Link>
    </section>
  </>;
}

function ContentOverview() {
  const sections = [
    ["الرئيسية", "العنوان الرئيسي، الخدمات، ونماذج الأعمال", "محتوى ثابت"],
    ["من نحن", "التعريف والرؤية والقيم", "محتوى ثابت"],
    ["الخدمات", "الخدمات والمخرجات المتوقعة", "محتوى ثابت"],
    ["الأسئلة الشائعة", "الإجابات والبيانات التعريفية", "محتوى ثابت"],
  ];
  return <><WorkspaceHeader title="محتوى الموقع" description="معاينة أقسام المحتوى الحالية. تعديل النصوص يتطلب تحديث البيانات في ملفات الواجهة." /><div className="nt-content-cards">{sections.map(([title, description, status]) => <article className="nt-dashboard-panel nt-content-card" key={title}><span className="nt-content-symbol" aria-hidden="true">N</span><div><span className="nt-status-chip">{status}</span><h2>{title}</h2><p>{description}</p></div><Link href="/">معاينة <span aria-hidden="true">↗</span></Link></article>)}</div></>;
}

export default function DashboardWorkspace({ mode = "overview", entity, title, description, recordId }) {
  if (mode === "overview") return <Overview />;
  if (mode === "list") return <Collection entity={entity} title={title} description={description} />;
  if (mode === "form") return <PreviewForm entity={entity} title={title} description={description} recordId={recordId} />;
  if (mode === "detail") return <RecordDetail entity={entity} title={title} description={description} recordId={recordId} />;
  if (mode === "content") return <ContentOverview />;
  return <PreviewForm entity={entity || "profile"} title={title} description={description} />;
}
