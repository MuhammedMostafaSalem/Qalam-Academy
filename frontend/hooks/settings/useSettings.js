"use client";

import { getSettingsAction } from "@/actions/settingsActions";
import { useCallback, useEffect, useState } from "react";

const useSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSettings = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getSettingsAction();

            if (result.success) {
                setSettings(result.data?.settings || result.data || {});
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err?.message || "حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return {
        settings,
        loading,
        error,
        refetch: fetchSettings,
    };
};

export default useSettings;
