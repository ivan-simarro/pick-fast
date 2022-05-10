import axios from 'axios';

const ENDPOINT_ORDERS = "http://localhost:8000/api/orders/";

export const postOrder = (user, bill) => axios.post(ENDPOINT_ORDERS, { user, bill });