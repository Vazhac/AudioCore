//create home page component
import React from 'react';
import './HomePage.css'

function HomePage() {
  return (
    <div id="home-page-container">
      <h1>Home Page</h1>
      <footer>
        <p>Copyright &copy; 2020</p>
        <p>Created by:
          <a href="https://github.com/Vazhac">Vazha Chiaberashvili</a>
        </p>
      </footer>
    </div >
  );
}

export default HomePage;
