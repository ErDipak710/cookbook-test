import React from "react";
import "./App.css";

import i18n from "i18next";
import {initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import RecipeBook from "./components/RecipeBook";

i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs:['en','ar'],
    fallbackLng: "en",
    detection:{
      order: ['localStorage','htmlTag', 'cookie', 'path', 'subdomain'],
    },
    backend:{
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react:{useSuspense:false},
  });

// eslint-disable-next-line
const recipes = [
  {
    author: "Jim",
    name: "Chicken Curry",
    description: "Delicious spicy chicken curry",
  },
  {
    author: "Aravind",
    name: "Hamburger",
    description: "Juicy burger with toppings and a soft bun",
  },
];

function App() {
  return (<>
    <main className="bg-black ">
      <RecipeBook />
    </main>
  </>)
}

export default App;
