//create home page component
import React from 'react';
import './HomePage.css'

function HomePage() {
  return (
    <div id="home-page-container">
      <div id="home-page-content">
        <h1>Home Page</h1>
        <p>This is the home page.</p>
        <footer>
          <p>Copyright &copy; 2020</p>
          <p>Created by:
            <a href="https://github.com/Vazhac">Vazha Chiaberashvili</a>
          </p>
        </footer>
      </div >
    </div>
  );
}

export default HomePage;
