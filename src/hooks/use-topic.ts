import {createTopic} from '@/services/topic'
import {useState } from "react"
import { toast } from "sonner"
import { ChangeEvent } from 'react'

 export  const useCreateTopic = () => {
        const [name, setName] = useState('')

        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
            setName(e.target.value)
        }
        const handleCreateTopic = async() =>{
            try{
                await createTopic({name: name, userId: 1})
                setName('')
                toast(`New topic create successfully`, {
                    position: 'bottom-left',
                    });

            } catch(error) {
                toast.error(`Failed create new topic: ${error}`, {
                position: 'bottom-left',
                });
            }
        }
    return{name, handleCreateTopic, handleInputChange}
    
 }
 
