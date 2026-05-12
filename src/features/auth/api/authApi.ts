import { baseApi } from "@/app/model/baseApi"
import type { MeResponse } from "./authApi.types"

export const authApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getMe: build.query<MeResponse, void>({
            query: () => `auth/me`,
        }),
    }),
})

export const { useGetMeQuery } = authApi