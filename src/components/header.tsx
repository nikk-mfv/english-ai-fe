import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { NavBar } from './navbar';

export function Header() {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center border-b-2 border-gray-300 shadow-md px-2 mb-4'>
      <img
        onClick={() => navigate('/')}
        src={logo}
        alt='logo'
        className='w-20 h-20 hover:cursor-pointer'
      />
      <NavBar />
    </div>
  );
}
