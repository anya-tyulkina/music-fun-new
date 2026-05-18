import s from './LinearProgress.module.css'

type Props = {
    height?: number
}

export const LinearProgress = ({height = 4}: Props) => {
    return (
        <div style={{height}} className={s.root}>
            <div className={`${s.base} ${s.indeterminate1}`}/>
            <div className={`${s.base} ${s.indeterminate2}`}/>
        </div>
    )
}