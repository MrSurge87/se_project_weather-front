import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import { useState, useContext } from "react";
import likeButton from "../../images/State=Default.svg";
import likeButtonActive from "../../images/State=Liked.svg";

const ItemCard = ({ item, onSelectCard, isLoggedIn, onCardLike }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { isLiked, setIsLiked } = useState(item.likes.some((user) => user === currentUser?._id));
  const id = item._id;

  const itemLikeButtonClassName = isLoggedIn
    ? `${isLiked ? "card__like-btn_liked" : "card__like-btn"}`
    : "card__like-btn_hidden";

  const handleLike = () => {
    onCardLike(id, isLiked, setIsLiked);
  };

  return (
    <div>
      <div className="card_name">
        {item.name}
        <button
          className="card__like"
          onClick={handleLike}
        >
          <img
            className="card_like-button"
            src={isLiked ? likeButtonActive : likeButton}
            alt="like-button"
          />
        </button>
      </div>

      <img
        src={item.imageUrl}
        className="card_image"
        onClick={() => onSelectCard(item)}
        alt={item.name}
      />
    </div>
  );
};

export default ItemCard;
