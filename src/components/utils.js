import axios from 'axios';

export const endPoint = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon/',
});