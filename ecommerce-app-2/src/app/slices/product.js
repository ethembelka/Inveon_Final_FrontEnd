import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../data/ProductData";
import {useSelector,useDispatch}  from "react-redux";
import productService from "../../services/product.service";
import Swal from "sweetalert2";
import axios from "axios";
import http from "../../services/product.service"
import shoppingCartService from "../../services/shoppingCart.service";
import Header from "../../components/Common/Header";
import { wait } from "@testing-library/user-event/dist/utils";

export const fetchShoppingCartByUserId = createAsyncThunk("fetchShoppingCartByUserId", async (userId) => {
    console.log("fetchShoppingCartByUserId userId: ", userId);
    const res = await shoppingCartService.getShoppingCartByUserId(userId);
    return res;
});

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    debugger;
    console.log("fetch_products")
    const res = await http.getAll();
    return res;
});

export const getProductWithId = createAsyncThunk("fetchProductWitId", async (id) => {
    console.log("fetch_products");
    // const res = await axios.get(`https://localhost:5050/api/products/${id}`, { withCredentials: true });
    const res = await http.getProduct(id);
    return res;
});

export const addToCartAsync = createAsyncThunk("addToCartAsync", async (cart) => {
    const response = await shoppingCartService.addCart(cart);
    return response.data;
});




const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        carts: [],
        favorites: [],
        single: null,  // her bir ürün temsil edelr

    },
    reducers: {
        //sepete ürün eklemek için kullanılacak
        AddToCart: (state, action) => {
            let { id } = action.payload;
            console.log(state.carts);
            let sepeteEklenecekUrun = state.carts.find(item => item.productId === parseInt(id));
            // console.log("product addtocart carts: " + state.carts);
            if (!sepeteEklenecekUrun) {
                //sepete eklemek istediğim ürün bilgilerine getirecek ilgili rest servisi çağırılır
                // await fetchProducts();
                console.log(state.products);
                let item = state.products.find(item => item.productId === parseInt(id))
                // try {
                //     const shoppingCart = await shoppingCartService.getShoppingCartByUserId(1);
                //     console.log("shoppingCart: " + shoppingCart);
                //     state.carts = shoppingCart.data.result.cartDetails;
                // } catch (ex) {
                //     console.log("shopping cart fetch ex: ", ex);
                // }
                // console.log("state.carts: " + state.carts);

                debugger;
                const cart = {
                    cartHeader: {
                        userId: "1",
                        couponCode: "1"
                    },
                    cartDetails: [{
                        productId: item.productId,
                        product: item,
                        count: 1
                    }]
                };

                shoppingCartService.addCart(cart);
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Ürün sepete eklendi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
            } else {
                debugger;
                const cart = {
                    cartHeader: {
                        userId: "1",
                        couponCode: "1"
                    },
                    cartDetails: [{
                        productId: sepeteEklenecekUrun.productId,
                        product: sepeteEklenecekUrun.product,
                        count: sepeteEklenecekUrun.count + 1
                    }]
                };
                console.log(sepeteEklenecekUrun);
                console.log(cart);
                shoppingCartService.updateCart(cart);
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Ürün sepete eklendi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
            }
        },
        getProductById: (state, action) => {
            debugger;
            let { id } = action.payload;
            let urunDetay = state.products.find(item => item.productId === parseInt(id))
            state.single = urunDetay
        },
        updateCart: (state, action) => {
            debugger;
            let { val, dataObj } = action.payload;
            /*state.carts.forEach(item => {
                if (item.cartDetailsId === parseInt(id)) {
                    item.count = parseInt(val);
                }
                console.log(item);
                shoppingCartService.updateCart(item);
            })*/
            const cart = {
                cartHeader: {
                    userId: dataObj.cartHeader.userId,
                    couponCode: dataObj.cartHeader.couponCode
                },
                cartDetails: [{
                    productId: dataObj.productId,
                    product: dataObj.product,
                    count: dataObj.count
                }]
            };
            state.carts = state.carts.map(cart => {
                if(cart.cartDetailsId == dataObj.cartDetailsId) {
                    return {...cart, count: dataObj.count}
                }
                return cart;
            });
            shoppingCartService.updateCart(cart);
        },
        removeCart: (state, action) => {
            debugger;
            let { id } = action.payload;
            state.carts = state.carts.filter(cart => cart.cartDetailsId !== id);
            shoppingCartService.removeCart(id);
            // let sepetinOnSonHali = state.carts.filter(item => item.id !== parseInt(id))
            // state.carts = sepetinOnSonHali
        },
        //sepeti comple silmek için
        clearCart: (state) => {
            state.carts.forEach(cart => {
                shoppingCartService.removeCart(cart.cartDetailsId);
            });
            state.carts = []
        },
        addToFavorites: (state, action) => {

            let { id } = action.payload;
            let item = state.favorites.find(item => item.id === parseInt(id))
            if (item === undefined) {
                let urunFavori = state.products.find(item => item.id === parseInt(id))
                urunFavori.quantity = 1
                state.favorites.push(urunFavori)
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: 'İlgili ürün favorilere eklenmiştir',
                        icon: 'success'
                    }

                )

            }
            else {
                Swal.fire('Başarsız', 'İlgili ürün favorilere eklenemedi', 'warning')
            }

        },
        removeToFav: (state, action) => {
            let { id } = action.payload;
            let favorilerinOnSonHali = state.favorites.filter(item => item.id !== parseInt(id))
            state.favorites = favorilerinOnSonHali
        },
        //favorileri temizle
        clearFav: (state) => {
            state.favorites = [] // state içindeki favori arrayını temizlemiş oluyor 
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            console.log("Product Fetch Bitti")
            state.isLoading = false
            state.isError = false
            state.products = action.payload.data.result;
            console.log(action.payload.data.result)
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log("Product Fetch Hata")
            state.isError = true
            state.isLoading = false
            console.log(action.payload)
        })
        builder.addCase(fetchProducts.pending, (state, action) => {
            console.log("Product Fetch Devam")
            state.isLoading = true;
            state.isError = false;
            console.log(action.payload)
        })
        builder.addCase(fetchShoppingCartByUserId.fulfilled, (state, action) => {
            console.log("Shopping Cart By User Id Bitti");
            state.isLoading = false;
            state.isError = false;
            state.carts = action.payload.data.result.cartDetails;
            console.log(action.payload.data.result.cartDetails);
        })
        builder.addCase(fetchShoppingCartByUserId.rejected, (state, action) => {
            console.log("Shopping Cart By User Id Hata");
            state.isError = true;
            state.isLoading = false;
            console.log(action.payload);
        })
        builder.addCase(fetchShoppingCartByUserId.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            console.log("Shopping Cart By User Id Pending");
        })
    }
})



const productsReducer = productsSlice.reducer
export default productsReducer

