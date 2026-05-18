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
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
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
                },
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
            onQueryStarted: async ({playlistId, body}, {queryFulfilled, dispatch, getState}) => {

                const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists')

                const patchCollections: any[] = []

                args.forEach(arg => {
                    patchCollections.push(dispatch(playlistsApi.util.updateQueryData('fetchPlaylists', {
                            pageNumber: arg.pageNumber,
                            pageSize: arg.pageSize,
                            search: arg.search
                        }, (state) => {
                            const index = state.data.findIndex(el => el.id === playlistId)
                            if (index !== -1) {
                                state.data[index].attributes = {...state.data[index].attributes, ...body}
                            }
                        })
                    ))
                })

                try {
                    await queryFulfilled
                } catch (error) {
                    patchCollections.forEach((patchCollection)=>{
                        patchCollection.undo()
                    })
                }
            },
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
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation
} = playlistsApi