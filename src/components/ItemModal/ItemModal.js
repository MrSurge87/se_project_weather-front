import "./ItemModal.css";
import React from "react";

const ItemModal = ({ selectedCard, onClose, onClick }) => {
  return (
    <div className={"modal"}>
      <div className="preview-image-content">
      <button className="preview-image-close" type="button" onClick={onClose}></button>
        <img className="image-preview" src={selectedCard.imageUrl} alt="image-preview"></img>
        
        <div className="preview-image-name"> {selectedCard.name} 
          <button className="delete-button" onClick={onClick}>
            Delete Item
          </button></div>
        <div className="preview-image-weather-type"> Weather Type: {selectedCard.weather} </div>
      </div>
    </div>
  );
};

export default ItemModal;
