import LoadMore from '@/components/shared/LoadMore';
import CertificateCard from '@/components/ui/CertificateCard';
import imgCourse from '@/public/assets/img-card.jpg';

const certificates = [
    {
        id: 1,
        title: "تعلم Next.js من الصفر للاحتراف",
        instructor: "Qalam Academy",
        date: "10 يوليو 2026",
        image: imgCourse,
    },
    {
        id: 2,
        title: "React Advanced Development",
        instructor: "Qalam Academy",
        date: "25 يونيو 2026",
        image: imgCourse,
    },
    {
        id: 3,
        title: "UI/UX Design Fundamentals",
        instructor: "Qalam Academy",
        date: "15 مايو 2026",
        image: imgCourse,
    },
];


const CertificatesGrid = () => {
    return (
        <div className="flex-1">
            {/* Grid */}
            <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-6
            "
            >
                {certificates.map((certificate, index) => (
                    <CertificateCard
                        key={index}
                        certificate={certificate}
                    />
                ))}
            </div>
            
            <LoadMore />
        </div>
    );
};


export default CertificatesGrid;