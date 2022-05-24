import React, { useState, useEffect, useContext } from 'react';
import ChatContext from "../context/ChatContext";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import './main.css';

export default function Main() {
  const host = "http://localhost:1000";
  const navigate = useNavigate();
  const context = useContext(ChatContext);
  const { deleteapidefault, getusers, users, apidefault, contacts, getcontactlist, createapidefault, contactactiveimg, getcontactactiveimg, contactactivename, getcontactactivename, contactactivefacebook, getcontactactivefacebook, contactactivetwitter, getcontactactivetwitter, contactactiveinstagram, getcontactactiveinstagram } = context;
  const [render, setrender] = useState(true);
  const [statusoptions, setstatusoptions] = useState(false);
  const [status, setstatus] = useState('online');
  const [user, setusers] = useState([]);
  const [userchat, setuserchat] = useState([]);
  const [message, setmessage] = useState('');
  const [userimg, setuserimg] = useState('');
  const [username, setusername] = useState('');
  const [usertitle, setusertitle] = useState('');
  const [menu, setmenu] = useState(false);
  const [leftside, setleftside] = useState(0);
  const [contactactive, setcontactactive] = useState(0);
  const newMessage = () => {
    if (message.trim() === '') {
      return false;
    }
    alert(message);
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
    getcontactactiveimg(contacts[n]['picimg']);
    getcontactactivename(contacts[n]['name']);
    getcontactactivefacebook(contacts[n]['facebook']);
    getcontactactivetwitter(contacts[n]['twitter']);
    getcontactactiveinstagram(contacts[n]['instagram']);
    navigate("/", { replace: true });
  }
  const searchjson = (b) => {
    if (b === "") {
      return [];
    } else {
      return users.filter(function (x) { if (x['name'].toLowerCase().indexOf(b.toLowerCase()) > -1) { return x; } })
    }
  }
  useEffect(() => {
    if (render) {
      async function fetchData() {
        if (localStorage.getItem('auth-token') === '') {
          navigate("/login", { replace: true });
        }
        if (apidefault !== '' && users.length !== 0) {
          setuserimg(localStorage.getItem('user-img'));
          setusername(localStorage.getItem('user-name'));
          setusertitle(localStorage.getItem('user-username'));
          showmess(contactactive);
          setrender(false);
          navigate("/", { replace: true });
        } else if (contacts.length === 0) {
          createapidefault();
          getcontactlist();
        } else if (users.length === 0) {
          getusers();
        } else if (userchat.length === 0) {
          const response = await fetch(`${host}/api/chat`, {
            method: 'GET', headers: { 'Content-Type': 'application/json', "auth-token": apidefault }
          });
          const json = await response.json();
          setuserchat(json);
        } else {
          setusers([]);
        }
      }
      console.log(render);
      fetchData();
    }
  }, [render, contactactive, contacts, apidefault, navigate, users, userchat]);
  return (
    <>
      {!render ? (
        <div className="frame">
          <div className="sidepanel">
            <div className="profile">
              <div className="wrap d-flex align-items-center justify-content-between">
                <div className='d-flex align-items-center'>
                  <div className={`Profile_detail_icon_img ${status}`}><div><img src={userimg} className={`profile-img mainmenu`} alt={username} onClick={() => { setstatusoptions(!statusoptions) }} /></div></div>
                  <div className='d-flex flex-column'>
                    <p>{username}</p>
                    <p>{usertitle}</p>
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
                        <div className="meta">
                          <p className="name">{t.name}</p>
                          <p className="preview">{t.last}</p>
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
              <div className='settingshead'><i className="ti ti-arrow-left" onClick={() => { setleftside(0) }}></i><i className='tkd4-iconmonstr-user-10'></i><span>Add contact</span></div>
              <div className={`search`}>
                <label htmlFor="search"><i className="tkd2-search2"></i></label>
                <input type="text" placeholder="Search contacts..." name='search' onChange={(event) => { setusers(searchjson(event.target.value)) }} />
              </div>
              <div className='settingsbody contacts'>
                <ul>
                  {user.map((t, i) => {
                    return (
                      <li className={`contact`} key={i} onClick={() => { console.log(t._id) }}>
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
          <div className="content">
            <div className="contact-profile">
              <div className="d-flex align-items-center">
                <div className={`Profile_detail_icon_img`}><div><img src={contactactiveimg} alt={contactactivename} /></div></div>
                <p>{contactactivename}</p>
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
            <div className="messages">
              <ul>
                {userchat.map((t, i) => {
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
            <div className="message-input">
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
