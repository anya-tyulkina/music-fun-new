import {useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation} from "@/features/playlists/api/playlistsApi.ts";
import defaultCover from "@/assets/images/default-playlist-cover.png";
import type {ChangeEvent} from "react";
import type {Images} from "@/common/types";
import s from './PlaylistCover.module.css'
import { toast } from "react-toastify";

type Props = {
    playlistId: string
    images: Images
}

export const PlaylistCover = ({playlistId, images}: Props) => {
    const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
    const [deleteCover] = useDeletePlaylistCoverMutation()

    const originalCover = images.main.find(el => el.type === 'original')
    const src = originalCover ? originalCover.url : defaultCover

    const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const allowedFiles = ['image/jpeg', 'image/png', 'image/gif']
        const maxSize = 1024 * 1024

        const file = event.target.files?.length && event.target.files[0]

        if (!file) return

        if (!allowedFiles.includes(file.type)) {
            toast('Only JPEG, PNG or GIF images are allowed', { type: 'error', theme: 'colored' })
            return
        }

        if (file.size > maxSize) {
            toast(`The file is too large (max. ${Math.round(maxSize / 1024)} KB)`, {
                type: 'error',
                theme: 'colored',
            })
            return
        }

        uploadPlaylistCover({playlistId, file})
    }

    const deleteCoverHandler = () => {
        deleteCover({playlistId})
    }
    return (
        <>
            <img src={src} alt="cover" width={'240px'} className={s.cover}/>
            <input type='file' accept={"image/jpeg, image/png, image/gif"} onChange={uploadCoverHandler}/>
            {originalCover && <button onClick={deleteCoverHandler}>delete cover</button>}
        </>

    )
}