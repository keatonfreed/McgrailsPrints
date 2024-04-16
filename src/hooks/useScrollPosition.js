
import { useEffect, useState } from "react";

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const element = document.querySelector("#root")

    useEffect(() => {
        const updatePosition = (top) => {
            setScrollPosition(top / 2 || 0);
        }
        element.addEventListener("scroll", (e) => { updatePosition(e.target.scrollTop) });
        updatePosition(element.scrollTop);
        return () => {
            element.removeEventListener("scroll", updatePosition)
        };
    }, [element]);

    return scrollPosition;
};

export default useScrollPosition;