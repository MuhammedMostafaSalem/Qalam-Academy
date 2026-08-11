"use client";

import { getMessagesAction } from "@/actions/contactActions";
import { useCallback, useEffect, useState } from "react";

const useMessages = (queryString = "") => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);

    const fetchMessages = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getMessagesAction(queryString);

            if (result.success) {
                setMessages(result.data);
                setMeta(result.meta);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err?.message || "حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    }, [queryString]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    return {
        messages,
        loading,
        error,
        meta,
        refetch: fetchMessages,
    };
};

export default useMessages;
