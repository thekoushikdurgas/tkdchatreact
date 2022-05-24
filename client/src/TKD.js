import React from 'react';
import App from './componts/App';
import ChatState from "./componts/context/ChatState";

export default function TKD() {
  return (
    <ChatState>
      <App/>
    </ChatState>
  )
}
