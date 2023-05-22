
const getProductsByCategory = async ({ categoryId }) => {
    try {
        const response = await fetch(`http://localhost:4000/categories/${categoryId}/products`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const getProductById = async ({ id }) => {
    try {
        const response = await fetch(`http://localhost:4000/products/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

const getAllCategories = async () => {
    try {
        const response = await fetch('http://localhost:4000/categories');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const getCategoryById = async ({ id }) => {
    try {
        const response = await fetch(`http://localhost:4000/categories/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

const getProductsWithDiscount = async () => {
    try {
        const response = await fetch('http://localhost:4000/products?discount=true');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};


const searchProducts = async ({ searchItems }) => {
    try {
        const response = await fetch(`http://localhost:4000/search?search=${encodeURIComponent(searchItems)}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const getCart = async () => {
    try {
        const response = await fetch('http://localhost:4000/cart');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const getWishlist = async () => {
    try {
        const response = await fetch('http://localhost:4000/wishlist');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const countCartItems = async () => {
    try {
        const response = await fetch('http://localhost:4000/cart/count');
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error('Error:', error);
        return 0;
    }
};

const addProductToWishlist = async ({ id }) => {
    try {
        await fetch(`http://localhost:4000/wishlist/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: id })
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const updateQuantity = async ({ id, size, newQuantity }) => {
    try {
        const response = await fetch(`http://localhost:4000/cart/update/${id}/${size}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newQuantity })
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
const deleteProductFromCart = async ({ id, size }) => {
    try {
        await fetch(`http://localhost:4000/cart/delete/${id}/${size}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const deleteProductFromWishList = async ({ id }) => {
    try {
        await fetch(`http://localhost:4000/wishlist/delete/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = {
    getProductsByCategory,
    getAllCategories,
    getCategoryById,
    getProductById,
    countCartItems,
    updateQuantity,
    deleteProductFromCart,
    getCart,
    addProductToWishlist,
    getWishlist,
    getProductsWithDiscount,
    searchProducts,
    deleteProductFromWishList
};