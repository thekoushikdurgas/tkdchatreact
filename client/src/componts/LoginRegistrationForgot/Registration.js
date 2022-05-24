import React,{useState,useEffect,useContext} from 'react';
import { Link } from "react-router-dom";
import ChatContext from "../context/ChatContext";
import Alert from "../Alert/Alert";

export default function Register() {
  const context = useContext(ChatContext);
  const { country, getcountry } = context;
  const [alertactive, setalertactive] = useState([false,'','']);
  const [render,setrender] = useState(true);
  const [messageactive,setmessageactive] = useState(false);
  const [slidePage,setslidePage]=useState(0);
  const [fname,setfname]=useState('ABC');
  const [lname,setlname]=useState('DEF');
  const [gender,setgender]=useState('Male');
  const [email,setemail]=useState('ABC@gmail.com');
  const [countryname,setcountryname]=useState('India');
  const [phoneex,setphoneex]=useState('');
  const [phoneno,setphoneno]=useState(9933454265);
  const [year,setyear]=useState(2000);
  const [month,setmonth]=useState('Jan');
  const [day,setday]=useState(1);
  const [dayno,setdayno]=useState(1);
  const [username,setusername]=useState('thekoushikdurgas');
  const [termscondition,settermscondition]=useState(false);
  const validateEmail = (email) => {return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);};  
  const submitbutton = (e,a)=>{
    e.preventDefault();
    var slide = false;
    if(a===1){
      if(fname === ""){setalertactive([true,'Warning','First name is mandatory']);}
      else if(lname === ""){setalertactive([true,'Warning','Last name is mandatory']);}
      else if(gender === ""){setalertactive([true,'Warning','Gender is mandatory']);}
      else if(email === ""){setalertactive([true,'Warning','Email is mandatory']);}
      else if(!validateEmail(email)){setalertactive([true,'Warning','Invalid Email']);}
      else{slide =true;}
    }else if(a===2){
      if(countryname === ""){setalertactive([true,'Warning','Country is mandatory']);}
      else if(phoneno === ""){setalertactive([true,'Warning','Phone no. is mandatory']);}
      else{slide =true;}
    }else if(a===3){
      if(username === ""){setalertactive([true,'Warning','Username is mandatory']);}
      else if(password === ""){setalertactive([true,'Warning','Password is mandatory']);}
      else if(password !== password1){setalertactive([true,'Warning','Password and Confirm Password not same']);}
      else if(!termscondition){setalertactive([true,'Warning','Check Terms and Condition']);}
      else{slide =true;}
    }else if(a===4){slide =true;setalertactive([true,'Success','Successfully Resgister in'])}
    if(slide){setslidePage(a)}
  }
  const changephone = (a)=>{country.forEach(function (x) {if(x['name'] === a){setphoneex(x['mcode']);}})}
  const passwordindicator = [{'strength': 'Way too Weak ☹', 'inputcolor': '#f42323'}, {'strength': 'Very Weak ☹', 'inputcolor': 'yellow'}, {'strength': 'Weak ☹', 'inputcolor': '#f36d0a'}, {'strength': 'Good ☺', 'inputcolor': '#85c2e0'}, {'strength': 'Strong ☻', 'inputcolor': '#2bc253'}];
  const [password,setpassword]=useState('thekoushikdurgas');
  const [passwordstrength,setpasswordstrength]=useState(0);
  const [letterpa,setletterpa] = useState(false);
  const [capitalpa,setcapitalpa] = useState(false);
  const [numberpa,setnumberpa] = useState(false);
  const [lengthpa,setlengthpa] = useState(false);
  const [characterpa,setcharacterpa] = useState(false);
  const [password1,setpassword1]=useState('thekoushikdurgas');
  const [logintogglePassword,setlogintogglePassword] = useState(true);
  var validpass = 0;
  const checkpassword = (val)=>{
    validpass = -1;
    if (val.match(/[a-z]/g)) {setletterpa(true);validpass+=1;} else {setletterpa(false);}
    if (val.match(/[$@$$!%*#?&]/g)) {setcharacterpa(true);validpass+=1;} else {setcharacterpa(false);}
    if (val.match(/[A-Z]/g)) {setcapitalpa(true);validpass+=1;} else {setcapitalpa(false);}
    if (val.match(/[0-9]/g)) {setnumberpa(true);validpass+=1;} else {setnumberpa(false);}
    if (val.length >= 8) {setlengthpa(true);validpass+=1;} else {setlengthpa(false);}
    setpasswordstrength(validpass <= 0? 0:validpass);
  }
  const changedayno = (a,b)=>{
    if(b === 'Jan' || b === 'Mar' || b === 'May' || b === 'Jul' || b === 'Aug' ||b === 'Oct' ||b === 'Dec'){setdayno(31);}
    else if(b === 'Apr' || b === 'Jun' || b === 'Sep' || b === 'Nov'){setdayno(30);}
    else if(b === 'Feb'){
      if(a<= 1917){if(a % 4 === 0){setdayno(28);}else{setdayno(29);}}
      else if(a >= 1919){if((a % 400 === 0) || (a % 4 === 0 && a % 100 !== 0)){setdayno(28);}else{setdayno(29);}}
      else{setdayno(14);}
    }
  }
  useEffect(() => {
    if(render){
      if(country.length === 0){getcountry();}
      else{
        changephone(countryname);   
        changedayno(year,month);
        checkpassword(password);
        setrender(false);
      }
    }
  }, [country,render,countryname,year,month,password])
  
  return (
    <>
      <Alert alertactive={alertactive} />
      <div className="lurcard register">
        <h2>Create an Account!</h2>
        <div className="register1">
          <div className="progressbar">
            {['Name','Contact','Birth','Submit'].map((object, i) =>
              <div className={`step ${slidePage > i ?'active':''}`} key={i}>
                <div className="bullet"><span>{i+1}</span></div>
                <div className="check1 tkd10-red-check-mark"></div>
                <p>{object}</p>
              </div>
            )}
          </div>
          <div className="form-outer">
            <div className="silder-form" id="registerid">
              <div className="page slide-page" style={{marginLeft : `-${slidePage*25 >= 75? 75:slidePage*25}%`}}>
                <div className="title1">Basic Info:</div>
                <form id="friststepre">
                  <div className="field">
                    <input type="text" id="fname" name="fname" value={fname} placeholder="eg. Ritam" autoComplete="off" required className="inputlo" onChange={(event)=>{setfname(event.target.value)}} />
                    <label className="labello">Frist Name</label>
                  </div>
                  <div className="field" style={{marginBottom: '8px'}}>
                    <input type="text" id="lname" name="lname" value={lname} placeholder="eg. Ghosh" autoComplete="off" required className="inputlo" onChange={(event)=>{setlname(event.target.value)}} />
                    <label className="labello">Last Name</label>
                  </div>
                  <fieldset>
                    <legend>Gender</legend>
                    <div className="genderradio errorcontainer">
                      <input type="radio" name="genderre" id="male" value="Male"  onChange={()=>{setgender('Male')}} checked={gender==='Male'?true:false}/>
                      <label htmlFor="male" className="fristgenderradio"><i className="fad fa-male" /><span>Male</span></label>
                      <input type="radio" name="genderre" id="female" value="Female"  onChange={()=>{setgender('Female')}} checked={gender==='Female'?true:false}/>
                      <label htmlFor="female"><i className="fad fa-female" /><span>Female</span></label>
                      <input type="radio" name="genderre" id="others" value="Others"  onChange={()=>{setgender('Others')}} checked={gender==='Others'?true:false}/>
                      <label htmlFor="others"><i className="fad fa-transgender" /><span>Others</span></label>
                    </div>
                  </fieldset>
                  <div className="field">
                    <input type="text" id="reemail" name="reemail" value={email} placeholder="eg. example@gmail.com" autoComplete="off" required className="inputlo" onChange={(event)=>{setemail(event.target.value)}} />
                    <label className="labello">Email Address</label>
                  </div>
                  <div className="field btnbtn">
                    <button className="firstNext next" onClick={(event)=>{submitbutton(event,1)}}>Next</button>
                  </div>
                </form>
                <div className="signup-link"><Link to="/forgot">Forgot password?</Link></div>
                <div className="signup-link">Already have an account? <Link to="/login">Signin now</Link>or<p>Please fill in this form to create an account.</p></div>
              </div>
              <div className="page">
                <div className="title1">Address:</div>
                <form id="Secstepre">
                  <div className="field fieldselect">
                    <select name="myCountry" id="myCountry" value={countryname} onChange={(event)=>{setcountryname(event.target.value);changephone(event.target.value);}}>
                      <option value={``}>Select Country</option>
                      {country.map((object, i) =>
                        <option value={object.name} key={i}>{object.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="ingro">
                    <div className="ingroic"><span className="ingrotext" id="ingrotext">{phoneex}</span></div>
                    <div className="field1">
                      <input type="tel" name="rephone" className="ingroin" id="rephone" autoComplete="off" placeholder="Phone" required value={phoneno} onChange={(event)=>{setphoneno(parseInt(event.target.value))}} />
                      <label htmlFor="phone" className="labello1">Phone</label>
                    </div>
                  </div>
                  <div className="field btnbtns">
                    <div className="field btnbtn pre">
                      <button className="prev-1 prev" onClick={(event)=>{event.preventDefault();setslidePage(0)}}>Previous</button>
                    </div>
                    <div className="field btnbtn nex">
                      <button className="next-1 next" onClick={(event)=>{submitbutton(event,2)}}>Next</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="page">
                <div className="title1">Date of Birth:</div>
                <form id="Thirdstepre">
                  <div className="field fieldselect">
                    <select name="myYear" id="myYear" style={{borderRadius: '10px 0 0 10px'}}  value={year} onChange={(event)=>{setyear(event.target.value);changedayno(event.target.value,month);}}>
                      {(() => {
                        const rows = [];
                        for (let i = 1980; i < (new Date()).getFullYear() +1; i++) {
                          rows.push(<option value={i} key={i}>{i}</option>);
                        }
                        return rows;
                      })()}
                    </select>
                    <select name="myMonth" id="myMonth" style={{borderRadius: '0'}} value={month} onChange={(event)=>{setmonth(event.target.value);changedayno(year,event.target.value);}}>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((object, i) =>
                        <option value={object} key={i}>{object}</option>
                      )}
                    </select>
                    <select name="myDay" id="myDay" style={{borderRadius: '0 10px 10px 0'}} value={day} onChange={(event)=>{setday(event.target.value)}}>
                      <option value>Day</option>
                      {(() => {
                        const rows = [];
                        for (let i = 1; i < dayno +1; i++) {
                          rows.push(<option value={i} key={i}>{i}</option>);
                        }
                        return rows;
                      })()}
                    </select>
                  </div>
                  <div className="field">
                    <input type="text" name="userna" id="userna" autoComplete="off" placeholder="eg. ZackGilkes" required className="inputlo" value={username} onChange={(event)=>{setusername(event.target.value)}}/>
                    <label htmlFor="userna" className="labello">Username</label>
                  </div>
                  <div className="field">
                    <input type={logintogglePassword?'password':'text'} name="password" id="password" autoComplete="off" placeholder="eg. Abc@1234" required className="inputlo" onFocus={()=>{setmessageactive(true)}}  onBlur={()=>{setmessageactive(false)}} value={password} onChange={(event)=>{setpassword(event.target.value);checkpassword(event.target.value);}}/>
                    <label htmlFor="password" className="labello">Password</label>
                    <i className={logintogglePassword?'fad fa-eye':'fad fa-low-vision'} id="togglePassword"  onClick={()=>{setlogintogglePassword(!logintogglePassword)}}/>
                  </div>
                  <div id="message" className={messageactive?'active':''}>
                    <div className="messagerow">
                      <p><span style={{color : passwordindicator[passwordstrength]['inputcolor']}}><b>{passwordindicator[passwordstrength]['strength']}</b></span></p>
                      <p><span className={letterpa?'val':'inval'}><b>lowercase</b></span></p>
                      <p><span className={capitalpa?'val':'inval'}><b>uppercase</b></span></p>
                      <p><span className={numberpa?'val':'inval'}><b>number</b></span></p>
                      <p><span className={lengthpa?'val':'inval'}><b>8 chars</b></span></p>
                      <p><span className={characterpa?'val':'inval'}><b>special char</b></span></p>
                    </div>
                  </div>
                  <div className="field">
                    <input type={logintogglePassword?'password':'text'} name="password1" id="password1" autoComplete="off" placeholder="eg. Abc@1234" required className="inputlo" value={password1} onChange={(event)=>{setpassword1(event.target.value)}}/>
                    <label htmlFor="password1" className="labello">Comfirm Password</label>
                    <i className={logintogglePassword?'fad fa-eye':'fad fa-low-vision'} id="togglePassword1"  onClick={()=>{setlogintogglePassword(!logintogglePassword)}}/>
                  </div>
                  <fieldset className="terms">
                    <legend>
                      <label className="checkbox1 path d-flex">
                        <input type="checkbox" name="termsre" id="termsre" checked={termscondition} onChange={()=>{settermscondition(!termscondition);}} />
                        <svg viewBox="0 0 21 21">
                          <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186">
                          </path>
                        </svg>
                      </label>
                    </legend>
                    <label htmlFor="termsre" className="error" style={{top: '-16%', display: 'none'}} />
                    <p>By clicking Sign Up, you agree to our <Link to='/' target="_blank">Terms</Link>, <Link to='/' target="_blank">Data Policy</Link>and <Link to='/' target="_blank">Cookie Policy</Link>. You may receive SMS notifications from us and can opt out at any time.</p>
                  </fieldset>
                </form>
                <div className="field btnbtns" style={{margin: '6px 0 0'}}>
                  <div className="field btnbtn pre">
                    <button className="prev-2 prev" onClick={(event)=>{event.preventDefault();setslidePage(1)}}>Previous</button>
                  </div>
                  <div className="field btnbtn nex">
                    <button className="next-2 next" onClick={(event)=>{submitbutton(event,3)}}>Next</button>
                  </div>
                </div>
              </div>
              <div className="page">
                <div className="title1">Login Details:</div>
                <form id="finalregistion" className="finalregistion">
                  <div className='registerdiv'>
                    <p><span>Name:</span><span>{`${fname} ${lname}`}</span></p>
                    <p><span>Gender:</span><span>{gender}</span></p>
                    <p><span>Email:</span><span>{email}</span></p>
                    <p><span>Address:</span><span>{`${countryname}`}</span></p>
                    <p><span>Phone:</span><span>{`${phoneex}-${phoneno}`}</span></p>
                    <p><span>Date of Birth:</span><span>{`${day}/${month}/${year}`}</span></p>
                    <p><span>Username:</span><span>{username}</span></p>
                    <p><span>Password:</span><span>{password}</span></p>     
                  </div>
                  <div className="field btnbtns">
                    <div className="field btnbtn pre">
                      <button className="prev-3 prev" onClick={(event)=>{event.preventDefault();setslidePage(2)}}>Previous</button>
                    </div>
                    <div className="field btnbtn nex">
                      <input type="submit" value="Login" className="submit" onClick={(event)=>{submitbutton(event,4)}}/>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
