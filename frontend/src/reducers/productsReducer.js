const TYPES = {
    PRODUCTS_FETCH_INIT: "PRODUCTS_FETCH_INIT",
    PRODUCTS_FETCH_SUCCESS: "PRODUCTS_FETCH_SUCCESS",
    PRODUCTS_FETCH_FAILURE: "PRODUCTS_FETCH_FAILURE",
    PRODUCTS_CLEAN_CART: "PRODUCTS_CLEAN_CART",
    ADD_TO_CART: "ADD_TO_CART",
    DELETE_PRODUCT_FROM_CART: "DELETE_PRODUCT_FROM_CART",
    ADD_DELETE_TO_FAVOURITES: "ADD_DELETE_TO_FAVOURITES",
}

const initialProductsState = {
    loading: false,
    error: false,
    products: []
}

const productsReducer = (state, action) => {
    switch (action.type) {
        case "PRODUCTS_FETCH_INIT":
            return {
                ...state,
                loading: true,
                error: false
            }
        case "PRODUCTS_FETCH_SUCCESS":
            return {
                loading: false,
                error: false,
                products: action.payload.map((p) => {
                    return { ...p, inCart: false, q: 0, favourite: false }
                })
            }
        case "PRODUCTS_FETCH_FAILURE":
            return {
                loading: false,
                error: true,
                products: []
            }
        case "PRODUCTS_CLEAN_CART":
            return {
                ...state,
                products: state.products.map(p => {
                    return { ...p, inCart: false, q: 0 }
                })
            }
        case "ADD_TO_CART":
            return {
                ...state,
                products: state.products.map((p) => {
                    if (p.id == action.payload.id) {
                        return p.inCart ? { ...p, q: action.payload.q } : { ...p, inCart: true, q: action.payload.q }
                    } else {
                        return p
                    }
                })
            }
        case "DELETE_PRODUCT_FROM_CART":
            return {
                ...state,
                products: state.products.map((p) => {
                    if (p.id == action.payload.id) {
                        return { ...p, inCart: false, q: 0 }
                    } else {
                        return p
                    }
                })
            }
        case "ADD_DELETE_TO_FAVOURITES":
            return {
                ...state,
                products: state.products.map((p) => {
                    if (p.id == action.payload.id) {
                        return { ...p, favourite: action.payload.favourite }
                    } else {
                        return p
                    }
                })
            }
        default:
            throw Error("Action products Error!")
    }
};

const ENDPOINT_PRODUCTS = 'api/products/';

export { TYPES, initialProductsState, productsReducer, ENDPOINT_PRODUCTS };