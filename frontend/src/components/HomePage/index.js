//create home page component
import React from 'react';
import './HomePage.css'

function HomePage() {
  return (
    <div id="home-page-container">
      <h1 className="home-page-title">Welcome to AudioCore </h1>
      <p className="home-page-body">Your favorite Music Destination</p>
      <div id="home-page-content">
      </div >
      <footer>
        <p>Copyright &copy; 2021</p>
        <p>Created by:
          <a href="https://github.com/Vazhac"> Vazha Chiaberashvili</a>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
