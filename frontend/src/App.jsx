import React from 'react';
import Header from './components/Header';
import { Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return(
        <div>
          <Header />
          <div className='flex gap-10 justify-center items-center'>
            <Link className='navi' to="/teacher">Teachers' page</Link>
            <Link className='navi' to="/moder">Moderators' page</Link>
            <Link className='navi' to="/student">Students' page</Link>
          </div>
      </div>
    )
  }
}

export default App;