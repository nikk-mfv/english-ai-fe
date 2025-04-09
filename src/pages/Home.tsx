import { CreateConversation } from '@/containers/home/create-conversation';

function Home() {
  return (
    <>
      <div>
        <div className='h-full flex items-center justify-center flex-col gap-4'>
          <h2 className='text-2xl font-bold'>Welcome to AI Chat</h2>
          <CreateConversation />
        </div>
      </div>
    </>
  );
}

export default Home;
