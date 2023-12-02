// import classNames from "classnames";
import { Children } from "../../types";
import styles from "./Screen.module.scss"

type ScreenProps = {
    children?: Children;  
}

//className
//classNames(styles.page, className)

export function Screen({children}: ScreenProps) {
    return <div className={styles.screen}> <div className = {styles.notch}></div> {children}</div>
}