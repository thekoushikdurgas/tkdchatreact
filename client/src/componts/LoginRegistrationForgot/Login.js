import React,{useState,useEffect} from 'react';
import "./LoginRegistrationForgot.css";
import Alert from "../Alert/Alert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const host = "https://tkdchatserver.herokuapp.com";
    const navigate = useNavigate();
    const [alertactive, setalertactive] = useState([false, '', '']);
    const [render, setrender] = useState(true);
    const [logintogglePassword, setlogintogglePassword] = useState(true);
    const [email, setemail] = useState('SaiketMota@gmail.com');
    const [emailclass, setemailclass] = useState(false);
    const [emailerror, setemailerror] = useState('');
    const [password, setpassword] = useState('SaiketMota123');
    const [passworderror, setpassworderror] = useState('');
    const [passwordclass, setpasswordclass] = useState(false);
    const chatlogin = async (email,password) => {  
      const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({email,password})
      });
      const json = await response.json();
      if(json['success']){
        localStorage.setItem('auth-token', json['authtoken']);
        localStorage.setItem('user-img',json['picimg']);
        localStorage.setItem('user-name', json['name']);
        localStorage.setItem('user-username', json['username']);
      }
      return json['success'];
    } 
    const validateEmail = (email) => { return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); };
    const valemail = (e) => { setemail(e); if (validateEmail(e)) { setemailclass(true); setemailerror(''); } else if (e === '') { setemailerror('Email is mandatory'); setemailclass(false); } else { setemailerror('Invalid Email'); setemailclass(false); } }
    const valpassword = (e) => { setpassword(e); if (e === '') { setpassworderror('Password is mandatory'); setpasswordclass(false); } else { setpassworderror(''); setpasswordclass(true); } }
    const submitbutton = async (e) => {
        e.preventDefault(); valemail(email); valpassword(password);
        if (!emailclass) { setalertactive([true, 'Warning', emailerror]); }
        else if (!passwordclass) { setalertactive([true, 'Warning', passworderror]); }
        else {
            const chatloginauth = await chatlogin(email,password);
            if(chatloginauth){  
                navigate("/", { replace: true });
                setalertactive([true, 'Success', 'Successfully login in']);
            }else{
                setalertactive([true, 'Warning', 'Pl write correct deatails']);
            }
        }
    }
    useEffect(() => {
        if(localStorage.getItem('auth-token') !== ''){  
            navigate("/", { replace: true });
        }
        if (render) {
            valemail(email);
            valpassword(password);
            setrender(false);
        }
    }, [email, password,render,navigate])
    return (
        <>
            <Alert alertactive={alertactive} />
            <div className="lurcard login">
                <h2>Welcome Back!</h2>
                <form className="logincl" id="loginid">
                    <div className="field">
                        <input type="text" name="loginemail" value={email} placeholder="eg. example@gmail.com" autoComplete="off" required className={`inputlo ${emailclass ? 'c2' : 'c1'}`} onChange={(event) => { valemail(event.target.value) }} />
                        <label className="labello">Email Address</label>
                    </div>
                    <div className="field">
                        <input type={logintogglePassword ? 'password' : 'text'} name="loginpassword" value={password} placeholder="eg. Abc@1234" autoComplete="off" required className={`inputlo ${passwordclass ? 'c2' : 'c1'}`} onChange={(event) => { valpassword(event.target.value) }} />
                        <label className="labello">Password</label>
                        <i className={logintogglePassword ? 'fad fa-eye' : 'fad fa-low-vision'} id="logintogglePassword" onClick={() => { setlogintogglePassword(!logintogglePassword) }}></i>
                    </div>
                    <div className="content1">
                        <div className="remember">
                            <label className="checkbox1 path">
                                <input type="checkbox" name="rememberlo" id="rememberlo" />
                                <svg viewBox="0 0 21 21"><path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg><span>Remember me</span>
                            </label>
                        </div>
                        <div className="signup-link"><Link to="/forgot">Forgot password?</Link></div>
                    </div>
                    <div className="seperator">
                        <div className="shadow1"></div>
                        <div className="text"><span>or</span></div>
                    </div>
                    <div className="social-icon">
                        <p>Sign in with your social media account</p>
                        <div className="socialiconbutton">
                            <button type="button"><i className="fab fa-google"></i></button>
                            <button type="button"><i className="fab fa-facebook"></i></button>
                            <button type="button"><i className="fab fa-github"></i></button>
                        </div>
                    </div>
                    <div className="field btnbtn">
                        <input type="submit" value="Login" id="submit" onClick={(event) => { submitbutton(event); }} />
                    </div>
                    <div className="signup-link">Not a member? <Link to="/registration">Create an Account now!</Link></div>
                </form>
            </div>
        </>
    )
}