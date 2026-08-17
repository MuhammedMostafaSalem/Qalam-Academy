"use client";

import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/sections/Section";
import SectionTitle from "@/components/sections/SectionTitle";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import {
    getCartAction,
    updateCartItemAction,
    removeFromCartAction,
    clearCartAction,
    applyCouponAction,
    removeCouponAction,
} from "@/actions/cartActions";
import {
    createCashOrderAction,
    checkoutPaymobAction,
    checkoutPaypalAction,
} from "@/actions/orderActions";
import {
    HiOutlineTrash,
    HiOutlineShoppingBag,
    HiOutlineTicket,
    HiOutlineCreditCard,
    HiOutlineDevicePhoneMobile,
    HiOutlineBanknotes,
    HiOutlineGlobeAlt,
    HiOutlineCheckCircle,
} from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";

const PAYMENT_METHODS = [
    {
        id: "card",
        name: "بطاقة بنكية (فيزا / ماستركارد)",
        description: "دفع آمن ومباشر عبر Paymob",
        icon: HiOutlineCreditCard,
        gateway: "paymob",
        badge: "الأكثر استخداماً",
    },
    {
        id: "wallet",
        name: "محفظة إلكترونية (E-Wallet)",
        description: "فودافون كاش، أورنج، اتصالات، وي باي",
        icon: HiOutlineDevicePhoneMobile,
        gateway: "paymob",
    },
    {
        id: "fawry",
        name: "فوري / أمان (Fawry)",
        description: "الدفع عبر كود فوري في أي منفذ",
        icon: HiOutlineBanknotes,
        gateway: "paymob",
    },
    {
        id: "paypal",
        name: "PayPal (USD)",
        description: "الدفع الدولي بالدولار عبر PayPal",
        icon: HiOutlineGlobeAlt,
        gateway: "paypal",
    },
    {
        id: "cash",
        name: "الدفع عند الاستلام / تحويل يدوي",
        description: "إنشاء الطلب والدفع المباشر",
        icon: HiOutlineBanknotes,
        gateway: "cash",
    },
];

