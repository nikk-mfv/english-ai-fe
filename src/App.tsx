import { Toaster } from '@/components/ui/sonner';
import './App.css';
import { Header } from './components/header';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <div className='App h-screen'>
        <Header />
        <div className='mt-26'>
          <AppRoutes />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
