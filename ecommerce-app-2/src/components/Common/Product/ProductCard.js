import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineHeart} from 'react-icons/ai';
import { fetchProducts, fetchShoppingCartByUserId } from "../../../app/slices/product";

//Her bir ürünü temsil edecek
const ProductCard = (props) => {
        let dispatch=  useDispatch();
        let triggerSepet = false;

        useEffect(() => {
            if(triggerSepet) {
                dispatch(fetchShoppingCartByUserId(1));
            }
            triggerSepet = true;
            // dispatch(fetchProducts())
            // dispatch(fetchShoppingCartByUserId(1));
        }, [triggerSepet])
        const sepeteEkle = async(id) => {
            triggerSepet = true;
            console.log("tıklandı");
            await dispatch({type :"products/AddToCart",payload : {id}})
            await dispatch(fetchShoppingCartByUserId(1));
        }
        
        const favorilereEkle = async(id) => {
            console.log("tıklandı");
            dispatch({type :"products/addToFavorites",payload : {id}})
        }
    return(
        <>
         <div className="product_wrappers_one">


            <div className="thumb">
                 <Link to={`/product-details-two/${props.data.productId}`} className="image">
                    <img src={`/img/${props.data.imageUrl}`} alt={props.data.name} />
                    <img className="hover-image" src={`/img/${props.data.imageUrl}`} alt={props.data.description} />
                 </Link>
                   <span className="badges">
                    <span className={(['yaz','yeni','satışta'][Math.round(Math.random()*2)])} >
                        {props.data.name}
                    </span>
                   </span>
                   <div className="actions">
                     <a href="#!" className="action wishlist" title="Favorilere Ekle"
                      onClick={() => favorilereEkle(props.data.productId)} ><AiOutlineHeart />

                     </a>
                 </div>
                 <button type="button" className="add-to-cart offcanvas-toggle" 
                    onClick={() => sepeteEkle(props.data.productId)} >Sepete Ekle</button>
             </div>
             <div className="content">
                <h5 className="title">
                    <Link to={`/product-details-two/${props.data.productId}`}>{props.data.title}</Link>
                </h5>
                <span className="price">
                    <span className="new">{props.data.price}.00 TL</span>
                </span>
             </div>
               
            </div>
        </>
    )
}

export default ProductCard