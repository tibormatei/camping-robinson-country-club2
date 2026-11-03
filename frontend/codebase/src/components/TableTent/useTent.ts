import { useEffect, useState } from "react";

import { type ApiGetState } from "@/types/apiGetState"
import { getTent, type TentData } from "@/api/rental/tent";


export function useTent(): ApiGetState<TentData> {
    const [tentDataState, setTentDataState] = useState<ApiGetState<TentData>>({ status: "loading" });

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const data = await getTent(controller.signal);
                setTentDataState({ status: "success", data: data });
            }
            catch {
                if (controller.signal.aborted) {
                    return;
                }
                setTentDataState({ status: "error" });
            }
        }

        void load();

        // Cancels the pending request when the component unmounts, so no state update happens afterwards.
        return () => controller.abort();
    }, []);

    return tentDataState;
}
