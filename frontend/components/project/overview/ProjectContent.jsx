import Section from "@/components/sections/Section"
import SectionDescription from "@/components/sections/SectionDescription";
import SectionTitle from "@/components/sections/SectionTitle";

const ProjectContent = () => {
    return (
        <div className="space-y-16">
            {/* About */}
            <Section>
                <SectionTitle>
                    نبذة عن المشروع
                </SectionTitle>

                <SectionDescription>
                    تم تطوير منصة تعليم إلكتروني متكاملة تهدف إلى توفير
                    تجربة تعليمية حديثة للطلاب والمدربين، حيث تتيح إنشاء
                    وإدارة الدورات التدريبية، متابعة تقدم الطلاب، إجراء
                    الاختبارات، وإدارة المحتوى بسهولة من خلال لوحة تحكم
                    احترافية.
                </SectionDescription>
            </Section>

            {/* Problem */}
            <Section>
                <SectionTitle>
                    التحدي
                </SectionTitle>

                <SectionDescription>
                    كان التحدي الرئيسي هو بناء نظام يستطيع خدمة آلاف
                    المستخدمين في نفس الوقت مع الحفاظ على سرعة الأداء،
                    بالإضافة إلى توفير تجربة استخدام سهلة على جميع
                    الأجهزة.
                </SectionDescription>
            </Section>

            {/* Solution */}
            <Section>
                <SectionTitle>
                    الحل
                </SectionTitle>

                <SectionDescription>
                    تم تصميم النظام باستخدام أحدث التقنيات مع بنية
                    قابلة للتوسع، واعتماد واجهة استخدام حديثة، وربط
                    جميع أجزاء المنصة بلوحة تحكم مركزية لإدارة
                    المستخدمين والدورات والاختبارات بسهولة.
                </SectionDescription>
            </Section>

            {/* Results */}
            <Section>
                <SectionTitle>
                    النتيجة
                </SectionTitle>

                <SectionDescription>
                    نجحت المنصة في تحسين تجربة التعلم بشكل كبير، مع
                    توفير أداء سريع، وسهولة في إدارة المحتوى، وإمكانية
                    التوسع مستقبلًا لإضافة مزايا جديدة دون التأثير
                    على أداء النظام.
                </SectionDescription>
            </Section>
        </div>
    );
};

export default ProjectContent;