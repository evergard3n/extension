export const ChatBubble : React.FC<{sender: string; message: string}> = ({sender, message}) => {
    if(sender==="You") return <UserBubble message={message}/>;
    else return (
        <div className="text-black bg-white border-[0.5px] border-slate-100 w-full rounded-xl p-2 drop-shadow-sm">
            {/* <p className="font-bold">{sender}</p> */}
            <p>{message}</p>
        </div>
    )
}
const UserBubble: React.FC<{message: string}> = ({ message}) => {
    return (
        <div className="text-black bg-slate-100 w-fit max-w-full rounded-xl py-2 px-4 flex flex-row justify-center gap-2 ml-auto">
            {/* <div className="h-6 w-6 bg-white rounded-full">
                <span className="material-icons">face</span>
            </div> */}
            <div>
                
            <p className="break-all">{message}</p>
            </div>
        </div>
    )
}