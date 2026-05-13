import type { Ref } from "react"

type Props = {
    observerRef: Ref<HTMLDivElement>
    isFetchingNextPage: boolean
}
export const LoadingTrigger = ({isFetchingNextPage, observerRef}: Props) => {

    return (
        <div ref={observerRef}>
            {isFetchingNextPage ? <div>loading more tracks</div> : <div style={{height: '20px'}}/>}
        </div>

    )
}