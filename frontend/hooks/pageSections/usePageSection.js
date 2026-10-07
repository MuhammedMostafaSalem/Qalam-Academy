"use client";

import { useCallback, useEffect, useState } from "react";

import { getPageSectionsAction } from "@/actions/pageSectionActions";

const usePageSection = (page, section) => {
    const [pageSection, setPageSection] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchPageSection = useCallback(async () => {
        if (!page || !section) {
            setPageSection(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await getPageSectionsAction(
                `page=${page}&section=${section}`,
            );

            if (!result.success) {
                setError(result.message);

                setPageSection(null);

                return;
            }

            const foundSection = (result.data || []).find(
                (item) => item.page === page && item.section === section,
            );

            setPageSection(foundSection || null);
        } catch (error) {
            setError(error?.message || "Failed to fetch page section");

            setPageSection(null);
        } finally {
            setLoading(false);
        }
    }, [page, section]);

    useEffect(() => {
        fetchPageSection();
    }, [fetchPageSection]);

    return {
        pageSection,
        loading,
        error,
        refetch: fetchPageSection,
    };
};

export default usePageSection;
