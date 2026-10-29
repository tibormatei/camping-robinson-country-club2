import { useEffect, useState } from "react";

import { type ApiGetStatus } from "@/types/apiGetStatus"
import { getTent, type TentData } from "@/api/rental/tent";



export type UseTentResult = {
    status: ApiGetStatus;
    data: TentData | null;
};

export function useTent(): UseTentResult {
    const [status, setStatus] = useState<ApiGetStatus>("loading");
    const [data, setData] = useState<TentData | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            setStatus("loading");
            setData(null);

            try {
                const tentData = await getTent(controller.signal);
                setData(tentData);
                setStatus("success");
            }
            catch (err: unknown) {
                if (controller.signal.aborted) {
                    return;
                }
                setStatus("error");
            }
        }

        void load();

        // / Cancels the request so no state update happens if, runs on unmount.
        return () => controller.abort();
    }, []);

    return { status, data };
}
