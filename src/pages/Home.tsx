import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
function Home() {
    return (
        <div>
            <div>
                <Button><Link to="/log-in">Log in</Link></Button> 
                <Button><Link to="/sign-up">Sign up</Link></Button>
            </div>
            <h1>What can I help with?</h1>
            <div>
            <Input type="text" placeholder="Ask anything"/><Button>Send</Button>
            </div>

           
        </div>

    );
}

export default Home;