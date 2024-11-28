export const ChatBubble : React.FC<{sender: string; message: string}> = ({sender, message}) => {
    return (
        <div className="text-black">
            <p className="font-bold">{sender}</p>
            <p>{message}</p>
        </div>
    )
}