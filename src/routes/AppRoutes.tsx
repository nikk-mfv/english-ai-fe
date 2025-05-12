import { Route, Routes } from 'react-router-dom';

import History from '@/pages/History';
import Home from '@/pages/Home';
import LogIn from '@/pages/LogIn';
import SignUp from '@/pages/SignUp';
import Topic from '@/pages/Topic';
import Vocabulary from '@/pages/Vocabulary';
import Conversation from  '@/pages/conversation'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/vocabulary' element={<Vocabulary />} />
      <Route path='/history' element={<History />} />
      <Route path='/conversation/:id' element={<Conversation />} />
      <Route path='/topic' element={<Topic />} />
      <Route path='/log-in' element={<LogIn />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
