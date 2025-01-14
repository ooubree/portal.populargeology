import {useFetchAllExhibitsQuery} from "../store/services/ExhibitService";
import {Time} from "../types/timeline";
import {IExhibit} from "../types/models/IExhibit";


export const useFetchAllExhibits = (groupOf = 6, time: Time, limit = 0) => {

    const {isLoading, data } =
        useFetchAllExhibitsQuery({
            limit,
            time
        }
        , {pollingInterval: 60000}
        )

    const isLoadingExhibits: boolean = isLoading

    const fillExhibitsList = (fetchedData, groupOf_: number) => {
        const exhibits: IExhibit[][] = []

        if (fetchedData != undefined) {
            if ('results' in fetchedData) {
                fetchedData?.results?.forEach((exhibit: IExhibit, index) => {
                    if (exhibit != undefined) {
                        if ((index % groupOf_) == 0) {
                            exhibits.push([exhibit])
                        } else {
                            exhibits[Math.floor(index / groupOf_)].push(exhibit)
                        }
                    }
                })
            } else {
                fetchedData?.forEach((exhibit: IExhibit, index) => {
                    if (exhibit != undefined) {
                        if ((index % groupOf_) == 0) {
                            exhibits.push([exhibit])
                        } else {
                            exhibits[Math.floor(index / groupOf_)].push(exhibit)
                        }
                    }
                })
            }
        }

        return exhibits
    }

    const fetchedExhibits: IExhibit[][] = fillExhibitsList(data, groupOf)

    return { isLoadingExhibits, fetchedExhibits }
}
