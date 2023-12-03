import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import { fetchShoppingCartByUserId } from '../../app/slices/product';
const YourOrder = () => {

    const carts = useSelector((state) => state.products.carts);
    let dispatch = useDispatch();
    // dispatch(fetchShoppingCartByUserId(1));
    const cartTotal = () => {
        const totalPrice = carts.reduce(function (total, item) {
            return total + ((item.count || 1) * item.product.price)
        }, 0)
        return parseInt(totalPrice.toFixed(2));
    }

    const kargoHesapla = () => {
        if (cartTotal() < 100) {
            return 15;
        } else {
            return 0;
        }
    }
    kargoHesapla();

    const siparisToplam = cartTotal() + kargoHesapla();


    return (
        <>
            <div className="col-lg-6 col-md-6">
                <h3>Siparişiniz</h3>
                <div className="order_table table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Ürün</th>
                                <th>Toplam</th>
                            </tr>
                        </thead>
                        <tbody>
                                {carts.map((data, index) => (
                                    <tr>
                                        <td>{data.product.name}<strong> × {data.count}</strong></td>
                                        <td> {data.product.price * data.count} </td>
                                    </tr>
                                ))

                                }
                          
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Alt Toplam</th>
                                <td>{cartTotal()} TL</td>
                            </tr>
                            <tr>
                                <th>Kargo</th>
                                <td><strong>{kargoHesapla()} TL</strong></td>
                            </tr>
                            <tr className="order_total">
                                <th>Sipariş Toplamı </th>
                                <td><strong>{siparisToplam} TL</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="payment_method">
                    <form>
                        <div className="accordion" id="accordionExample">
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingOne">
                                    <div className="" data-toggle="collapse" data-target="#collapseOne" >
                                        <input type="radio" name="payment" id="html" value="HTML" defaultChecked />
                                        <label htmlFor="html">Para Transferi</label>
                                    </div>
                                </div>
                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>Direct Bank Transfer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingTwo">
                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                        <input type="radio" name="payment" id="javascript" value="JavaScript" />
                                        <label htmlFor="javascript">Mobile Bankacılık</label>
                                    </div>
                                </div>
                                <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>Direct Mobile Transfer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingThree">
                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseThree">
                                        <input type="radio" name="payment" id="css" value="JavaScript" />
                                        <label htmlFor="css">Paypal</label>
                                    </div>
                                </div>
                                <div id="collapseThree" className="collapse" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="order_button pt-3">
        
                        <Link to="/order-complete" className="theme-btn-one btn-black-overlay btn_sm">
                                Sipariş Ver</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default YourOrder