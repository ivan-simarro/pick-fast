export default function filtering(product, type = "", searchTerm) {
    const formatedSearchTerm = searchTerm.toLowerCase();
    if ((product.type === type || product.type.includes(type)) && (product.name.toLowerCase().includes(formatedSearchTerm) || product.description.toLowerCase().includes(formatedSearchTerm) || product.brand.toLowerCase().includes(formatedSearchTerm))) {
        return true
    }
    return false;
}