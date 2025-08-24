// aca vamos a mostrar que componentes le vamos a mostrar al usuario

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginView from './views/LoginView'
import MainView from './views/MainView';
import RegisterView from './views/RegisterView';
import AuthLayout from './layouts/AuthLayout';
import FormView from './views/FormView';
export default function Router(){

    return(
        <BrowserRouter>
            <Routes>

                <Route>
                    <Route path='/' element={<MainView/>} />
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginView/>} />
                    <Route path='/auth/register' element={<RegisterView/>} />                                        
                    <Route path='/users' element= {<FormView/>}>
                </Route>

                </Route>


            </Routes>
        </BrowserRouter>
    )
}