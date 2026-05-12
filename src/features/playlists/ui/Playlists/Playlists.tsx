import {EditPlaylistForm} from "@/features/playlists/ui/PlaylistPage/EditPlaylistForm/EditPlaylistForm.tsx";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistPage/PlaylistItem/PlaylistItem.tsx";
import {useForm} from "react-hook-form";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import {useDeletePlaylistMutation} from "@/features/playlists/api/playlistsApi.ts";
import {useState} from "react";
import s from './PlaylistsPage.module.css'

type Props = {
    isLoading: boolean,
    playlists: PlaylistData[]
}

export const Playlists = ({isLoading, playlists}: Props) => {
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>()
    const [deletePlaylist] = useDeletePlaylistMutation()

    const [playlistId, setPlaylistId] = useState<string | null>(null)


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
        <div className={s.items}>
            {!playlists.length && !isLoading && <h2>Playlists not found</h2>}
            {playlists.map(playlist => {

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
    )
}