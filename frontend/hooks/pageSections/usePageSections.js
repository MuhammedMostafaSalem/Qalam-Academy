"use client";

import { getPageSectionsAction } from "@/actions/pageSectionActions";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

const usePageSections = (
    queryString = ""
) => {
    const [
        pageSections,
        setPageSections,
    ] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    const [meta, setMeta] =
        useState(null);

    const fetchPageSections =
        useCallback(async () => {
            setLoading(true);
            setError(null);

            try {
                const result =
                    await getPageSectionsAction(
                        queryString
                    );

                if (result.success) {
                    const sections =
                        Array.isArray(
                            result.data
                        )
                            ? result.data.map(
                                  (
                                      section
                                  ) => ({
                                      ...section,

                                      content:
                                          {
                                              badge:
                                                  section
                                                      ._translations
                                                      ?.badge ||
                                                  null,

                                              title:
                                                  section
                                                      ._translations
                                                      ?.title ||
                                                  null,

                                              description:
                                                  section
                                                      ._translations
                                                      ?.description ||
                                                  null,
                                          },
                                  })
                              )
                            : [];

                    setPageSections(
                        sections
                    );

                    setMeta(
                        result.meta ||
                            null
                    );
                } else {
                    setError(
                        result.message
                    );
                }
            } catch (err) {
                setError(
                    err?.message ||
                        "حدث خطأ غير متوقع"
                );
            } finally {
                setLoading(false);
            }
        }, [queryString]);

    useEffect(() => {
        fetchPageSections();
    }, [fetchPageSections]);

    return {
        pageSections,
        loading,
        error,
        meta,
        refetch:
            fetchPageSections,
    };
};

export default usePageSections;