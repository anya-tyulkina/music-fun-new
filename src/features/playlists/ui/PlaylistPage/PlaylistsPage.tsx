import {useForm} from "react-hook-form";
import {useDeletePlaylistMutation, useFetchPlaylistQuery} from "../../api/playlistsApi.ts"
import {CreatePlaylistForm} from "./CreatePlaylistForm/CreatePlaylistForm.tsx"
import s from './PlaylistsPage.module.css'
import {useState} from "react";
import type {PlaylistData, UpdatePlaylistArgs} from "../../api/playlistsApi.types.ts";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistPage/PlaylistItem/PlaylistItem.tsx";
import {EditPlaylistForm} from "@/features/playlists/ui/PlaylistPage/EditPlaylistForm/EditPlaylistForm.tsx";
import {useDebounceValue} from "@/common/hooks";

export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')

    const debounceSearch = useDebounceValue(search)
    const {data, isLoading} = useFetchPlaylistQuery({search: debounceSearch})
    const [deletePlaylist] = useDeletePlaylistMutation()

    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>()

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            reset({
                data: {
                    attributes: {
                        title: playlist.attributes.title,
                        description: playlist.attributes.description,
                        tagIds: playlist.attributes.tags.map(t => t.id)
                    }
                }
            })
        } else {
            setPlaylistId(null)
        }
    }

    const deletePlaylistHandler = (id: string) => {
        if (confirm('Are you sure you want to delete the playlist?')) {
            deletePlaylist(id)
        }
    }

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>

            <input type="search" placeholder={'Search...'} onChange={(e) => setSearch(e.currentTarget.value)}/>

            <div className={s.items}>
                {!data?.data.length && !isLoading && <h2>Playlists not found</h2>}
                {data?.data.map(playlist => {

                    const isEditing = playlistId === playlist.id

                    return (
                        <div className={s.item} key={playlist.id}>
                            {isEditing
                                ? <EditPlaylistForm playlistId={playlist.id} editPlaylist={editPlaylistHandler}
                                                    setPlaylistId={setPlaylistId} handleSubmit={handleSubmit}
                                                    register={register}/>

                                : <PlaylistItem playlist={playlist} editPlaylist={editPlaylistHandler}
                                                deletePlaylist={deletePlaylistHandler}/>
                            }

                        </div>
                    )
                })}
            </div>
        </div>
    )
}