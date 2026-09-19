"use client";

import { useEffect, useState } from "react";
import { getHeroByPageAction } from "@/actions/heroActions";
import { useLanguage } from "@/providers/LanguageProvider";

/**
 * Loads the active hero for a public page and refreshes it when the language
 * changes so the backend can return the correct translated fields.
 *
 * A missing/inactive hero is intentionally represented by null. Hero
 * components keep their existing static copy as a resilient fallback.
 */
export function usePublicHero(page) {
    const { language } = useLanguage();
    const [hero, setHero] = useState(null);

    useEffect(() => {
        let isCurrent = true;

        const loadHero = async () => {
            try {
                const result = await getHeroByPageAction(page);

                if (isCurrent) {
                    setHero(result.success && result.data ? result.data : null);
                }
            } catch {
                if (isCurrent) {
                    setHero(null);
                }
            }
        };

        loadHero();

        return () => {
            isCurrent = false;
        };
    }, [language, page]);

    return hero;
}

export default usePublicHero;
