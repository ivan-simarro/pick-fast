export function sortProducts(products, key, isReverse) {
    const sortedProducts = products.slice().sort((item1, item2) => {
        if (typeof (item1[key]) === "number") {
            return (item1[key] || 0) - (item2[key] || 0)
        }
        if (typeof (item1[key]) === "boolean") {
            return (item1[key] === item2[key]) ? 0 : item1[key] ? -1 : 1;
        }
        if (typeof (item1[key]) === "string" && typeof (item2[key]) === "string") {
            if (item1[key].toLowerCase() < item2[key].toLowerCase()) {
                return -1
            } else if (item1[key].toLowerCase() > item2[key].toLowerCase()) {
                return +1;
            } else {
                return 0;
            }
        }
        return 1;
    })

    return isReverse ? sortedProducts.reverse() : sortedProducts
}

