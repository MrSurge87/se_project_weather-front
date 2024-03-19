import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile.js";

//Context imports
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

//React imports
import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

//Utility imports
import {
  getForecastWeather,
  parseWeatherData,
} from "../../utils/WeatherAPI.js";

import {
  getItems,
  postItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../utils/Api.js";
import {
  login,
  update,
  register,
  checkToken,
  getUserData,
} from "../../utils/auth.js";

//Modal imports
import DeleteItem from "../DeleteItem/DeleteItem.js";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LogInModal/LogInModalForm.js";
import RegisterModal from "../RegisterModal/RegisterModal.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const history = useHistory("");
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleDeleteCard = () => {
    const id = selectedCard._id;
    deleteItems(id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  function handleOpenItemModal() {
    setActiveModal("preview");
  }

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register");
  };

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit");
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function checkLoggedIn(token) {
    return checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const registerUser = (values) => {
    handleSubmit(() => register(values).then(() => loginUser(values)));
  };

  const loginUser = (user) => {
    setIsLoading(true);
    return login(user)
      .then((res) => {
        //const token = res.data;
        setToken(res.token);
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setCurrentUser(res);
        handleCloseModal();
        history.push("/profile");
        //return checkLoggedIn(token);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateUser = (values) => {
    const jwt = localStorage.getItem("jwt");
    handleSubmit(() =>
      update(values, jwt).then((res) => setCurrentUser(res.data))
    );
  };

  const logoutUser = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setLoggedIn(false);
    history.push("/");
  };

  const handleCardLike = (id, isLiked) => {
    if (isLiked) {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard : c))
          );
          setIsLiked(false);
        })
        .catch((err) => console.log(err));
    } else {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard : c))
          );
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTempUnit("C")
      : setCurrentTempUnit("F");
  };

  const onAddItem = (values) => {
    const res = postItems(values)
      .then((res) => {
        setClothingItems((items) => [res, ...items]);
        handleCloseModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        setCity(data.name);
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((err) => console.log(err));
    getItems()
      .then((data) => setClothingItems(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt) {
      checkLoggedIn(jwt)
        .then(() => {
          setToken(jwt);
          getUserData(jwt)
            .then((res) => {
              setCurrentUser(res.data);
            })
            .catch((err) => {
              if (err.response && err.resonse.status === 401) {
                console.error("Token invlaide or expired. Logging you out...");
                logoutUser();
              } else {
                console.error("Error fetching user data:", err);
              }
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          onCreateModal={handleCreateModal}
          city={city}
          temp={temp}
          loggedIn={loggedIn}
          onLogin={handleOpenLoginModal}
          onRegister={handleOpenRegisterModal}
        />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
              handleCardLike={handleCardLike}
              handleOpenItemModal={handleOpenItemModal}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              onSelectCard={handleSelectedCard}
              onCreate={handleCreateModal}
              clothingItems={clothingItems}
              handleOpenItemModal={handleOpenItemModal}
              handleCardLike={handleCardLike}
              loggedIn={loggedIn}
              editProfile={handleOpenEditProfileModal}
              logout={logoutUser}
            />
          </ProtectedRoute>
        </Switch>

        {activeModal === "login" && (
          <LoginModal
            onClose={handleCloseModal}
            loginUser={loginUser}
            openRegisterModal={handleOpenRegisterModal}
          />
        )}

        {activeModal === "register" && (
          <RegisterModal
            onClose={handleCloseModal}
            registerUser={registerUser}
            openLoginModal={handleOpenLoginModal}
          />
        )}

        <Footer />

        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
            isLoading={isLoading}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleDeleteCard={handleDeleteModal}
          />
        )}
        {activeModal === "edit" && (
          <EditProfileModal
            onClose={handleCloseModal}
            updateUser={updateUser}
          />
        )}

        {activeModal === "delete" && (
          <DeleteItem
            onClose={handleCloseModal}
            handleDeleteCard={handleDeleteCard}
            selectedCard={selectedCard}
            isLoading={isLoading}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
