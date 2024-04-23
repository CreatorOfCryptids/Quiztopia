import { React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Template from './Template';
import './App.css';

function Home(){

    const loggedInUser = localStorage.getItem('loggedInUser')

    const [username, setUsername] = useState("");
    const [folder, setFolder] = useState("");

    useEffect(() => {
        axios.post('http://localhost:9000/getUser', {userID : loggedInUser})
        .then((res) => {
          setUsername(res.data.username);
          setFolder(res.data.folder);
        })
        .catch((err) => {
            alert("ERROR: " + err);
        })
    }, []);

    return(
        <div className='background'>
          <h1>
            Welcome{loggedInUser !=null && `, ${username}`} to Quiztopia!!!
          </h1>
          <body className='navbar-center'>
            <Link to="/Login">Login </Link>
            <Link to="/Signup">Signup </Link>
            { loggedInUser != null &&
              <Link to={`/ViewFolder/${folder}}`}>View Folders </Link>
            }

          </body>
        </div>
    );
}

export default Home;
