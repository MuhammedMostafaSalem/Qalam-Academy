import Select from "@/components/ui/Select"
import Toolbar from "@/components/ui/Toolbar"

const PaymentHistoryToolbar = () => {
    return (
        <Toolbar
            inputPlaceholder="برقم العملية أو الطلب..."
            filters={
                <>
                    {/* Payment Method */}
                    {/* <option>كل وسائل الدفع</option>
                    <option>Visa</option>
                    <option>MasterCard</option>
                    <option>PayPal</option>
                    <option>Apple Pay</option
                    <option>Google Pay</option>
                    <option>Paymob</option>
                    <option>Fawry</option>
                    <option>Vodafone Cash</option>
                    <option>Instapay</option> */}
                    <Select />

                    {/* Status */}
                    {/* <option>كل الحالات</option>
                    <option>ناجحة</option>
                    <option>قيد المعالجة</option>
                    <option>فشلت</option>
                    <option>مستردة</option> */}
                    <Select />
                </>
            }
        />
    )
}

export default PaymentHistoryToolbar