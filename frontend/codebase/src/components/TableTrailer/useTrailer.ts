import { useEffect, useState } from "react";

import { type RentalDetailsApiGetStatus } from "@/types/rentalDetailsApiGetStatus"
import { getTrailers, type TrailersData } from "@/api/rental/trailer";


export function useTrailers(): RentalDetailsApiGetStatus<TrailersData> {
    const [trailersDataState, setTrailersDataState] = useState<RentalDetailsApiGetStatus<TrailersData>>({ status: "loading" });

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const data = await getTrailers(controller.signal);
                setTrailersDataState({ status: "success", data: data });
            }
            catch (err: unknown) {
                if (controller.signal.aborted) {
                    return;
                }
                setTrailersDataState({ status: "error" });
            }
        }

        void load();

        // / Cancels the request so no state update happens if, runs on unmount.
        return () => controller.abort();
    }, []);

    return trailersDataState;
}
