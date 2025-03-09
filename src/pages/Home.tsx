import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"


import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChatBox } from '@/components/chatbox';
import { useState } from 'react';


function Home() {
  const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger 
        onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}>
            </SidebarTrigger>
            {isOpen && (
        <div className="absolute top-0 left-full ml-2 bg-black text-white text-sm p-2 rounded">
          {isOpen ? "Close Sidebar" : "Open Sidebar"}
        </div>
      )}
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min"><ChatBox/></div>
      </SidebarInset>
    </SidebarProvider>

            <div className='absolute top-0 right-0 p-4 flex gap-1'>
                <Button><Link to="/log-in">Log in</Link></Button> 
                <Button className='bg-white text-black border-2 hover:bg-gray-100' ><Link to="/sign-up">Sign up</Link></Button>
            </div>
        </div>

    );
}

export default Home;
