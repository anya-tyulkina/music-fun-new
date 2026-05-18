import {useGetMeQuery} from "@/features/auth/api/authApi.ts";

export const MainPage = () => {
    const {data} = useGetMeQuery()

    return (
        <div>
            <span>Main Page</span>
            <h1>{data?.login}</h1>
        </div>
    )
}