"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { getProductsAction } from "@/actions/productActions";
import { getCategoriesAction } from "@/actions/categoryActions";
import { addToCartAction } from "@/actions/cartActions";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { HiOutlineShoppingCart, HiOutlineDocumentDownload } from "react-icons/hi";

import { useLanguage } from "@/providers/LanguageProvider";

export default function StoreProductsGrid() {
    const router = useRouter();
    const { language, localize, t } = useLanguage();
    const { successMessage, errorMessage } = useToast();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [addingId, setAddingId] = useState(null);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [prodRes, catRes] = await Promise.all([
                    getProductsAction("isPublished=true&limit=20"),
                    getCategoriesAction("type=product"),
                ]);

                if (prodRes.success && Array.isArray(prodRes.data)) {
                    setProducts(prodRes.data);
                }
                if (catRes.success && Array.isArray(catRes.data)) {
                    setCategories(catRes.data);
                }
            } catch (err) {
                console.error("Error fetching store data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [language]);

    const handleAddToCart = async (productId, redirect = false) => {
        setAddingId(productId);
        try {
            const res = await addToCartAction(productId, "Product");
            if (res.success) {
                successMessage(res.message || (language === "en" ? "Product added to cart" : "تمت إضافة المنتج إلى السلة"));
                if (redirect) {
                    router.push("/cart");
                }
            } else {
                errorMessage(res.message);
            }
        } catch (err) {
            errorMessage(language === "en" ? "Please sign in to purchase" : "يرجى تسجيل الدخول لأغراض الشراء");
        } finally {
            setAddingId(null);
        }
    };

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((p) => (p.category?._id || p.category) === selectedCategory);

    const currencyText = language === "en" ? "EGP" : "ج.م";
    const allText = language === "en" ? "All" : "الكل";
    const buyNowText = language === "en" ? "Buy Now" : "شراء الآن";
    const priceText = language === "en" ? "Price:" : "السعر:";
    const digitalFileBadge = language === "en" ? "Digital File (PDF)" : "ملف رقمي (PDF)";

    return (
        <section className="py-12 md:py-20">
            <Container>
                {/* Category Filters */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                                selectedCategory === "all"
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "glass text-text-secondary hover:text-text-primary"
                            }`}
                        >
                            {allText}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() => setSelectedCategory(cat._id)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                                    selectedCategory === cat._id
                                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "glass text-text-secondary hover:text-text-primary"
                                }`}
                            >
                                {localize(cat.title || cat.name)}
                            </button>
                        ))}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-16 text-text-secondary">
                        {language === "en" ? "Loading digital products..." : "جاري تحميل المنتجات الرقمية..."}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="glass rounded-[24px] p-12 text-center max-w-md mx-auto">
                        <HiOutlineDocumentDownload size={48} className="mx-auto text-primary mb-4" />
                        <h3 className="text-xl font-bold text-text-primary mb-2">
                            {language === "en" ? "No products available currently" : "لا توجد منتجات حالياً"}
                        </h3>
                        <p className="text-text-secondary text-sm">
                            {language === "en" ? "Check back soon for latest books and digital assets." : "عد قريباً لمتابعة أحدث الكتب والملفات الرقمية."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => {
                            const title = localize(product.title, language === "en" ? "Digital Product" : "منتج رقمي");
                            const description = localize(product.description);
                            const imgPath = product.image;
                            const fullImgUrl = (imgPath && typeof imgPath === "string" && imgPath.trim() !== "")
                                ? (imgPath.startsWith("http") ? imgPath : `${baseUrl}${imgPath}`)
                                : "/assets/img-card.jpg";

                            const isAdding = addingId === product._id;

                            return (
                                <div
                                    key={product._id}
                                    className="glass rounded-[24px] overflow-hidden flex flex-col justify-between hover:border-primary/50 transition duration-300 group"
                                >
                                    <div>
                                        <div className="relative aspect-[4/3] w-full bg-card-hover overflow-hidden">
                                            <Image
                                                src={fullImgUrl}
                                                alt={title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition duration-500"
                                                unoptimized
                                            />
                                        </div>

                                        <div className="p-5 space-y-2">
                                            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary font-medium">
                                                {digitalFileBadge}
                                            </span>
                                            <h3 className="text-lg font-bold text-text-primary line-clamp-1 mt-1">{title}</h3>
                                            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{description}</p>
                                        </div>
                                    </div>

                                    <div className="p-5 pt-0 space-y-3 border-t border-border mt-4">
                                        <div className="flex items-center justify-between pt-3">
                                            <span className="text-sm text-text-secondary">{priceText}</span>
                                            <div className="text-left">
                                                {product.discountPrice ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-text-muted line-through">{product.price} {currencyText}</span>
                                                        <span className="text-base font-bold text-primary">{product.discountPrice} {currencyText}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-base font-bold text-primary">{product.price} {currencyText}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <Button
                                                onClick={() => handleAddToCart(product._id, true)}
                                                disabled={isAdding}
                                                className="gradient-button text-xs py-2.5 w-full flex items-center justify-center gap-1"
                                            >
                                                {buyNowText}
                                            </Button>

                                            <Button
                                                onClick={() => handleAddToCart(product._id, false)}
                                                disabled={isAdding}
                                                variant="outline"
                                                className="text-xs py-2.5 w-full border-border hover:border-primary text-text-primary"
                                            >
                                                <HiOutlineShoppingCart size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Container>
        </section>
    );
}
