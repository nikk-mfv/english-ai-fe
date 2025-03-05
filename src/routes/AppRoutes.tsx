import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import MyWords from '../pages/MyWords';
import History from '../pages/History';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';

const AppRoutes = ()=> {
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/my-words" element={<MyWords/>}/>
            <Route path="/history" element={<History/>}/>
            <Route path="/log-in" element={<LogIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
        </Routes>
    )
}

export default AppRoutes