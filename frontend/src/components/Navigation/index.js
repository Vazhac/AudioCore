import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton.js';
import LoginFormModal from '../LoginFormModal';
import UploadFormModal from '../UploadFormModal';
import './Navigation.css';
import Searchbar from './Searchbar.js';
import LogoButton from './LogoButton.js';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />

        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink id="sign-up-nav-link" to="/signup">Create account</NavLink>
            </>
        );
    }

    return (
        <div id="nav-bar-container">
            <div id="nav-bar">
                <div id="left-nav-links">
                    <NavLink exact to="/">
                        <LogoButton />
                    </NavLink>
                    <NavLink id="home-nav-link" to="/">Home</NavLink>
                    <NavLink id="songs-nav-link" to="/songs">Songs</NavLink>
                    <NavLink id="albums-nav-link" to="/albums">Albums</NavLink>
                </div>
                <div id="search-bar-container">
                    <Searchbar />
                </div>
                <UploadFormModal />
                <div id="right-nav-links" >
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </div >
    );
}

export default Navigation;
