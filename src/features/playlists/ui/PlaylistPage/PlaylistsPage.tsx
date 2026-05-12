import {useFetchPlaylistQuery} from "../../api/playlistsApi.ts"
import {CreatePlaylistForm} from "./CreatePlaylistForm/CreatePlaylistForm.tsx"
import s from './PlaylistsPage.module.css'
import {type ChangeEvent, useState} from "react";
import {useDebounceValue} from "@/common/hooks";
import {Pagination} from "@/common/components";
import {Playlists} from "@/features/playlists/ui/Playlists/Playlists.tsx";

export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const debounceSearch = useDebounceValue(search)
    const {data, isLoading} = useFetchPlaylistQuery({search: debounceSearch, pageNumber: currentPage, pageSize})

    const changePageSizeHandler =(size: number)=>{
        setCurrentPage(1)
        setPageSize(size)
    }

    const searchPlaylistHandler =(e: ChangeEvent<HTMLInputElement, HTMLInputElement>)=>{
        setSearch(e.currentTarget.value)
        setCurrentPage(1)
    }

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <Pagination currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pagesCount={data?.meta.pagesCount || 1}
                        pageSize={pageSize}
                        changePageSize={changePageSizeHandler}
            />

            <input type="search" placeholder={'Search...'} onChange={(e) => searchPlaylistHandler(e)}/>

           <Playlists isLoading={isLoading} playlists={data?.data || []}/>
        </div>
    )
}