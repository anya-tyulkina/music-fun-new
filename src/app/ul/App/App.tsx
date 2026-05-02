import {Header} from "@/common/components";
import s from './App.module.css'
import { Routing } from "@/common/routing";

export const App = () => {
    return (
        <>
            <Header/>
            <div className={s.layout}>
                <Routing/>
            </div>
        </>
    )
}