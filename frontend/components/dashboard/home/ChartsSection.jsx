import Section from "@/components/sections/Section";
import RevenueChart from "../charts/RevenueChart";
import SalesChart from "../charts/SalesChart";
import RecentOrders from "../widgets/RecentOrders";
import StudentsDistributionChart from "../charts/StudentsDistributionChart";

const ChartsSection = ({ dashboardData }) => {
    // Transform revenue chart data
    const revenueChartData = dashboardData?.charts?.revenue?.map(item => ({
        day: `${item._id.month}/${item._id.year}`,
        revenue: item.revenue,
    })) || [];

    // Transform sales chart data (using order counts from revenue chart)
    const salesChartData = dashboardData?.charts?.revenue?.map(item => ({
        month: `${item._id.month}/${item._id.year}`,
        sales: item.orders,
    })) || [];

    // Transform students distribution data (using top courses)
    const studentsDistributionData = dashboardData?.topCourses?.map(course => ({
        course: course.title?.ar || course.title?.en || "Unknown Course",
        students: course.totalStudents,
    })) || [];

    // Transform recent orders data
    const recentOrdersData = dashboardData?.latestOrders?.map(order => {
        const user = order.user;
        const userName = user ? `${user.firstName} ${user.lastName}` : "مستخدم مجهول";
        
        // Calculate total amount from cart items
        const totalAmount = order.cartItems?.reduce((sum, item) => sum + (item.price * item.count), 0) || 0;
        
        return {
            id: `#${order._id.slice(-6)}`,
            customer: userName,
            amount: `${totalAmount} جنيه`,
            status: order.status === "paid" ? "مكتمل" : order.status === "cancelled" ? "ملغى" : "قيد الانتظار",
            date: new Date(order.createdAt).toLocaleDateString("ar-EG"),
        };
    }) || [];

    return (
        <Section
            className="
                mt-[20px]
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-2
            "
        >
            {/* Revenue */}
            <RevenueChart data={revenueChartData} />

            {/* Sales */}
            <SalesChart data={salesChartData} />

            {/* Students Distribution */}
            <StudentsDistributionChart data={studentsDistributionData} />
            
            {/* Recent Orders */}
            <RecentOrders orders={recentOrdersData} />
        </Section>
    );
};

export default ChartsSection;