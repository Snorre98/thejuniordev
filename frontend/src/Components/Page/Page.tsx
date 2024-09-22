import { Children } from "../../types";
import styles from "./Page.module.scss"

type PageProps = {
    className?: string;
    children?: Children;  
}

//className
//classNames(styles.page, className)

export function Page({children}: PageProps) {
    return <div className={styles.page}>{children}</div>
}