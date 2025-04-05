import {createTopic} from '@/services/topic'
import {useState } from "react"
import { toast } from "sonner"


 export  const useCreateTopic = () => {
        const [name,setName] = useState('')

        const handleCreateTopic = async() =>{
            try{
                await createTopic({name: name, userId: 1})
                setName("")
    
                //show topics with new one
                // await useGetTopics()
            } catch(error) {
                toast.error(`Failed create new topic: ${error}`, {
                position: 'bottom-left',
                });
            }
        }
    return{name, handleCreateTopic}
    
 }
 
//  export function useGetTopics() {
//     const [topics, setTopics] = useState<ITopic[]>([])
//     const handleGetTopics = async() =>{
//       try{
//         const response = await getTopics();
//         setTopics(response)
//       } catch(error) {
//         toast.error(`Failed to get topics: ${error}`, {
//           position: 'bottom-left',
//         });
//       }
//     }
   
//     useEffect(() => {
//       handleGetTopics();
//     },[])

// return(useGetTopics())
// }
