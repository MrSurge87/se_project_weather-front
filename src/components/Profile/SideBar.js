import React from "react";
import avatar from "../../images/avatar.svg";
import "./SideBar.css";

const SideBar = () => {
    return (
        <div className="profile__logo">
            <img className="profile__avatar-logo" src={avatar} alt="Avatar" />
            <p className="profile__user-name">Mr Surge</p>
        </div>
    )
};

export default SideBar;