import {useUpdatePlaylistMutation} from "@/features/playlists/api/playlistsApi.ts";
import type {SubmitHandler, UseFormHandleSubmit, UseFormRegister} from "react-hook-form";
import type {UpdatePlaylistArgs} from "../../api/playlistsApi.types";

type Props = {
    playlistId: string
    setPlaylistId: (playlistId: null) => void
    register: UseFormRegister<UpdatePlaylistArgs>
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
    editPlaylist: (playlistId: null) => void
}

export const EditPlaylistForm = ({playlistId, setPlaylistId, handleSubmit, register, editPlaylist}: Props) => {
    const [updatePlaylist] = useUpdatePlaylistMutation()

    const onSubmit: SubmitHandler<UpdatePlaylistArgs> = data => {
        const body = {
            data: {
                type: 'playlists',
                attributes: {
                    ...data.data.attributes
                }
            }
        }

        if (!playlistId) return

        updatePlaylist({
            playlistId,
            body
        }).then(() => {
            setPlaylistId(null)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit playlist</h2>
            <div>
                <input {...register('data.attributes.title')} placeholder={'title'}/>
            </div>
            <div>
                <input {...register('data.attributes.description')}
                       placeholder={'description'}/>
            </div>
            <button type={'submit'}>save</button>
            <button type={'button'} onClick={() => editPlaylist(null)}>
                cancel
            </button>
        </form>
    )
}