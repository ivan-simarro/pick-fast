import axios from "axios";

const ENDPOINT_FAVOURITES = "http://localhost:8000/api/favourites/";


export const putFavourites = (user, products) => axios.put(ENDPOINT_FAVOURITES + user + "/", { user, products })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log("Error metiendo favoritos");
    });