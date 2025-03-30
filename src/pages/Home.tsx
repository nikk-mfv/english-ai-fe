import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { CreateConversation } from '@/containers/home/create-conversation';
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
            onMouseLeave={() => setIsOpen(false)}
          ></SidebarTrigger>
          {isOpen && (
            <div className='absolute top-0 left-full ml-2 bg-black text-white text-sm p-2 rounded'>
              {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </div>
          )}
          <div className='h-full flex items-center justify-center flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Welcome to AI Chat</h2>
            <CreateConversation />
          </div>
        </SidebarInset>
      </SidebarProvider>

      <div className='absolute top-0 right-0 p-4 flex gap-1'>
        <Button>
          <Link to='/log-in'>Log in</Link>
        </Button>
        <Button className='bg-white text-black border-2 hover:bg-gray-100'>
          <Link to='/sign-up'>Sign up</Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
