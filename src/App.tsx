import { Toaster } from '@/components/ui/sonner';
import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <div className='App h-screen'>
        <AppRoutes />
      </div>
      <Toaster />
    </>
  );
}

export default App;
