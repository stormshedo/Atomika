import React from 'react';
import Header from './components/Header';
import { Link } from "react-router-dom";

class App extends React.Component {

  render() {
    return(
      <div>
        <Header />
        <div className='flex flex-col justify-center items-center'>
          <Link to="/teacher">Teachers' page</Link>
          <Link to="/moder">Moderators' page</Link>
          <Link to="/student">Students' page</Link>
        </div>
      </div>
    )
  }
}

export default App;