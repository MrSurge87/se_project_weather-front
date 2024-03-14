
import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({onSelectCard, onCreate, clothingItems, onAddItem}) => {

    return (
        <div className="profile__card-items">
            {clothingItems.map((item) => {
                return (
                <ItemCard 
                item={item} 
                key={item?._id ?? item?.id} 
                onSelectCard={onSelectCard} 
                onCreate={onCreate}
                onAddItem={onAddItem}
                 />
                );
            })}
        </div>
    );
}

export default ClothesSection;
