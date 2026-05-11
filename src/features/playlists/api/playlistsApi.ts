import type {Images} from '@/common/types';
import type {
    CreatePlaylistArgs,
    FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from './playlistsApi.types'
import {baseApi} from "@/app/model/baseApi.ts";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchPlaylist: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: (params) => ({url: 'playlists', params}),
            providesTags: ['playlists']
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: ({title, description}) => ({
                method: 'post',
                url: 'playlists',
                body: {
                    data: {
                        type: "playlists",
                        attributes: {
                            title,
                            description
                        }
                    }
                }
            }),
            invalidatesTags: ['playlists']
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => ({
                method: 'delete',
                url: `playlists/${playlistId}`,
            }),
            invalidatesTags: ['playlists']
        }),
        updatePlaylist: build.mutation<void, { playlistId: string, body: UpdatePlaylistArgs }>({
            query: ({playlistId, body}) => ({
                method: 'put',
                url: `playlists/${playlistId}`,
                body
            }),
            invalidatesTags: ['playlists']
        }),

        uploadPlaylistCover: build.mutation<Images, { playlistId: string, file: File }>({
            query: ({playlistId, file}) => {

                const formData = new FormData()
                formData.append('file', file)

                return ({
                    method: 'post',
                    url: `playlists/${playlistId}/images/main`,
                    body: formData
                })
            },
            invalidatesTags: ['playlists']
        }),
        deletePlaylistCover: build.mutation<void, { playlistId: string }>({
            query: ({playlistId}) => ({
                method: 'delete',
                url: `playlists/${playlistId}/images/main`,
            }),
            invalidatesTags: ['playlists']
        }),
    }),
})

export const {
    useFetchPlaylistQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation
} = playlistsApi