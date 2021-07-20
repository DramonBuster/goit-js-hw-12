import multipleCountriesMarkup from "../templates/countries-list-markup";
import oneCountryMarkup from '../templates/single-country-description';

import Notiflix from "notiflix";

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

import FC from './countries';


const input = document.querySelector('#search-box');

const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector('.country-list');


input.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput(evt) {

    const countryNameInput = evt.target.value.trim();
    if (countryNameInput ==='') {
        return Notiflix.Notify.failure('Please enter country');
    }
   
    FC.searchCountryList(countryNameInput).then(countryName => { 
       clearPage()
        if (countryName.status === 404) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (countryName.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countryName.length === 1) {
            getOneCountryMarkup(countryName);
        } else if (countryName.length > 1 && countryName.length <= 10) {
            getMultipleCountriesMarkup(countryName);
        }
    });

}

function getMultipleCountriesMarkup(countries) {
    countryList.insertAdjacentHTML('beforeend', multipleCountriesMarkup(countries));
}

function getOneCountryMarkup(country) {
    countryInfo.insertAdjacentHTML('beforeend', oneCountryMarkup(country));
}

function clearPage() {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
}