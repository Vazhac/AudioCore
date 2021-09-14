import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton.js';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import Searchbar from './Searchbar.js';
import Title from './HomeButton.js';

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
        <div id="nav-bar">
            <div id="title-and-search">
                <NavLink exact to="/">
                    <Title />
                </NavLink>
                <Searchbar />
            </div>
            <NavLink id="new-upload-nav-link" to="/upload">Upload</NavLink>
            <div id="nav-links" >
                {isLoaded && sessionLinks}
            </div>
        </div >
    );
}

export default Navigation;
