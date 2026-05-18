import {useFetchTracksInfiniteQuery} from "@/features/tracks/api/tracksApi.ts";
import {TrackList} from "@/features/tracks/ui/TrackList/TrackList.tsx";
import {LoadingTrigger} from "@/features/tracks/ui/LoadingTrigger/LoadingTrigger.tsx";
import {useInfinityScroll} from "@/common/hooks";

export const TracksPage = () => {
    const {data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage} = useFetchTracksInfiniteQuery()
    const pages = data?.pages.flatMap((page) => page.data) || []

    const {observerRef} = useInfinityScroll({isFetching, fetchNextPage, hasNextPage})

    if (isLoading) return <div>Skeleton loading...</div>

    return (
        <div>
            <h1>Tracks page</h1>
            <TrackList tracks={pages}/>
            <>
                {hasNextPage && (<LoadingTrigger isFetchingNextPage={isFetchingNextPage} observerRef={observerRef}/>)}
                {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
            </>
        </div>
    )
}