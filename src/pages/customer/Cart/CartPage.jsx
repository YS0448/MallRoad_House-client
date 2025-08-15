import React, { useEffect, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import CartItem from "./CartItem.jsx";
import apiCall from "../../../api/apiCall";
import "../../../assets/styles/customer/Cart/Cart.css";
import empty_cart from '../../../assets/media/image/empty_cart.jpg';
import { Toast, showToast} from '../../common/AlertService.jsx'
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartItems();
  }, []);

  // 🔹 Whenever cartItems change, recalc totals for checked items
  useEffect(() => {
    const itemsCount = cartItems.reduce(
      (count, item) => (item.checked ? count + item.number_of_items : count),
      0
    );

    const amount = cartItems.reduce(
      (sum, item) => (item.checked ? sum + item.price * item.number_of_items : sum),
      0
    );

    setTotalItems(itemsCount);
    setTotalAmount(amount);
  }, [cartItems]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await apiCall("GET", `/api/cart`);

      const fetchedItems = response.data.items.map((item) => ({
        ...item,
        checked: true,
      }));

      setCartItems(fetchedItems);
      setTotalCount(response.data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
    setLoading(false);
    setInitialLoading(false);
  };

  const handleCheckboxChange = (cartId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cart_id === cartId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleQuantityChange = async (cart_id, delta) => {
    const item = cartItems.find((item) => item.cart_id === cart_id);
    const newQuantity = item.number_of_items + delta;
    if (newQuantity <= 0) return;

    try {
      await apiCall("PUT", `/api/cart/${cart_id}`, {
        number_of_items: newQuantity,
      });
      fetchCartItems();
    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };

  const handleRemoveItem = async (cart_id) => {
    try {
      await apiCall("DELETE", `/api/cart/${cart_id}`);
      fetchCartItems();
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const grandTotal = totalAmount; // already calculated in useEffect


const handleCheckout = () => {
  const checkedItems = cartItems.filter(item => item.checked);
  console.log('checkedItems:', checkedItems);
  if(checkedItems.length === 0) {
    showToast('error', 'Please select at least one item to proceed to checkout.');
    return;
  }
  navigate('/checkout', { state: { items: checkedItems } });
};


  return (
    <>
    <Toast/>
    <div className="cart-page container my-4">
      <h2 className="mb-4 text-primary">
        🛒 Your Cart ({totalCount} products)
      </h2>

      {initialLoading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        
<div className="empty-cart-container">
  <img
    src={empty_cart}
    alt="Empty Cart"
    className="empty-cart-image"
  />
  <p className="empty-cart-text">Your cart is empty.</p>
  <button className="order-button" onClick={() => {navigate('/menu')}}>
    Start Shopping
  </button>
</div>

      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <CartItem
                  key={`cart-${item.cart_id}-${index}`}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
            </div>
            {loading && <p className="text-center">Refreshing cart...</p>}
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm p-3 sticky-top" style={{ top: "80px" }}>
              <h5 className="mb-3">Cart Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Amount:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between border-top pt-2 fw-bold fs-5">
                <span>Grand Total:</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
              <button className="btn btn-success w-100 mt-3" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CartPage;
