import "./UpButton.scss";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function UpButton() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrolled = document.documentElement.scrollTop;
            if (scrolled > 600) {
                setVisible(true)
            }
            else if (scrolled <= 600) {
                setVisible(false)
            }
        });
    }, [])



    return (
        <div
            className="up"
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
            style={{ display: visible ? 'inline' : 'none' }}
        >
            <FaArrowUp />
        </div>
    )
}