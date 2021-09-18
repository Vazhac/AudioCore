//create home page component
import React from 'react';
import './HomePage.css'
import Navigation from '../Navigation';
import AudioPlayer from '../AudioPlayer'

function HomePage() {
  return (
    <div id="home-page-container">
      <Navigation />
      <div id="home-page-content">
        <h1 className="home-page-title">Home Page</h1>
        <p className="home-page-body">This is the home page.</p>
      </div >
      <footer>
        <p>Copyright &copy; 2021</p>
        <p>Created by:
          <a href="https://github.com/Vazhac">Vazha Chiaberashvili</a>
        </p>
      </footer>
      <AudioPlayer />
    </div>
  );
}

export default HomePage;
