import { useEffect, useState } from "react";

import { type ApiGetState } from "@/types/apiGetState"
import { getDog, type DogData } from "@/api/rental/dog";


export function useDog(): ApiGetState<DogData> {
    const [dogDataState, setDogDataState] = useState<ApiGetState<DogData>>({ status: "loading" });

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const data = await getDog(controller.signal);
                setDogDataState({ status: "success", data: data });
            }
            catch {
                if (controller.signal.aborted) {
                    return;
                }
                setDogDataState({ status: "error" });
            }
        }

        void load();

        // Cancels the pending request when the component unmounts, so no state update happens afterwards.
        return () => controller.abort();
    }, []);

    return dogDataState;
}
