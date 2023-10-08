interface ChatWrapperProps {
  isSubscribed?: boolean
  fileId: string
}

const ChatWrapper = ({ isSubscribed, fileId }: ChatWrapperProps) => {
  return <div>{fileId}</div>
}

export default ChatWrapper
