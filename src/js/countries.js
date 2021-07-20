const SOURCE_URL = 'https://restcountries.eu/rest/v2/name/';


function searchCountryList(name) {
const COUNTRY_PROPERTIES = 'prop=name;capital;population;flag;languages'
    return fetch(`${SOURCE_URL}${name}?${COUNTRY_PROPERTIES}`).then(response => {
        return response.json();
    })
    .catch(error => {console.log(error)
    });
}

export default { searchCountryList }