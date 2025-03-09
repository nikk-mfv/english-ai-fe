import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from 'react';
import { Button } from "@/components/ui/button"

interface ChatInput{
    message: string
}
export function ChatBox() {
    const {handleSubmit } = useForm<ChatInput>();
const [textInput, setTextInput] = useState("")
const onSubmit: SubmitHandler<ChatInput> = (data) => {
    console.log("Tin nhắn đã gửi đi:", data.message);
  };
    return (<div className='h-[calc(100vh-4rem)] flex flex-col justify-center items-center '>
                    <h1 className='text-2xl font-medium m-4'>What can I help with?</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col border-2 min-w-xl max-w-4xl rounded-lg p-4 shadow-lg'>

                            <textarea className='w-full top-0 left-0  h-auto min-h-[3rem] resize-none focus:outline-none' placeholder="Ask anything" value={textInput} onChange={(e) => setTextInput(e.target.value)}/>
                            <Button className='self-end' type='submit' disabled={!textInput.trim()}>Send</Button>
                    </form>
            </div>
    )
}
