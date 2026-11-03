import { useEffect, useState } from "react";

import { type ApiGetState } from "@/types/apiGetState"
import { getTrailers, type TrailersData } from "@/api/rental/trailer";


export function useTrailers(): ApiGetState<TrailersData> {
    const [trailersDataState, setTrailersDataState] = useState<ApiGetState<TrailersData>>({ status: "loading" });

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const data = await getTrailers(controller.signal);
                setTrailersDataState({ status: "success", data: data });
            }
            catch {
                if (controller.signal.aborted) {
                    return;
                }
                setTrailersDataState({ status: "error" });
            }
        }

        void load();

        // Cancels the pending request when the component unmounts, so no state update happens afterwards.
        return () => controller.abort();
    }, []);

    return trailersDataState;
}
