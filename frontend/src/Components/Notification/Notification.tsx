// import classNames from "classnames";
import { Children } from "../../types";
import styles from "./Notification.module.scss"

type NotificationProps = {
    children?: Children;  
}

//className
//classNames(styles.page, className)

export function Notification() {
    return(<><div className = {styles.notificationContainer}>test</div></>)
}