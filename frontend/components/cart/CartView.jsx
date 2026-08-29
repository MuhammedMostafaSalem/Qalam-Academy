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

import { useLanguage } from "@/providers/LanguageProvider";

export default function CartView() {
    const router = useRouter();
    const { language, isRtl, localize, t } = useLanguage();
    const { successMessage, errorMessage } = useToast();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState("");
    const [isSubmittingCoupon, setIsSubmittingCoupon] = useState(false);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

    const paymentMethods = [
        {
            id: "card",
            name: language === "en" ? "Credit / Debit Card (Visa / MasterCard)" : "بطاقة بنكية (فيزا / ماستركارد)",
            description: language === "en" ? "Secure and direct payment via Paymob" : "دفع آمن ومباشر عبر Paymob",
            icon: HiOutlineCreditCard,
            gateway: "paymob",
            badge: language === "en" ? "Most Popular" : "الأكثر استخداماً",
        },
        {
            id: "wallet",
            name: language === "en" ? "Mobile E-Wallet" : "محفظة إلكترونية (E-Wallet)",
            description: language === "en" ? "Vodafone Cash, Orange, Etisalat, WE Pay" : "فودافون كاش، أورنج، اتصالات، وي باي",
            icon: HiOutlineDevicePhoneMobile,
            gateway: "paymob",
        },
        {
            id: "fawry",
            name: language === "en" ? "Fawry / Aman" : "فوري / أمان (Fawry)",
            description: language === "en" ? "Pay with Fawry reference code at any outlet" : "الدفع عبر كود فوري في أي منفذ",
            icon: HiOutlineBanknotes,
            gateway: "paymob",
        },
        {
            id: "paypal",
            name: "PayPal (USD)",
            description: language === "en" ? "International USD payment via PayPal" : "الدفع الدولي بالدولار عبر PayPal",
            icon: HiOutlineGlobeAlt,
            gateway: "paypal",
        },
        {
            id: "cash",
            name: language === "en" ? "Cash on Delivery / Manual Transfer" : "الدفع عند الاستلام / تحويل يدوي",
            description: language === "en" ? "Create order and complete manual payment" : "إنشاء الطلب والدفع المباشر",
            icon: HiOutlineBanknotes,
            gateway: "cash",
        },
    ];

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
    }, [language]);

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
            errorMessage(language === "en" ? "Failed to update quantity" : "فشل تحديث الكمية");
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            const res = await removeFromCartAction(cartItemId);
            if (res.success) {
                successMessage(language === "en" ? "Item removed from cart" : "تم حذف العنصر من السلة");
                fetchCart();
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage(language === "en" ? "Failed to remove item" : "فشل حذف العنصر");
        }
    };

    const handleClearCart = async () => {
        try {
            const res = await clearCartAction();
            if (res.success) {
                successMessage(language === "en" ? "Cart cleared successfully" : "تم تفريغ السلة بنجاح");
                setCart(null);
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage(language === "en" ? "Failed to clear cart" : "فشل تفريغ السلة");
        }
    };

    const handleApplyCoupon = async (e) => {
        e.preventDefault();
        if (!couponCode.trim()) return;
        setIsSubmittingCoupon(true);
        try {
            const res = await applyCouponAction(couponCode.trim());
            if (res.success) {
                successMessage(language === "en" ? "Coupon applied successfully!" : "تم تطبيق الكوبون بنجاح!");
                fetchCart();
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage(language === "en" ? "Failed to apply coupon" : "فشل تطبيق الكوبون");
        } finally {
            setIsSubmittingCoupon(false);
        }
    };

    const handleRemoveCoupon = async () => {
        try {
            const res = await removeCouponAction();
            if (res.success) {
                successMessage(language === "en" ? "Coupon removed" : "تم إزالة الكوبون");
                fetchCart();
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage(language === "en" ? "Failed to remove coupon" : "فشل إزالة الكوبون");
        }
    };

    const handleCheckout = async () => {
        if (!cart || !cart._id) return;
        setIsCheckoutLoading(true);

        try {
            if (selectedPaymentMethod === "paypal") {
                const res = await checkoutPaypalAction(cart._id);
                if (res.success && res.approvalUrl) {
                    successMessage(language === "en" ? "Redirecting to PayPal..." : "جاري توجيهك إلى PayPal...");
                    window.location.assign(res.approvalUrl);
                } else {
                    errorMessage(res.message || (language === "en" ? "Failed to generate PayPal URL" : "فشل توليد رابط PayPal"));
                }
            } else if (selectedPaymentMethod === "cash") {
                const res = await createCashOrderAction(cart._id);
                if (res.success) {
                    successMessage(language === "en" ? "Order created successfully!" : "تم إنشاء الطلب بنجاح!");
                    router.push("/user/orders");
                } else {
                    errorMessage(res.message || (language === "en" ? "Failed to create order" : "فشل إنشاء الطلب"));
                }
            } else {
                // Paymob: 'card', 'wallet', 'fawry'
                const res = await checkoutPaymobAction(cart._id, selectedPaymentMethod);
                const redirectUrl = res?.redirect_url || res?.data?.redirect_url;
                if (res.success && redirectUrl) {
                    successMessage(language === "en" ? "Redirecting to Paymob gateway..." : "جاري توجيهك إلى بوابة الدفع Paymob...");
                    window.location.href = redirectUrl;
                } else {
                    errorMessage(res.message || (language === "en" ? "Failed to generate payment URL" : "فشل توليد رابط الدفع الإلكتروني"));
                }
            }
        } catch (err) {
            errorMessage(language === "en" ? "An error occurred during payment processing" : "حدث خطأ أثناء معالجة عملية الدفع");
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    if (loading) {
        return (
            <Section className="py-20 min-h-[60vh] flex items-center justify-center">
                <Container>
                    <div className="text-center text-text-secondary">
                        {language === "en" ? "Loading cart..." : "جاري تحميل السلة..."}
                    </div>
                </Container>
            </Section>
        );
    }

    const cartProducts = cart?.products || [];
    const hasItems = cartProducts.length > 0;
    const currencyText = language === "en" ? "EGP" : "ج.م";

    return (
        <Section className="py-12 md:py-20 min-h-[70vh]">
            <Container>
                <div className="mb-8">
                    <SectionTitle
                        title={language === "en" ? "Shopping Cart" : "سلة الشراء"}
                        subtitle={language === "en" ? "Review selected items and checkout" : "مراجعة العناصر المختارة والدفع"}
                        centered={false}
                    />
                </div>

                {!hasItems ? (
                    <div className="glass rounded-[24px] p-12 text-center max-w-xl mx-auto space-y-6">
                        <div className="w-20 h-20 rounded-full bg-card-hover flex items-center justify-center mx-auto text-primary">
                            <HiOutlineShoppingBag size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary">
                            {language === "en" ? "Cart is currently empty" : "السلة فارغة حالياً"}
                        </h3>
                        <p className="text-text-secondary">
                            {language === "en"
                                ? "Browse available courses and digital products to add what suits you."
                                : "تصفح الدورات والمنتجات المتاحة وأضف ما يناسبك إلى السلة."}
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <Link href="/courses">
                                <Button className="gradient-button">
                                    {language === "en" ? "Browse Courses" : "تصفح الكورسات"}
                                </Button>
                            </Link>
                            <Link href="/store">
                                <Button variant="outline">
                                    {language === "en" ? "Digital Store" : "المتجر الرقمي"}
                                </Button>
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
                                    const defaultItemTitle = language === "en" ? "Cart Item" : "عنصر بالسلة";
                                    const title = localize(itemData.title, defaultItemTitle);
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
                                                <div className="relative w-20 h-20 rounded-[14px] overflow-hidden flex-shrink-0 bg-card-hover">
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
                                                        {isCourse
                                                            ? (language === "en" ? "Course" : "كورس")
                                                            : (language === "en" ? "Digital Product" : "منتج رقمي")}
                                                    </span>
                                                    <h4 className="text-lg font-semibold text-text-primary mt-1 line-clamp-1">{title}</h4>
                                                    <p className="text-primary font-bold text-base mt-1">
                                                        {cartItem.price} {currencyText}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-0 border-border">
                                                {!isCourse && (
                                                    <div className="flex items-center border border-border rounded-xl bg-card-hover overflow-hidden">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(cartItem._id, cartItem.count - 1)}
                                                            className="px-3 py-1 text-text-primary hover:bg-card-hover transition"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 text-sm text-text-primary font-medium">{cartItem.count}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(cartItem._id, cartItem.count + 1)}
                                                            className="px-3 py-1 text-text-primary hover:bg-card-hover transition"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => handleRemoveItem(cartItem._id)}
                                                    className="p-2.5 text-error hover:text-error hover:bg-error/10 rounded-xl transition"
                                                    title={language === "en" ? "Remove item" : "حذف العنصر"}
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
                                    className="text-error border-error/30 hover:border-error text-sm"
                                >
                                    {language === "en" ? "Clear Cart" : "تفريغ السلة"}
                                </Button>
                                <Link href="/courses">
                                    <span className="text-sm text-text-secondary hover:text-text-primary transition underline">
                                        {language === "en" ? "Add more courses" : "إضافة المزيد من الكورسات"}
                                    </span>
                                </Link>
                            </div>

                            {/* Payment Methods Selection */}
                            <div className="glass rounded-[24px] p-6 space-y-4">
                                <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-border pb-3">
                                    <HiOutlineCreditCard className="text-primary" />
                                    {language === "en" ? "Select Payment Method" : "اختر طريقة الدفع"}
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {paymentMethods.map((method) => {
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
                                                    text-start
                                                    transition-all
                                                    duration-200
                                                    flex
                                                    items-start
                                                    gap-3.5
                                                    ${isSelected
                                                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                                                        : "border-border bg-card-hover hover:border-primary hover:bg-card-hover"
                                                    }
                                                `}
                                            >
                                                <div
                                                    className={`
                                                        p-2.5
                                                        rounded-xl
                                                        shrink-0
                                                        ${isSelected ? "bg-primary text-white" : "bg-card-hover text-text-secondary"}
                                                    `}
                                                >
                                                    <Icon size={22} />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h5 className="font-semibold text-sm text-text-primary truncate">
                                                            {method.name}
                                                        </h5>
                                                        {isSelected && (
                                                            <HiOutlineCheckCircle className="text-primary shrink-0" size={18} />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
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
                                <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    <HiOutlineTicket className="text-primary" />
                                    {language === "en" ? "Discount Coupon" : "كود الخصم"}
                                </h4>
                                {cart?.coupon ? (
                                    <div className="flex items-center justify-between bg-primary/10 border border-primary/30 rounded-xl p-3">
                                        <span className="text-sm font-semibold text-primary">
                                            {language === "en" ? "Active Coupon: " : "الكوبون النشط: "} {cart.coupon}
                                        </span>
                                        <button
                                            onClick={handleRemoveCoupon}
                                            className="text-xs text-error hover:underline"
                                        >
                                            {language === "en" ? "Remove" : "إزالة"}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                        <Input
                                            placeholder={language === "en" ? "Enter coupon code" : "أدخل كود الكوبون"}
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="text-sm text-text-primary placeholder:text-text-muted"
                                        />
                                        <Button
                                            type="submit"
                                            disabled={isSubmittingCoupon || !couponCode.trim()}
                                            className="gradient-button text-sm px-4 whitespace-nowrap"
                                        >
                                            {language === "en" ? "Apply" : "تطبيق"}
                                        </Button>
                                    </form>
                                )}
                            </div>

                            {/* Cart Summary */}
                            <div className="glass rounded-[24px] p-6 space-y-6">
                                <h4 className="text-lg font-bold text-text-primary border-b border-border pb-3">
                                    {language === "en" ? "Order Summary" : "ملخص الطلب"}
                                </h4>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-text-secondary">
                                        <span>{language === "en" ? "Items Total:" : "إجمالي المنتجات:"}</span>
                                        <span className="text-text-primary font-semibold">{cart.totalCartPrice} {currencyText}</span>
                                    </div>

                                    {cart.totalAfterDiscount && (
                                        <div className="flex justify-between text-success">
                                            <span>{language === "en" ? "After Discount:" : "السعر بعد الخصم:"}</span>
                                            <span className="font-bold">{cart.totalAfterDiscount} {currencyText}</span>
                                        </div>
                                    )}

                                    <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-text-primary">
                                        <span>{language === "en" ? "Total Amount:" : "المبلغ الإجمالي:"}</span>
                                        <span className="text-primary">
                                            {cart.totalAfterDiscount || cart.totalCartPrice} {currencyText}
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
                                            ? (language === "en" ? "Processing Checkout..." : "جاري تجهيز الدفع...")
                                            : (language === "en" ? "Complete Order & Pay" : "إتمام الطلب والدفع")
                                        }
                                    </Button>

                                    <p className="text-center text-xs text-text-muted">
                                        {language === "en"
                                            ? "All transactions are encrypted and 100% secure"
                                            : "جميع المعاملات المالية مشفرة وآمنة 100%"}
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
