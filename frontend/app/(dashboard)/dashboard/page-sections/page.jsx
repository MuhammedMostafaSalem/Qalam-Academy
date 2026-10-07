import { Suspense } from "react";

import PageSectionsHeader from "@/components/dashboard/page-sections/PageSectionsHeader";
import PageSectionsToolbar from "@/components/dashboard/page-sections/PageSectionsToolbar";
import PageSectionsTable from "@/components/dashboard/page-sections/PageSectionsTable";

import { generateSEOMetadata } from "@/utils/seo";

export async function generateMetadata() {
    return generateSEOMetadata({
        path: "/dashboard/page-sections",
        title: {
            ar: "إدارة أقسام الصفحات",
            en: "Manage Page Sections",
        },
        noIndex: true,
    });
}

export default function AdminPageSections() {
    return (
        <div
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            <PageSectionsHeader />

            <Suspense
                fallback={
                    <div className="mt-[20px] text-center">
                        جاري تحميل شريط الأدوات...
                    </div>
                }
            >
                <PageSectionsToolbar />
            </Suspense>

            <Suspense
                fallback={
                    <div className="mt-[20px] py-10 text-center">
                        جاري تحميل أقسام الصفحات...
                    </div>
                }
            >
                <PageSectionsTable />
            </Suspense>
        </div>
    );
}