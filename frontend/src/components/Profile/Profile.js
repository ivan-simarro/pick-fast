import { useOutletContext } from "react-router-dom";
import Form from "./Form/Form";
import "./Profile.scss";
import ProfileLogged from "./ProfileLogged/ProfileLogged";


export default function Profile() {

    // eslint-disable-next-line
    const [productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected, logged, setLogged] = useOutletContext();

    return logged
        ? <ProfileLogged />
        : <Form setLogged={setLogged} />
}