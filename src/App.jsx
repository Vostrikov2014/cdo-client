import React, {useState, useEffect} from 'react';
import {BrowserRouter, Link, Route, Routes, useLocation} from 'react-router-dom';
import Logo from './components/Logo.jsx';
import Home from './components/Home';
import AuthCallback from './components/AuthCallback';
import ConferenceList from './components/videoconf/ConferenceList.jsx';
import IndexVideoConf from "./components/videoconf/IndexVideoConf.jsx";
import HomeVideoConf from "./components/videoconf/HomeVideoConf.jsx";
import ConfCreateUpdate from "./components/videoconf/ConfCreateUpdate.jsx";
import ConfDelete from "./components/videoconf/ConfDelete.jsx";
import Layout from './components/Layout.jsx';
import ConfList from "./components/videoconf/ConfList.jsx";
import ConfDetails from "./components/videoconf/ConfDetails.jsx";
import ConfActive from "./components/videoconf/ConfActive.jsx";
import RegisterApp from "./components/auth/RegisterApp.jsx";
import LoginApp from "./components/auth/LoginApp.jsx";
import ConfStart from "./components/videoconf/ConfStart.jsx";
import Schedule from "./components/schedule/Schedule.jsx";
import UnderConstruction from "./components/UnderConstruction.jsx";
import CreateLesson from "./components/schedule/CreateLesson.jsx";
import EditLesson from "./components/schedule/EditLesson.jsx";
import AddStudent from "./components/schedule/AddStudent.jsx";
import AddClassroom from "./components/schedule/AddClassroom.jsx";
import StudentList from "./components/schedule/StudentList.jsx";
import ClassroomList from "./components/schedule/ClassroomList.jsx";
//import {generatePKCECode} from './utils/pkce';
//import { authConfig } from './config';


const clientId = 'client';
const redirectUri = 'http://localhost:3000/callback';
const authServerUrl = 'http://localhost:9000/oauth2/authorize';

const App = () => {
    const location = useLocation();
    //const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {

        console.log('useEffect запущен');
        // Перенаправляем на страницу авторизации с PKCE
        //const codeChallenge = generatePKCECode();
        //window.location.href =
        // `${authServerUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid&code_challenge=${codeChallenge}&code_challenge_method=S256`;

        const token = localStorage.getItem('access_token');
        if (!token) {
            // Перенаправляем на страницу авторизации без PKCE
            // Тут попытка из конфига взять, но это не сработало (пока, надо посмотреть)
            /*window.location.href =
                `${authConfig.issuer}${authConfig.authorizationEndpoint}
                ?client_id=${authConfig.clientId}
                &redirect_uri=${authConfig.redirectUri}
                &response_type=${authConfig.responseType}
                &scope=openid profile`;*/

            window.location.href =
                `${authServerUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid profile`;
        } else {
            /*fetch('http://localhost:9000/oauth2/userinfo', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())*/

            //setAuthenticated(true);
            //console.log('Authenticated:', authenticated);

            // Получаем имя пользователя из токена
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userName = payload.preferred_username || payload.username || payload.sub;
            setUsername(userName);
            console.log('username:', username);
        }
    }, [username]);

    console.log('useEffect закончил работу');

    // Отображение логотипа, имени пользователя, фона и пр. в зависимости от текущего пути
    const disableLogoLink = location.pathname === '/';
    const showLogo = location.pathname !== '/register' && location.pathname !== '/login';
    const showLogIn = location.pathname !== '/' && location.pathname !== '/login';
    const applyBackground = location.pathname === '/'
        || location.pathname === '/index-video-conf'
        || location.pathname === '/register'
        || location.pathname === '/login-app'
        || location.pathname.startsWith('/conference');

    return (

        <div>
            <div className="App"/>
            {applyBackground ? (
                    <div
                        className={`d-flex justify-content-center align-items-center ${applyBackground ? '' : 'no-bg'}`}
                        style={{
                            height: '100vh',
                            width: '100vw',
                            backgroundImage: `url(/images/welcome-background.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}>
                        {showLogo && (
                            <div className="position-absolute" style={{top: '34px', left: '30px', padding: '5px'}}>
                                {/* <Logo disableLink={disableLogoLink}/> */} {/* Это коммент */}
                                <Logo disableLink={disableLogoLink}/>
                            </div>
                        )}
                        {showLogIn && username === null ? (
                            <div style={{position: 'absolute', top: '35px', right: '50px'}}> {/* Позиционируем ссылку */}
                                <Link to="/login"
                                      style={{
                                          color: 'white',
                                          textDecoration: 'none',
                                          fontSize: '1.5rem',
                                          fontWeight: 'bold'
                                      }}>LOGIN</Link>
                            </div>
                        ) : showLogIn && (
                            <div
                                style={{position: 'absolute', top: '35px', right: '50px'}}> {/* Позиционируем ссылку */}
                                <Link to="/home-video-conf"
                                      style={{
                                          color: 'white',
                                          textDecoration: 'none',
                                          fontSize: '1.5rem',
                                          fontWeight: 'bold'
                                      }}>{username}</Link>
                            </div>
                        )}
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/index-video-conf" element={<IndexVideoConf/>}/>
                            <Route path="/register-app" element={<RegisterApp/>}/>
                            <Route path="/login-app" element={<LoginApp/>}/>
                            <Route path="/home-video-conf" element={<HomeVideoConf/>}/>
                            <Route path="/conference/:roomName" element={<ConfStart/>}/>
                            <Route path="/schedule" element={<Schedule/>}/>
                            <Route path="/callback" element={<AuthCallback/>}/>
                        </Routes>
                    </div>
                ) : (
                    <Layout>
                        <div className="d-flex flex-grow-1">
                            {showLogo && (
                                <div className="position-absolute" style={{top: '34px', left: '30px', padding: '5px'}}>
                                    <Logo disableLink={disableLogoLink}/>
                                </div>
                            )}
                            <Routes>
                                <Route path="/under-construction" element={<UnderConstruction/>}/>
                                <Route path="/home-video-conf" element={<HomeVideoConf/>}/>
                                <Route path="/create-conference" element={<ConfCreateUpdate/>}/>
                                <Route path="/delete-conference" element={<ConfDelete/>}/>
                                <Route path="/list-conference" element={<ConfList/>}/>
                                <Route path="/conference-details/:id" element={<ConfDetails/>}/>
                                <Route path="/active-conf" element={<ConfActive/>}/>
                                <Route path="/create-lesson" element={<CreateLesson/>}/>
                                <Route path="/edit-lesson/:id" element={<EditLesson/>}/>
                                <Route path="/schedule" element={<Schedule/>}/>
                                <Route path="/add-student" element={<AddStudent/>}/>
                                <Route path="/add-classroom" element={<AddClassroom/>}/>
                                <Route path="/students" element={<StudentList/>}/>
                                <Route path="/classrooms" element={<ClassroomList/>}/>
                                <Route path="/callback" element={<AuthCallback/>}/>
                                {/*<Route path="/callback" element={<AuthCallback onSuccess={() => setAuthenticated(true)} />} />*/}
                            </Routes>
                        </div>
                    </Layout>
                )}
        </div>

    );
};

const AppWrapper = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

export default AppWrapper;