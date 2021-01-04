import React, { useEffect } from 'react'
import AuthState from './context/auth/AuthState'
import ChatState from './context/chat/chatState'
import PrivateRoute from './pages/PrivateRoute'

//styles
import "./custom.scss"

function App() {
  useEffect(() => {
    alert(process.env.NODE_ENV);
  })
  return (
    <AuthState>
      <ChatState>
        <div className="dchat">
          <PrivateRoute />
        </div>
      </ChatState>
    </AuthState>
  );
}

export default App;