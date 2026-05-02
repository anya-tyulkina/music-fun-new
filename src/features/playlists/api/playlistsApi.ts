import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {CreatePlaylistArgs, PlaylistData, PlaylistsResponse} from './playlistsApi.types'

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    tagTypes: ['playlists'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: headers => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        },
    }),
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => 'playlists',
            providesTags: ['playlists']
        }),
        createPlaylists: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
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
    }),
})

export const {useFetchPlaylistsQuery, useCreatePlaylistsMutation} = playlistsApi