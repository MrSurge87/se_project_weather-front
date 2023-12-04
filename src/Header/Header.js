import "./Header.css";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../images/Logo.svg").default} alt="logo" />
        </div>
        <div className="header__date">Date</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <div className="header__name">MrSurge</div>
        <div>
          <img src={require("../images/avatar.svg").default} alt="avartar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
