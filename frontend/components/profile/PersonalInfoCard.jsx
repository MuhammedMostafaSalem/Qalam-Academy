"use client";

import Section from "../sections/Section";
import useProfile from "@/hooks/profile/useProfile";

const PersonalInfoCard = () => {
    const { user, loadingProfile, handleUpdateProfile } = useProfile();

    if (!user) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await handleUpdateProfile(formData);
    };

    return (
        <Section
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
            "
        >
            <div className="mb-8">
                <h2 className="text-xl font-bold">
                    المعلومات الشخصية
                </h2>

                <p className="mt-2 text-text-secondary">
                    قم بتحديث بيانات حسابك الشخصية.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid gap-6 lg:grid-cols-2">

                    <div>
                        <label className="mb-2 block font-medium">
                            الاسم الأول
                        </label>

                        <input
                            type="text"
                            name="firstName"
                            defaultValue={user.firstName || ""}
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            الاسم الأخير
                        </label>

                        <input
                            type="text"
                            name="lastName"
                            defaultValue={user.lastName || ""}
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            البريد الإلكتروني
                        </label>

                        <input
                            type="email"
                            defaultValue={user.email || ""}
                            disabled
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background/50
                                px-4
                                py-3
                                outline-none
                                opacity-60
                                cursor-not-allowed
                            "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            رقم الهاتف
                        </label>

                        <input
                            type="text"
                            name="phone"
                            defaultValue={user.phone || ""}
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            الدولة
                        </label>

                        <input
                            type="text"
                            name="country"
                            defaultValue={user.country || ""}
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            المدينة
                        </label>

                        <input
                            type="text"
                            name="city"
                            defaultValue={user.city || ""}
                            className="
                                w-full
                                rounded-2xl
                                border
                                border-border
                                bg-background
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-primary
                            "
                        />
                    </div>

                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        العنوان
                    </label>

                    <input
                        type="text"
                        name="address"
                        defaultValue={user.address || ""}
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-primary
                        "
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        نبذة شخصية
                    </label>

                    <textarea
                        name="bio"
                        rows={5}
                        defaultValue={user.bio || ""}
                        className="
                            w-full
                            resize-none
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-primary
                        "
                    />
                </div>

                <div className="flex justify-end">

                    <button
                        type="submit"
                        disabled={loadingProfile}
                        className="
                            rounded-2xl
                            bg-primary
                            px-6
                            py-3
                            font-medium
                            text-white
                            transition
                            hover:opacity-90
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {loadingProfile ? "جاري الحفظ..." : "حفظ التعديلات"}
                    </button>

                </div>

            </form>
        </Section>
    );
};

export default PersonalInfoCard;