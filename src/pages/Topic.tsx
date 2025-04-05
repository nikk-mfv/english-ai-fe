import { Input } from "@/components/ui/input"
import { useCreateTopic } from "@/hooks/use-topic"
import { Button } from "@/ui/button"

export default function Topic() {
  const {name, handleCreateTopic, handleInputChange} = useCreateTopic()
  return(
  <div>
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold p-5">Your Topics</h1>
      <div className='max-w-sx'>
        <Input type="text" className="w-full mb-2" placeholder="input your topic" onChange={handleInputChange} value={name} />
        <Button className="w-full" onClick={handleCreateTopic}>Create</Button>
      </div>
    </div>
  </div>)
}
    
    
  
  
  
