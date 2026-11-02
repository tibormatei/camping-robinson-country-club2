import { useEffect, useState } from "react";

import { type RentalDetailsApiGetStatus } from "@/types/rentalDetailsApiGetStatus"
import { getTent, type TentData } from "@/api/rental/tent";


export function useTent(): RentalDetailsApiGetStatus<TentData> {
    const [tentDataState, setTentDataState] = useState<RentalDetailsApiGetStatus<TentData>>({ status: "loading" });

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const data = await getTent(controller.signal);
                setTentDataState({ status: "success", data: data });
            }
            catch (err: unknown) {
                if (controller.signal.aborted) {
                    return;
                }
                setTentDataState({ status: "error" });
            }
        }

        void load();

        // / Cancels the request so no state update happens if, runs on unmount.
        return () => controller.abort();
    }, []);

    return tentDataState;
}
