import { auth, provider, signInWithPopup } from "../firebase"; // Adjust path if needed
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from "../features/user/userSlice";
import { useEffect } from "react";
import React, { useState } from 'react';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                navigate('/home');
            }
        });
    }, [userName]);

    const handleAuth = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
            })
            .catch((error) => {
                alert(error.message);
            });
    };



    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }));
    };

    const toggleDropDown = () => {
        setIsDropDownVisible(!isDropDownVisible);
    };

    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="Disney+" />
            </Logo>

            {
                !userName ?
                    <Login onClick={handleAuth}>SIGN IN</Login>
                    :
                    <>

                        <NavMenu>
                            <a href="/home">
                                <img src="/images/home-icon.svg" alt="" />
                                <span>HOME</span>
                            </a>
                            <a href='/home'>
                                <img src="/images/search-icon.svg" alt="" />
                                <span>SEARCH</span>
                            </a>
                            <a href='/home'>
                                <img src="/images/watchlist-icon.svg" alt="" />
                                <span>WATCHLIST</span>
                            </a>
                            <a>
                                <img src="/images/original-icon.svg" alt="" />
                                <span>ORIGINALS</span>
                            </a>
                            <a>
                                <img src="/images/movie-icon.svg" alt="" />
                                <span>MOVIES</span>
                            </a>
                            <a>
                                <img src="/images/series-icon.svg" alt="" />
                                <span>SERIES</span>
                            </a>
                        </NavMenu>
                        <SignOut onClick={toggleDropDown}>
                    <UserImg src={userPhoto} alt={userName} />
                    {isDropDownVisible && (
                        <DropDown>
                            <UserInfo>
                                <img src={userPhoto} alt={userName} />
                                <span>{userName}</span>
                                <span>{auth.currentUser?.email}</span>  {/* Displaying user's email */}
                            </UserInfo>
                            <SignOutButton onClick={() => auth.signOut()}>SIGN OUT</SignOutButton>
                        </DropDown>
                            )}
                        </SignOut>
                    </>
            }
        </Nav>
    );
};

const Nav = styled.nav`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
    `;

const Logo = styled.a`  
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;
    cursor: pointer;
    img {
        display: block;
        width: 100%;
    }
    `;

const NavMenu = styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;
height: 100%;
justify-content: flex-end;
margin: 0px;
padding: 0px;
position: relative;
margin-right: auto;
margin-left: 25px;
cursor: pointer;

a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }

    span{
        color: rgb(249, 249, 249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
    

     &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
        }
    }

    &:hover {
        span:before {
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
        }
`;

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;
    cursor: pointer;
    text-align: center;

    &:hover {
        background-color: #f9f9f9;
        color: #000;    
        border-color: transparent;  
    }
`;

const UserImg = styled.img`
    height: 100%;
    border-radius: 50%;
    `;


    const DropDown = styled.div`
    position: absolute;
    top: 60px;
    right: 10px;
    background-color: #202020;
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 6px;
    box-shadow: rgb(0 0 0 / 60%) 0px 0px 10px 0px;
    padding: 16px;
    width: 260px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.95;
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        object-fit: cover; 
    }

    span {
        color: rgb(249, 249, 249);
        font-size: 16px;
        text-align: center;
        max-width: 220px; // to ensure long emails or names don't overflow
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

const SignOutButton = styled.button`
    padding: 10px 20px;
    background-color: #f9f9f9;
    color: #111;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #ff385c;
        color: #f9f9f9;
        transform: scale(1.05);
    }
`;



const SignOut = styled.div`
position: relative;
height: 48px;
width: 48px;
display: flex;
cursor: pointer;
align - items: center;
justify - content: center;
    
    ${ UserImg } {
    border - radius: 50 %;
    width: 100 %;
    height: 100 %;
}
        &:hover {
            ${ DropDown } {
        opacity: 1;
        transition - duration: 1s;
    }
}

`;

 
export default Header;
