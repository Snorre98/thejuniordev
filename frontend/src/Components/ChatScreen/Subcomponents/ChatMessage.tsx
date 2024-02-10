import styles from "./ChatMessage.module.scss"

type ChatMessageProps = {
    messageText: string;
    isSender: boolean;

}
export function ChatMessage({messageText, isSender}: ChatMessageProps){
    return (
        <>
            <p className={isSender? styles.chatMessage : styles.chatMessage}>
                {messageText}
            </p>
        </>
    )
}