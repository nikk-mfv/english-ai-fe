import { Route, Routes } from 'react-router-dom';

import Conversation from '@/pages/conversation';
import History from '@/pages/History';
import Home from '@/pages/Home';
import LogIn from '@/pages/LogIn';
import MyWords from '@/pages/MyWords';
import SignUp from '@/pages/SignUp';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/my-words' element={<MyWords />} />
      <Route path='/history' element={<History />} />
      <Route path='/conversation/:id' element={<Conversation />} />
      <Route path='/log-in' element={<LogIn />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
