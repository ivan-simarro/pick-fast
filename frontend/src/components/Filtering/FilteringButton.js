import { sortProducts } from "./sortProducts";
import { RiArrowUpDownLine } from "react-icons/ri";

export default function FilteringButton({ setSelected, selected, setProducts, text, productsState, productKey, isReverse, setIsReverse }) {
    return <div className={selected === text ? "orderSelected" : ""} onClick={() => {
        setProducts(sortProducts(productsState, productKey, isReverse));
        setIsReverse(!isReverse);
        setSelected(text);
    }}><button>
            {text}
        </button><RiArrowUpDownLine /></div >
}