import { SEARCH_PRODUCTS, SEARCH_CATEGORIE } from './actionTypes';
import axios from 'axios';

const url = 'http://localhost:5000';

export const searchProducts = (name) => (dispatch) => {
    axios 
        .get(`${url}/search/${name}`)
        .then(res => {
            dispatch({
                type: SEARCH_PRODUCTS,
                payload: res.data
            })
        })
        .catch(error => console.log(error));
};

export const searchCategories = (id) => (dispatch) => {
    if(id !== undefined){
        axios
        .get(`${url}/search/categorie/${id}`)
        .then(res => {
            dispatch({
                type: SEARCH_CATEGORIE,
                payload: res.data.products
            })
        })
        .catch(error => console.log(error))
    } else{
        axios
        .get(`${url}/products/`)
        .then(res => {
            dispatch({
                type: SEARCH_CATEGORIE,
                payload: res.data
            })
            
        })
        .catch(error => console.log(error))
    }
}