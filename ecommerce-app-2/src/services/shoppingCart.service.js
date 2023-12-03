import http from "../http-common";

class ShoppingCartService {
    getShoppingCartByUserId(userId) {
        return http.get(`/cart/GetCart/${userId}`);
    }

    addCart(cart) {
        debugger;
        return http.post("/cart", cart);
    }

    updateCart(cart) {
        debugger;
        return http.post("/cart/UpdateCart", cart);
    }

    removeCart(cartId) {
        return http.post("/cart/RemoveCart", cartId);
    }
}

export default new ShoppingCartService