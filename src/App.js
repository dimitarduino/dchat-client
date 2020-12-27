import React from 'react'
//components
import Account from './components/Account'
import Main from './pages/Main'
import AuthState from './context/auth/AuthState'
import PrivateRoute from './pages/PrivateRoute'

//styles
import "./custom.scss"

function App() {
  return (
    <AuthState>
        <div className="dchat">
          <PrivateRoute />
        </div>
      </AuthState>
  );
}

export default App;