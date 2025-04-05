import { Input } from "@/components/ui/input"
import { useCreateTopic } from "@/hooks/use-topic"
import { Button } from "@/ui/button"

export default function Topic() {
  const {name, handleCreateTopic} = useCreateTopic()
  return(
  <div>
    <Input type="text" placeholder="topic name" value={name}/>
    <Button onClick={handleCreateTopic}>Create</Button>

    {/* <div>{topics.map((topic) => {
      return <p key={topic.name}>{topic.name}</p>
    })}
    </div> */}
  </div>)
}
    
    
  
  
  
