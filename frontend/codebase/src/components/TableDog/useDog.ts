import { useEffect, useState } from "react";

import { type RentalDetailsApiGetStatus } from "@/types/rentalDetailsApiGetStatus"
import { getDog, type DogData } from "@/api/rental/dog";


export function useDog(): RentalDetailsApiGetStatus<DogData> {
    const [dogDataState, setDogDataState] = useState<RentalDetailsApiGetStatus<DogData>>({ status: "loading" });

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const data = await getDog(controller.signal);
                setDogDataState({ status: "success", data: data });
            }
            catch (err: unknown) {
                if (controller.signal.aborted) {
                    return;
                }
                setDogDataState({ status: "error" });
            }
        }

        void load();

        // / Cancels the request so no state update happens if, runs on unmount.
        return () => controller.abort();
    }, []);

    return dogDataState;
}
