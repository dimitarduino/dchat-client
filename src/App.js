import React from 'react'
//components
import Account from './components/Account'
import Main from './pages/Main'

//styles
import "./custom.scss"

function App() {
  return (
    <div className="dchat">
        <Main />
      {/* <div className="account bg-primary">
        <Account/>
      </div> */}
    </div>
  );
}

export default App;