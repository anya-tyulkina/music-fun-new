import type {CreatePlaylistArgs, PlaylistData, PlaylistsResponse, UpdatePlaylistArgs} from './playlistsApi.types'
import {baseApi} from "@/app/model/baseApi.ts";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchPlaylist: build.query<PlaylistsResponse, void>({
            query: () => 'playlists',
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
    }),
})

export const {
    useFetchPlaylistQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation
} = playlistsApi