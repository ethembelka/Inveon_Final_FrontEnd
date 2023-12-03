import http from "../http-common";

class ProductDataService {
    getAll() {
        return http.get("/products");
    }

    getProduct(id) {
        return http.get(`/products/${id}`);
    } 

    create(data) {
        return http.post("/products", data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }
}

export default new ProductDataService