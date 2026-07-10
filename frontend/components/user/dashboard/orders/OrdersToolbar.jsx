import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"

const OrdersToolbar = () => {
    return (
        <Toolbar
            inputPlaceholder="ابحث برقم الطلب..."
            filters={
                <>
                    {/* Order Type => كل الطلبات, كورسات, منتجات, مختلط */}
                    <Select />

                    {/* <option>كل الحالات</option>
                <option>قيد المعالجة</option>
                <option>مكتمل</option>
                <option>ملغي</option>
                <option>مسترد</option> */}
                    <Select />
                </>
            }
        />
    )
}

export default OrdersToolbar