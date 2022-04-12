import { sortProducts } from "./sortProducts";

export default function FilteringButton({ setProducts, text, productsState, productKey, isReverse, setIsReverse }) {
    return <button onClick={() => {
        setProducts(sortProducts(productsState, productKey, isReverse));
        setIsReverse(!isReverse);
    }}>
        {text}
    </button>
}