"use client";

import { useLanguage as useLanguageHook } from "@/providers/LanguageProvider";

export const useLanguage = () => {
    return useLanguageHook();
};

export default useLanguage;
