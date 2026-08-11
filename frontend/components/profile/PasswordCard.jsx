"use client";

import {
    HiOutlineKey,
    HiOutlineInformationCircle,
} from "react-icons/hi2";
import Section from "../sections/Section";
import useProfile from "@/hooks/profile/useProfile";

const PasswordCard = () => {
    const { loadingPassword, handleChangePassword } = useProfile();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const result = await handleChangePassword(formData);

        if (result?.success) {
            e.target.reset();
        }
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

                <h2
                    className="
                        flex
                        items-center
                        gap-2
                        text-xl
                        font-bold
                    "
                >
                    <HiOutlineKey size={24} />

                    تغيير كلمة المرور
                </h2>


                <p
                    className="
                        mt-2
                        text-text-secondary
                    "
                >
                    قم بتحديث كلمة المرور الخاصة بحسابك.
                </p>

            </div>


            <form onSubmit={handleSubmit} className="space-y-6">


                <div>

                    <label
                        className="
                            mb-2
                            block
                            font-medium
                        "
                    >
                        كلمة المرور الحالية
                    </label>


                    <input
                        type="password"
                        name="currentPassword"
                        required
                        placeholder="••••••••••"
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

                    <label
                        className="
                            mb-2
                            block
                            font-medium
                        "
                    >
                        كلمة المرور الجديدة
                    </label>


                    <input
                        type="password"
                        name="newPassword"
                        required
                        placeholder="••••••••••"
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

                    <label
                        className="
                            mb-2
                            block
                            font-medium
                        "
                    >
                        تأكيد كلمة المرور الجديدة
                    </label>


                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="••••••••••"
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



                <div
                    className="
                        flex
                        gap-3

                        rounded-2xl

                        bg-primary/10

                        p-4

                        text-sm
                        text-text-secondary
                    "
                >

                    <HiOutlineInformationCircle
                        className="shrink-0 text-primary"
                        size={20}
                    />

                    <p>
                        يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل،
                        ويفضل استخدام حروف كبيرة وصغيرة وأرقام ورموز.
                    </p>

                </div>



                <div
                    className="
                        flex
                        justify-end
                    "
                >

                    <button
                        type="submit"
                        disabled={loadingPassword}
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
                        {loadingPassword ? "جاري التحديث..." : "تغيير كلمة المرور"}
                    </button>

                </div>


            </form>


        </Section>
    );
};


export default PasswordCard;