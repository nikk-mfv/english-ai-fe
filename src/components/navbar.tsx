import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Link, useNavigate } from 'react-router-dom';

export function NavBar() {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedin') === 'true';
    setIsLoggedin(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedin(false);
    navigate('/');
  };

  localStorage.setItem('username', 'Hoàng');
  const user = {
    name: localStorage.getItem('username') || 'Guest',
    email: 'm@example.com',
  };

  return (
    <div>
      {isLoggedin ? (
        <>
          <div className='absolute top-0 right-0 p-4 flex gap-1'>
            <Link to='/log-in'>
              <button className='btn'>Log in</button>
            </Link>
            <Link to='/sign-up'>
              <button className='btn'>Sign up</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className='flex gap-1'>
            <NavigationMenu className='flex gap-x-2'>
              <Link to='/history'>
                <button className='btn'>History</button>
              </Link>
              <Link to='/vocabulary'>
                <button className='btn'>My Words</button>
              </Link>
            </NavigationMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar
                  className='hover:cursor-pointer'
                  name={user.name}
                  size='40'
                  round={true}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded border-none'
                align='start'
                sideOffset={4}
              >
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
}
