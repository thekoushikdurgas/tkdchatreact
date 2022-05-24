import React,{useState} from 'react';
import { Link } from "react-router-dom";
import Alert from "../Alert/Alert";

export default function ForgotPassword() {
  const [alertactive, setalertactive] = useState([false,'','']);
  const [email,setemail]=useState('ABC@gmail.com');
  return (
    <>
      <Alert alertactive={alertactive} />
      <div className="lurcard user">
        <h2>Forgot Your Password?</h2>
        <form className="usercl" action="#" id="usercl">
            <p>We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
            <div className="field">
                <input type="text" id="loginemail" name="loginemail" placeholder="eg. example@gmail.com" autoComplete="off" required className="inputlo" value={email}  onChange={(event)=>{setemail(event.target.value)}}/>
                <label className="labello">Email Address</label>
            </div>
            <div className="field btnbtn">
                <input type="submit" value="Reset" id="submit" onClick={(event)=>{event.preventDefault();email === ""? setalertactive([true,'Warning','Email is mandatory']):setalertactive([true,'Success','Email sent successfully'])}}/>
            </div>
            <div className="signup-link">Not a member? <Link to="/registration">Create an Account now!</Link></div>
            <div className="signup-link">Already have an account? <Link to="/login">Signin now</Link></div>
        </form>
      </div>
    </>
  )
}
