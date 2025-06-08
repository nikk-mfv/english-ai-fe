import { Toaster } from '@/components/ui/sonner';
import './App.css';
import { Header } from './components/header';
import AppRoutes from './routes/app-routes';
import { Translation } from './components/translation';

function App() {
  return (
    <>
      <Translation />
      <div className='App h-screen'>
        <Header />
        <div className='pt-26'>
          <AppRoutes />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
