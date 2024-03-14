import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "./Profile.css";

const Profile = ({onCreate, clothingItems, onSelectCard, onAddItem}) => {

    return (
        <div className="profile">
            <SideBar />
            <div className="profile__items-container">
                <div className="profile__items-text">
                    Your clothing items
                    <button className="profile__add-button"
                    onClick={onCreate}
                    type="button" 
                    > + Add New
                    </button>
                </div>
                <ClothesSection 
                clothingItems={clothingItems} 
                onSelectCard={onSelectCard} 
                onCreate={onCreate} 
                onAddItem={onAddItem}/>
            </div>
        </div>
    )
}

export default Profile;