export default function CartView() {
    const router = useRouter();
    const { successMessage, errorMessage } = useToast();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState("");
    const [isSubmittingCoupon, setIsSubmittingCoupon] = useState(false);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

    const fetchCart = async () => {
        setLoading(true);
        try {
            const res = await getCartAction();
            if (res.success && res.data) {
                setCart(res.data);
            } else {
                setCart(null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleUpdateQuantity = async (cartItemId, newCount) => {
        if (newCount < 1) return;
        try {
            const res = await updateCartItemAction(cartItemId, newCount);
            if (res.success) {
                fetchCart();
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage("فشل تحديث الكمية");
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            const res = await removeFromCartAction(cartItemId);
            if (res.success) {
                successMessage("تم حذف العنصر من السلة");
                fetchCart();
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage("فشل حذف العنصر");
        }
    };

    const handleClearCart = async () => {
        try {
            const res = await clearCartAction();
            if (res.success) {
                successMessage("تم تفريغ السلة بنجاح");
                setCart(null);
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage("فشل تفريغ السلة");
        }
    };

    const handleApplyCoupon = async (e) => {
        e.preventDefault();
        if (!couponCode.trim()) return;
        setIsSubmittingCoupon(true);
        try {
            const res = await applyCouponAction(couponCode.trim());
            if (res.success) {
                successMessage("تم تطبيق الكوبون بنجاح!");
                fetchCart();
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage("فشل تطبيق الكوبون");
        } finally {
            setIsSubmittingCoupon(false);
        }
    };

    const handleRemoveCoupon = async () => {
        try {
            const res = await removeCouponAction();
            if (res.success) {
                successMessage("تم إزالة الكوبون");
                fetchCart();
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage("فشل إزالة الكوبون");
        }
    };

    const handleCheckout = async () => {
        if (!cart || !cart._id) return;
        setIsCheckoutLoading(true);

        try {
            if (selectedPaymentMethod === "paypal") {
                const res = await checkoutPaypalAction(cart._id);
                if (res.success && res.data?.approval_url) {
                    successMessage("جاري توجيهك إلى PayPal...");
                    window.location.href = res.data.approval_url;
                } else {
                    errorMessage(res.message || "فشل توليد رابط PayPal");
                }
            } else if (selectedPaymentMethod === "cash") {
                const res = await createCashOrderAction(cart._id);
                if (res.success) {
                    successMessage("تم إنشاء الطلب بنجاح!");
                    router.push("/user/orders");
                } else {
                    errorMessage(res.message || "فشل إنشاء الطلب");
                }
            } else {
                // Paymob: 'card', 'wallet', 'fawry'
                const res = await checkoutPaymobAction(cart._id, selectedPaymentMethod);
                const redirectUrl = res?.redirect_url || res?.data?.redirect_url;
                if (res.success && redirectUrl) {
                    successMessage("جاري توجيهك إلى بوابة الدفع Paymob...");
                    window.location.href = redirectUrl;
                } else {
                    errorMessage(res.message || "فشل توليد رابط الدفع الإلكتروني");
                }
            }
        } catch (err) {
            errorMessage("حدث خطأ أثناء معالجة عملية الدفع");
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    if (loading) {
        return (
            <Section className="py-20 min-h-[60vh] flex items-center justify-center">
                <Container>
                    <div className="text-center text-white/70">جاري تحميل السلة...</div>
                </Container>
            </Section>
        );
    }

    const cartProducts = cart?.products || [];
    const hasItems = cartProducts.length > 0;

    return (
        <Section className="py-12 md:py-20 min-h-[70vh]">
            <Container>
                <div className="mb-8">
                    <SectionTitle
                        title="سلة الشراء"
                        subtitle="مراجعة العناصر المختارة والدفع"
                        centered={false}
                    />
                </div>

                {!hasItems ? (
                    <div className="glass rounded-[24px] p-12 text-center max-w-xl mx-auto space-y-6">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto text-primary">
                            <HiOutlineShoppingBag size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">السلة فارغة حالياً</h3>
                        <p className="text-white/60">تصفح الدورات والمنتجات المتاحة وأضف ما يناسبك إلى السلة.</p>
                        <div className="flex justify-center gap-4 pt-4">
                            <Link href="/courses">
                                <Button className="gradient-button">تصفح الكورسات</Button>
                            </Link>
                            <Link href="/store">
                                <Button variant="outline">المتجر الرقمي</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="space-y-4">
                                {cartProducts.map((cartItem) => {
                                    const itemData = cartItem.item || {};
                                    const isCourse = cartItem.itemType === "Course";
                                    const rawTitle = itemData.title?.ar || itemData.title?.en || itemData.title;
                                    const title = typeof rawTitle === "string" && rawTitle.trim() !== "" ? rawTitle : "عنصر بالسلة";
                                    const imgPath = itemData.thumbnail || itemData.image;
                                    const fullImgUrl = (imgPath && typeof imgPath === "string" && imgPath.trim() !== "")
                                        ? (imgPath.startsWith("http") ? imgPath : `${baseUrl}${imgPath}`)
                                        : "/assets/img-card.jpg";

                                    return (
                                        <div
                                            key={cartItem._id}
                                            className="glass rounded-[20px] p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 justify-between"
                                        >
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                <div className="relative w-20 h-20 rounded-[14px] overflow-hidden flex-shrink-0 bg-white/5">
                                                    <Image
                                                        src={fullImgUrl}
                                                        alt={title}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                                <div>
                                                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary font-medium">
                                                        {isCourse ? "كورس" : "منتج رقمي"}
                                                    </span>
                                                    <h4 className="text-lg font-semibold text-white mt-1 line-clamp-1">{title}</h4>
                                                    <p className="text-primary font-bold text-base mt-1">
                                                        {cartItem.price} ج.م
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-0 border-white/10">
                                                {!isCourse && (
                                                    <div className="flex items-center border border-white/15 rounded-xl bg-white/5 overflow-hidden">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(cartItem._id, cartItem.count - 1)}
                                                            className="px-3 py-1 text-white hover:bg-white/10 transition"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 text-sm text-white font-medium">{cartItem.count}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(cartItem._id, cartItem.count + 1)}
                                                            className="px-3 py-1 text-white hover:bg-white/10 transition"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => handleRemoveItem(cartItem._id)}
                                                    className="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition"
                                                    title="حذف العنصر"
                                                >
                                                    <HiOutlineTrash size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <Button
                                    variant="outline"
                                    onClick={handleClearCart}
                                    className="text-red-400 border-red-500/30 hover:border-red-500 text-sm"
                                >
                                    تفريغ السلة
                                </Button>
                                <Link href="/courses">
                                    <span className="text-sm text-white/70 hover:text-white transition underline">
                                        إضافة المزيد من الكورسات
                                    </span>
                                </Link>
                            </div>

                            {/* Payment Methods Selection */}
                            <div className="glass rounded-[24px] p-6 space-y-4">
                                <h4 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                                    <HiOutlineCreditCard className="text-primary" /> اختر طريقة الدفع
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {PAYMENT_METHODS.map((method) => {
                                        const Icon = method.icon;
                                        const isSelected = selectedPaymentMethod === method.id;

                                        return (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setSelectedPaymentMethod(method.id)}
                                                className={`
                                                    relative
                                                    p-4
                                                    rounded-2xl
                                                    border
                                                    text-right
                                                    transition-all
                                                    duration-200
                                                    flex
                                                    items-start
                                                    gap-3.5
                                                    ${isSelected
                                                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                                                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                                                    }
                                                `}
                                            >
                                                <div
                                                    className={`
                                                        p-2.5
                                                        rounded-xl
                                                        shrink-0
                                                        ${isSelected ? "bg-primary text-white" : "bg-white/10 text-white/70"}
                                                    `}
                                                >
                                                    <Icon size={22} />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h5 className="font-semibold text-sm text-white truncate">
                                                            {method.name}
                                                        </h5>
                                                        {isSelected && (
                                                            <HiOutlineCheckCircle className="text-primary shrink-0" size={18} />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-white/60 mt-1 leading-relaxed">
                                                        {method.description}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary & Checkout */}
                        <div className="space-y-6">
                            {/* Coupon Form */}
                            <div className="glass rounded-[24px] p-6 space-y-4">
                                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                    <HiOutlineTicket className="text-primary" /> كود الخصم
                                </h4>
                                {cart?.coupon ? (
                                    <div className="flex items-center justify-between bg-primary/10 border border-primary/30 rounded-xl p-3">
                                        <span className="text-sm font-semibold text-primary">
                                            الكوبون النشط: {cart.coupon}
                                        </span>
                                        <button
                                            onClick={handleRemoveCoupon}
                                            className="text-xs text-red-400 hover:underline"
                                        >
                                            إزالة
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                        <Input
                                            placeholder="أدخل كود الكوبون"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="text-sm"
                                        />
                                        <Button
                                            type="submit"
                                            disabled={isSubmittingCoupon || !couponCode.trim()}
                                            className="gradient-button text-sm px-4 whitespace-nowrap"
                                        >
                                            تطبيق
                                        </Button>
                                    </form>
                                )}
                            </div>

                            {/* Cart Summary */}
                            <div className="glass rounded-[24px] p-6 space-y-6">
                                <h4 className="text-lg font-bold text-white border-b border-white/10 pb-3">
                                    ملخص الطلب
                                </h4>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-white/70">
                                        <span>إجمالي المنتجات:</span>
                                        <span className="text-white font-semibold">{cart.totalCartPrice} ج.م</span>
                                    </div>

                                    {cart.totalAfterDiscount && (
                                        <div className="flex justify-between text-emerald-400">
                                            <span>السعر بعد الخصم:</span>
                                            <span className="font-bold">{cart.totalAfterDiscount} ج.م</span>
                                        </div>
                                    )}

                                    <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold text-white">
                                        <span>المبلغ الإجمالي:</span>
                                        <span className="text-primary">
                                            {cart.totalAfterDiscount || cart.totalCartPrice} ج.م
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <Button
                                        onClick={handleCheckout}
                                        disabled={isCheckoutLoading}
                                        className="gradient-button w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold"
                                    >
                                        <HiOutlineCreditCard size={20} />
                                        {isCheckoutLoading
                                            ? "جاري تجهيز الدفع..."
                                            : `إتمام الطلب والدفع (${PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod)?.name.split(" ")[0] || "الآن"})`
                                        }
                                    </Button>

                                    <p className="text-center text-xs text-white/50">
                                        جميع المعاملات المالية مشفرة وآمنة 100%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </Section>
    );
}
