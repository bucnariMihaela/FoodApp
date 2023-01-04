import logo from "./logo.svg";
import "./App.css";
import languages from "./languages.json";
import currencies from "./currencies.json";
import NavigationBar from "./NavigationBar";
import background from "./background.jpg";
import Meals from "./Meals";
import React, { useState, createContext, useEffect } from "react";
import CartModal from "./CartModal.js";
import Footer from "./Footer.js";
import cart from "./cart.jpg";

export const LanguageContext = createContext();

const App = () => {
  const [amount, setAmount] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    setMeals([
      {
        id: "meal1",
        title: "Sushi",
        description: "Finest fish and veggies",
        price: (10.99 * currencies[selectedLanguage].rate).toFixed(2),
      },
      {
        id: "meal2",
        title: "Rice Bowl",
        description: "Healthy rice yummy",
        price: (5.99 * currencies[selectedLanguage].rate).toFixed(2),
      },
      {
        id: "meal3",
        title: "Burger",
        description: "American, raw, meaty",
        price: (10.99 * currencies[selectedLanguage].rate).toFixed(2),
      },
      {
        id: "meal4",
        title: "Pizza",
        description: "Intensely cheesy flavor",
        price: (8.99 * currencies[selectedLanguage].rate).toFixed(2),
      },
    ]);
  }, [selectedLanguage]);

  const [itemsInCart, setItemsInCart] = useState([]);

  const onAddAmountHandler = (entered) => {
    setItemsInCart((prev) => [...prev, entered]);
    setAmount((prev) => {
      return prev + parseInt(entered.cantitate);
    });
  };

  const onOrderHandler = (entered) => {
    setItemsInCart([]);
    setAmount(0);
  };

  const onSelectLanguageHandler = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage.target.value);
  };

  const incrementHandler = (selectedItem, increment) => {
    const replacedItems = itemsInCart.map((itemInCart) => {
      if (itemInCart.nume === selectedItem.nume && increment === true) {
        return {
          nume: itemInCart.nume,
          pret: itemInCart.pret,
          cantitate: parseInt(itemInCart.cantitate) + 1,
        };
      }
      if (itemInCart.nume === selectedItem.nume && increment === false) {
        return {
          nume: itemInCart.nume,
          pret: itemInCart.pret,
          cantitate: parseInt(itemInCart.cantitate) - 1,
        };
      }
      return itemInCart;
    });
    setItemsInCart(replacedItems);
  };

  return (
    <LanguageContext.Provider value={selectedLanguage}>
      <div className="App" style={{ backgroundImage: `url(${background})` }}>
        <NavigationBar
          language={selectedLanguage}
          cartAmount={amount}
          cartItems={itemsInCart}
          onIncrement={incrementHandler}
          onOrder={onOrderHandler}
          onSelectLanguage={onSelectLanguageHandler}
        />
        <div id="description-container">
          <h1>{languages.description_headline[selectedLanguage]}</h1>
          <p>{languages.description_body[selectedLanguage]}</p>
        </div>
        {meals.map(meal => <Meals
          title={meal.title}
          description={meal.description}
          price={meal.price}
          onAddAmount={onAddAmountHandler}
        />)}
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
