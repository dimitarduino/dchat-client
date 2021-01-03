import React from 'react'
import AuthState from './context/auth/AuthState'
import ChatState from './context/chat/chatState'
import PrivateRoute from './pages/PrivateRoute'

//styles
import "./custom.scss"

function App() {
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