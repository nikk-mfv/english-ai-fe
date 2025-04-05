import { Input } from "@/components/ui/input"
import { Button } from "@/ui/button"
import {createTopic} from '@/services/topic'
import { ChangeEvent, useState } from "react"


export default function Topic() {
  const [inputName,setinputName] = useState('');
  
  const handleChange = ((e: ChangeEvent<HTMLInputElement>) => setinputName(e.target.value))

  const HandleClick = () => {
    createTopic({name: inputName, userId: 1})
  }
  return(
  <div>
    <Input type="text" placeholder="name" value={inputName} onChange={handleChange}/>
    <Button onClick={HandleClick}>Create</Button>
  </div>)
}
  
