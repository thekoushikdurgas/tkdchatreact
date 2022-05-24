import React from "react";
import ChatContext from "./ChatContext";

export default function DeatailState(props) {
  const sleep = (e) => { return new Promise((n => setTimeout(n, e))) }
  const getRndInteger = (a, o) => { return Math.floor(Math.random() * (o - a + 1)) + a; }
  const arrayRemove = (r, n) => { return r.filter(function (r) { return r !== n; }); };
  const playaudio = (src) => { const obj = document.createElement('audio'); obj.src = src; obj.play(); }
  const clipboardcode = (a) => { if (!a) { return; } const textarea = document.createElement("textarea"); textarea.value = a; document.body.appendChild(textarea); textarea.select(); document.execCommand("copy"); textarea.remove(); window.prompt('copied!', a); }
  const download = (e, t) => { var n = document.createElement("a"); n.setAttribute("href", "data:text/plain;charset=utf-8, " + encodeURIComponent(t)); n.setAttribute("download", e); document.body.appendChild(n); n.click(); document.body.removeChild(n); }
  const capitalize = (str) => { return str === "" ? "" : str[0].toUpperCase() + str.slice(1); }
  return (
    <ChatContext.Provider value={{
      sleep: sleep,
      clipboardcode: clipboardcode,
      download: download,
      capitalize: capitalize,
      getRndInteger: getRndInteger,
      arrayRemove: arrayRemove,
      playaudio: playaudio,
    }}>{props.children}</ChatContext.Provider>
  )
}
