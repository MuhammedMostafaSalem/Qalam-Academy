import Link from "next/link";
import Button from "@/components/ui/Button";

const CourseActions = () => {
    return (
        <div className="space-y-4">
            <Button
                className="gradient-button w-full"
            >
                <Link href="#">
                    اشترك الآن
                </Link>
            </Button>

            <Button
                variant="outline"
                className="w-full"
            >
                إضافة إلى المفضلة
            </Button>
        </div>
    );
};

export default CourseActions;