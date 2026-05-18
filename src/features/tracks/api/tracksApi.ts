import {baseApi} from "@/app/model/baseApi.ts";
import type {FetchTracksResponse} from "@/features/tracks/api/tracksApi.types.ts";

export const tracksApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | null>({
            infiniteQueryOptions: {
                initialPageParam: null,
                getNextPageParam: (lastPage)=>{
                    return lastPage.meta.nextCursor || null
                }
            },
            query: ({pageParam})=>({
                url: 'playlists/tracks',
                params: { cursor: pageParam, pageSize: 5, paginationType: 'cursor' },
            })
        })
    })
})

export const {useFetchTracksInfiniteQuery} = tracksApi

// import { baseApi } from "@/app/model/baseApi"
// import type { FetchTracksResponse } from "./tracksApi.types"
//
// export const tracksApi = baseApi.injectEndpoints({
//     endpoints: build => ({
//         fetchTracks: build.infiniteQuery<FetchTracksResponse, void, number>({
//             infiniteQueryOptions: {
//                 initialPageParam: 1,
//                 getNextPageParam: (lastPage, _allPages, lastPageParam) => {
//                     return lastPageParam < (lastPage.meta as { pagesCount: number }).pagesCount
//                         ? lastPageParam + 1
//                         : undefined
//                 },
//             },
//             query: ({ pageParam }) => {
//                 return {
//                     url: 'playlists/tracks',
//                     params: { pageNumber: pageParam, pageSize: 10, paginationType: 'offset' },
//                 }
//             },
//         }),
//     }),
// })
//
// export const { useFetchTracksInfiniteQuery } = tracksApi