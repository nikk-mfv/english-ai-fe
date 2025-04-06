import { CreateConversation } from '@/containers/home/create-conversation';

import { NavBar } from '@/components/navbar';

function Home() {
    return (
      <>
              <div>
              <NavBar/>
              <div className='h-full flex items-center justify-center flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Welcome to AI Chat</h2>
            <CreateConversation />
          </div>
        </div>
      </>
  );
}

export default Home;
