import React, { useState, useEffect } from 'react';
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import './main.css';

export default function Main() {
  const host = "https://tkdchatserver.herokuapp.com";
  const navigate = useNavigate();
  const [render, setrender] = useState(true);
  const [statusoptions, setstatusoptions] = useState(false);
  const [status, setstatus] = useState('online');
  const [userchat, setuserchat] = useState([]);
  const [userchats, setuserchats] = useState([]);
  const [message, setmessage] = useState('');
  const [contactid, setcontactid] = useState('');
  const [menu, setmenu] = useState(false);
  const [leftside, setleftside] = useState(0);
  const [rightside, setrightside] = useState(-1);
  const [contacts, setcontact] = useState([]);
  const [contactactive, setcontactactive] = useState(0);
  const [contactactiveimg, setcontactactiveimg] = useState('');
  const [contactactivename, setcontactactivename] = useState('');
  const [contactactiveusername, setcontactactiveusername] = useState('');
  const [contactactivefacebook, setcontactactivefacebook] = useState('');
  const [contactactivetwitter, setcontactactivetwitter] = useState('');
  const [contactactiveinstagram, setcontactactiveinstagram] = useState('');
  const [users, setusers] = useState([]);
  const [user, setuser] = useState([]);
  const getusers = async () => {
    if (localStorage.getItem('auth-token') !== '') {
      const response = await fetch(`${host}/api/auth/getusers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('auth-token')
        }
      });
      const json = await response.json();
      setusers(json);
    }
  }
  const addcontacts = async (id) => {
    if (localStorage.getItem('auth-token') !== '') {
      const response = await fetch(`${host}/api/addcontact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('auth-token'),
          "contactid": id
        }
      });
      const json = await response.json();
      if (json['success']) {
        getcontactlist(); 
        setleftside(0);
        sendMessage(id,'hi');
      }
    }
  }
  const createapidefault = () => {
    if (localStorage.getItem('auth-token') === null) {
      localStorage.setItem('auth-token', '');
      localStorage.setItem('user-img', '');
      localStorage.setItem('user-name', '');
      localStorage.setItem('user-username', '');
    }
  }
  const deleteapidefault = () => {
    localStorage.setItem('auth-token', '');
    localStorage.setItem('user-img', '');
    localStorage.setItem('user-name', '');
    localStorage.setItem('user-username', '');
    setcontact([]);
    setusers([]);
    setcontactactiveimg('');
    setcontactactivename('');
    setcontactactivefacebook('');
    setcontactactivetwitter('');
    setcontactactiveinstagram('');
    setcontactactiveusername('');
  }
  const getcontactlist = async () => {
    if (localStorage.getItem('auth-token') !== '') {
      const response = await fetch(`${host}/api/contact/`, {
        method: 'GET', headers: { 'Content-Type': 'application/json', "auth-token": localStorage.getItem('auth-token') }
      });
      const json = await response.json();
      setcontact(json);
    }
  }
  const getmessage = async () => {
    if (localStorage.getItem('auth-token') !== '') {
      const response = await fetch(`${host}/api/chat`, {
        method: 'GET', headers: { 'Content-Type': 'application/json', "auth-token": localStorage.getItem('auth-token') }
      });
      const json = await response.json();
      setuserchat(json);
    }
  }
  const newMessage = async () => {
    console.log(userchats);
    if (message.trim() === '') {
      return false;
    }
    sendMessage(contactid,message);
    setmessage('');
  }
  const sendMessage = async (contactid,message) => {
    console.log(userchats);
    if (message.trim() === '') {
      return false;
    }
    if (localStorage.getItem('auth-token') !== '') {
      const response = await fetch(`${host}/api/tkdchat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('auth-token'),
          "contactid": contactid,
          "message": message
        }
      });
      const json = await response.json();
      if (json['success']) {
        getmessage();
        setuserchats(userchat.filter(element => element.contactid === contacts[contactactive]['id']));
      }
    }
    setmessage('');
  }
  window.onkeydown = (e) => {
    if (e.which === 13) {
      newMessage();
      return false;
    }
  }
  window.onclick = (e) => {
    if (e.target !== document.getElementsByClassName('mainmenu')[0]) { setstatusoptions(false) }
    if (e.target !== document.getElementsByClassName('mainmenu')[1]) { setmenu(false) }
  }
  const showmess = (n) => {
    getcontactlist();
    setcontactactive(n);
    setcontactactiveimg(contacts[n]['picimg']);
    setcontactid(contacts[n]['id']);
    setcontactactivename(contacts[n]['name']);
    setcontactactivefacebook(contacts[n]['facebook']);
    setcontactactivetwitter(contacts[n]['twitter']);
    setcontactactiveinstagram(contacts[n]['instagram']);
    setcontactactiveusername(contacts[n]['username']);
    setrightside(0);
    console.log(userchat);
    setuserchats(userchat.filter(element => element.contactid === contacts[n]['id']));
  }
  const searchjson = (b) => {
    if (b === "") {
      return [];
    } else {
      return users.filter(function (x) { if (x['name'].toLowerCase().indexOf(b.toLowerCase()) > -1) { return x; } })
    }
  }
  // setTimeout(() => {
  //   if(contactactive && !render){
  //     getmessage();
  //     setuserchats(userchat.filter(element => element.contactid === contacts[contactactive]['id']));
  //   }
  // }, 10000);
  useEffect(() => {
    if (render) {
      async function fetchData() {
        if (localStorage.getItem('auth-token') === '') {
          navigate("/login", { replace: true });
        }
        if (users.length === 0) {
          createapidefault();
          getcontactlist();
          getusers();
        }
        if (localStorage.getItem('auth-token') !== '') {
          getmessage();
          setrender(false);
        }
      }
      fetchData();
    }
  }, [render, navigate, users]);
  return (
    <>
      {localStorage.getItem('auth-token') !== '' ? (
        <div className="frame">
          <div className="sidepanel">
            <div className="profile">
              <div className="wrap d-flex align-items-center justify-content-between">
                <div className='d-flex align-items-center'>
                  <div className={`Profile_detail_icon_img ${status}`}><div><img src={localStorage.getItem('user-img')} className={`profile-img mainmenu`} alt={localStorage.getItem('user-name')} onClick={() => { setstatusoptions(!statusoptions) }} /></div></div>
                  <div className='twops'>
                    <p>{localStorage.getItem('user-name')}</p>
                    <p>{localStorage.getItem('user-username')}</p>
                  </div>
                </div>
                <div className='d-flex align-items-center'>
                  <i className="cil-reload"></i>
                  <i className="tkd2-messages"></i>
                  <i className="tkd2-menu mainmenu" onClick={() => { setmenu(!menu) }} ></i>
                </div>
                <div className={`status-options ${statusoptions ? 'active' : ''}`}>
                  <ul>
                    <li className={`${status === 'online' ? 'active' : ''} status-online`} onClick={() => { setstatus('online'); setstatusoptions(!statusoptions); }}><span className="status-circle"></span><p>Online</p></li>
                    <li className={`${status === 'away' ? 'active' : ''} status-away`} onClick={() => { setstatus('away'); setstatusoptions(!statusoptions); }}><span className="status-circle"></span><p>Away</p></li>
                    <li className={`${status === 'busy' ? 'active' : ''} status-busy`} onClick={() => { setstatus('busy'); setstatusoptions(!statusoptions); }}><span className="status-circle"></span><p>Busy</p></li>
                    <li className={`${status === 'offline' ? 'active' : ''} status-offline`} onClick={() => { setstatus('offline'); setstatusoptions(!statusoptions); }}><span className="status-circle"></span><p>Offline</p></li>
                  </ul>
                </div>
                <div className={`status-options status-options-menu ${menu ? 'active' : ''}`}>
                  <ul>
                    <li onClick={() => { setmenu(false); setleftside(1) }}><i className='ri-shield-star-line'></i><p>Starred messages</p></li>
                    <li onClick={() => { setmenu(false); setleftside(2) }}><i className='flaticon-381-settings-1'></i><p>Settings</p></li>
                    <li onClick={() => { deleteapidefault(); navigate("/login", { replace: true }); }}><i className='tkd4-iconmonstr-log-out-9'></i><p>Log out</p></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`search ${leftside === 0 ? '' : 'd-none'}`}>
              <label htmlFor="search"><i className="tkd2-search2"></i></label>
              <input type="text" placeholder="Search contacts..." name='search' />
            </div>
            <div className={`contacts ${leftside === 0 ? '' : 'd-none'}`}>
              <ul>
                {contacts.map((t, i) => {
                  return (
                    <li className={`contact ${contactactive === i ? 'active' : ''}`} key={i} onClick={() => { showmess(i) }}>
                      <div className="wrap">
                        <span className={`contact-status ${t.status}`} />
                        <div className="Profile_detail_icon_img"><div><img src={t.picimg} alt={t.name} /></div></div>
                        <div className='twops'>
                          <p>{t.name}</p>
                          <p>{t.last}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={`starmess ${leftside === 1 ? '' : 'd-none'}`}>
              <div className='starmesshead'><i className="ti ti-arrow-left" onClick={() => { setleftside(0) }}></i><i className='ri-shield-star-line'></i><span>Starred messages</span></div>
              <div className='starmessbody'>
                <ul>
                  <li className="msg sent">
                    <div className="bubble">
                      <div className="txt"><span className="name">Mike</span><span className="timestamp">10:20 pm</span><i className="ri-shield-star-line"></i><span className="message">Can you believe this amazing chat bubbles? It's all CSS. </span></div>
                      <div className="bubble-arrow"></div>
                    </div>
                  </li>
                  <li className="msg replies">
                    <div className="bubble">
                      <div className="txt"><span className="name">Mike</span><span className="timestamp">10:20 pm</span><i className="ri-shield-star-line"></i><span className="message">Can you believe this amazing chat bubbles? It's all CSS. </span></div>
                      <div className="bubble-arrow"></div>
                    </div>
                  </li>
                  <li className="msg replies">
                    <div className="bubble">
                      <div className="txt"><span className="name">Mike</span><span className="timestamp">10:20 pm</span><i className="ri-shield-star-line"></i><span className="message">Can you believe this amazing chat bubbles? It's all CSS. </span></div>
                      <div className="bubble-arrow"></div>
                    </div>
                  </li>
                  <li className="msg sent">
                    <div className="bubble">
                      <div className="txt"><span className="name">Mike</span><span className="timestamp">10:20 pm</span><i className="ri-shield-star-line"></i><span className="message">Can you believe this amazing chat bubbles? It's all CSS. </span></div>
                      <div className="bubble-arrow"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`settings ${leftside === 2 ? '' : 'd-none'}`}>
              <div className='settingshead'><i className="ti ti-arrow-left" onClick={() => { setleftside(0) }}></i><i className='flaticon-381-settings-1'></i><span>Setting</span></div>
              <div className='settingsbody'>
                <div>

                </div>
              </div>
            </div>
            <div className={`settings addcontacts ${leftside === 3 ? '' : 'd-none'}`}>
              <div className='settingshead'><i className="ti ti-arrow-left" onClick={() => { setleftside(0); getcontactlist(); }}></i><i className='tkd4-iconmonstr-user-10'></i><span>Add contact</span></div>
              <div className={`search`}>
                <label htmlFor="search"><i className="tkd2-search2"></i></label>
                <input type="text" placeholder="Search contacts..." name='search' onChange={(event) => { setuser(searchjson(event.target.value)) }} />
              </div>
              <div className='settingsbody contacts'>
                <ul>
                  {user.map((t, i) => {
                    return (
                      <li className={`contact`} key={i}>
                        <div className="wrap">
                          <span className={`contact-status`} />
                          <div className="Profile_detail_icon_img"><div><img src={t.picimg} alt={t.name} /></div></div>
                          <div className='twops'>
                            <p>{t.name}</p>
                            <p>{t.username}</p>
                          </div>
                          <div className="addcontacticon"><i className={`tkd7-add-${t.gender}-user`} onClick={() => { addcontacts(t.id) }}></i></div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={`settings ${leftside === 4 ? '' : 'd-none'}`}>
              <div className='settingshead'><i className="ti ti-arrow-left" onClick={() => { setleftside(0) }}></i><i className='tkd4-iconmonstr-user-24'></i><span>Add group</span></div>
              <div className='settingsbody'>
                <ul>
                  {user.map((t, i) => {
                    return (
                      <li className={`contact`} key={i} onClick={() => { console.log(t.id) }}>
                        <div className="wrap">
                          <span className={`contact-status`} />
                          <div className="Profile_detail_icon_img"><div><img src={t.picimg} alt={t.name} /></div></div>
                          <div className="meta">
                            <p className="name">{t.name}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={`bottom-bar ${leftside === 3 || leftside === 4 ? 'd-none' : ''}`}>
              <button className="addcontact" onClick={() => { setleftside(3) }}><i className="tkd4-iconmonstr-user-10"></i> <span>Add contact</span></button>
              <button className="addcontact" onClick={() => { setleftside(4) }}><i className="tkd4-iconmonstr-user-25"></i> <span>Add group</span></button>
            </div>
          </div>
          <div className={`content ${rightside === -1 ? 'd-none' : ''}`}>
            <div className={`contact-profile ${rightside === 0 ? '' : 'd-none'}`}>
              <div className="d-flex align-items-center">
                <div className={`Profile_detail_icon_img`}><div><img src={contactactiveimg} alt={contactactivename} /></div></div>
                <div className='twops'>
                  <p>{contactactivename}</p>
                  <p>{contactactiveusername}</p>
                </div>
              </div>
              <div className="social-media d-flex align-items-center">
                <a href={contactactivefacebook}><i className="fab fa-facebook"></i></a>
                <a href={contactactivetwitter}><i className="fab fa-twitter"></i></a>
                <a href={contactactiveinstagram}><i className="icon-social-instagram"></i></a>
              </div>
              <div className="social-media d-flex align-items-center">
                <span><i className="fal fa-star"></i></span>
                <span><i className="cil-reload"></i></span>
                <span><i className="tkd2-search2"></i></span>
                <span><i className="tkd2-menu"></i></span>
              </div>
            </div>
            <div className={`messages ${rightside === 0 ? '' : 'd-none'}`}>
              <ul>
                {userchats.map((t, i) => {
                  return (
                    <li className={`msg ${t.type}`} key={i}>
                      <div className="bubble">
                        <div className="txt">
                          {/* <span className="name">Mike</span> */}
                          <span className="timestamp">{t.time}</span>
                          <i className={t.star ? "ri-shield-star-line msgstar" : "d-none"}></i>
                          <i className="fi fi-br-caret-down msgdown"></i>
                        </div>
                        <span className="message">{t.message}</span>
                        <div className="bubble-arrow"></div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={`message-input ${rightside === 0 ? '' : 'd-none'}`}>
              <div className="wrap">
                <div className='attachmentr d-flex align-items-center'>
                  <i className="bi bi-emoji-smile-fill"></i>
                  <i className="brsicon-paperclip2"></i>
                </div>
                <div className='attachmenti'>
                  <input type="text" placeholder="Write your message..." value={message} onChange={(event) => { setmessage(event.target.value) }} />
                </div>
                <div className='attachmentl d-flex align-items-center'>
                  <i className="tkd3-nc-sample-glyph_media-mic"></i>
                  <i className="fi fi-direction-arrow-right" onClick={newMessage}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (<Loading />)}
    </>
  )
}
