
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
        return await response.json().count;
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
//
// const getProductsByCategory = ({categoryId}) => {
//     return new Promise((resolve) => {
//         resolve(products.filter(p => p.categoryId === categoryId))
//     })
// }
//
// const getProductById = ({id}) => {
//     return new Promise((resolve) => {
//         resolve(products.find(p => p.id === id));
//     })
// }
//
// const getAllCategories = () => {
//     return Promise.resolve(categories)
// }
//
// const getCategoryById = ({id}) => {
//     return new Promise((resolve) => {
//         resolve(categories.find(c => c.id === id))
//     })
// }
//
// const getProductsWithDiscount = () => {
//     return new Promise((resolve) => {
//         resolve(products.filter(p => p.discount))
//     })
// }
//
// const searchProducts = ({searchItems}) => {
//     return new Promise((resolve) => {
//         const filteredCategories = categories.filter(c => c.name.toUpperCase().includes(searchItems.toUpperCase()));
//         const filteredProducts = (filteredCategories.length > 0)
//             ? filteredCategories.flatMap((category) => products.filter(p => p.categoryId === category.id))
//             : products.filter(p => p.shortDescription.toUpperCase().includes(searchItems.toUpperCase()));
//         resolve(filteredProducts);
//     })
// }
//
// const getCart = () => {
//     return new Promise((resolve) => {
//         resolve(JSON.parse(localStorage.getItem("cart")) || []);
//     });
// }
//
// const getWishlist = () => {
//     return new Promise((resolve) => {
//         resolve(JSON.parse(localStorage.getItem("wishlist")) || [])
//     })
// }
//
// const countCartItems = () => {
//     return new Promise((resolve) => {
//         const cart = JSON.parse(localStorage.getItem("cart")) || [];
//         let number = 0;
//
//         for (let elem of cart) {
//             number += elem.quantity;
//         }
//         resolve(number)
//     });
// }
// const addProductToWishlist = ({id}) => new Promise((resolve) => {
//     let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     let wishItem = wishlist.find(prod => prod.productId === id);
//
//     if (!wishItem) {
//         wishItem = {productId: id};
//         wishlist.push(wishItem)
//     }
//
//     localStorage.setItem("wishlist", JSON.stringify(wishlist))
//     resolve()
// })
//
// const updateQuantity = ({id, size, newQuantity}) => {
//     return new Promise((resolve) => {
//         let cart = JSON.parse(localStorage.getItem("cart")) || [];
//         let cartItem = cart.find(prod => prod.productId === id && prod.size === size);
//
//         if (!cartItem) {
//             cartItem = {productId: id, quantity: newQuantity, size: size};
//             cart.push(cartItem)
//         }
//
//         cartItem.quantity = newQuantity;
//         let removed = false;
//
//         if(cartItem.quantity <= 0 ){
//             let index = cart.indexOf(cartItem);
//             cart.splice(index, 1);
//             removed = true
//         }
//
//         localStorage.setItem("cart", JSON.stringify(cart));
//         resolve({removed: removed, newQuantity: cartItem.quantity})
//     })
// }
//
// const deleteProductFromCart = ({id, size}) => {
//     return new Promise((resolve) => {
//         let cart = JSON.parse(localStorage.getItem("cart")) || [];
//         let index = cart.findIndex(prod => prod.productId === id && prod.size === size);
//         cart.splice(index, 1);
//
//         localStorage.setItem("cart", JSON.stringify(cart));
//         resolve()
//     })
// }
//
// const deleteProductFromWishList = ({id}) => {
//     return new Promise((resolve) => {
//         let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//         let index = wishlist.findIndex(prod => prod.productId === id);
//         wishlist.splice(index, 1);
//         localStorage.setItem("wishlist", JSON.stringify(wishlist));
//         resolve()
//     })
// }
//
// export {
//     getProductsByCategory,
//     getAllCategories,
//     getCategoryById,
//     getProductById,
//     countCartItems,
//     updateQuantity,
//     deleteProductFromCart,
//     getCart,
//     getProductsWithDiscount,
//     addProductToWishlist,
//     getWishlist,
//     deleteProductFromWishList,
//     searchProducts,
// }