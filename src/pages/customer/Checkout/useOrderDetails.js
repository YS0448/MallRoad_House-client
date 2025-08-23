// src/components/customer/Checkout/useOrderDetails.js

import { useState, useEffect } from "react";
import apiCall from "../../../api/apiCall";

export default function useOrderDetails(initialItems = []) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(initialItems.length === 0);

  useEffect(() => {
    if (initialItems.length === 0) {
      fetchCartItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await apiCall("GET", "/api/cart");
      const fetchedItems = response.data.items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
      })) || [];
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = (index) => {
    const updated = [...items];
    updated[index].quantity += 1;
    setItems(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...items];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setItems(updated);
    }
  };

  const grandTotal = items.reduce(
    (sum, item) => sum + (Number(item.price) + Number(item.extra_charge || 0) )  * Number(item.quantity),
    0
  );


const handleRemoveItem = async (item) => {
  try {
    // Remove from frontend state first
    setItems(prev => prev.filter(i => 
      !(i.meal_id === item.meal_id && i.menu_type === item.menu_type)
    ));

    // Only call API if cart_id exists
    if (item.cart_id) {
      await apiCall("DELETE", `/api/cart/${item.cart_id}`);
    }
  } catch (err) {
    console.error("Error removing item:", err);
  }
};



// await apiCall("DELETE", `/api/cart/${cart_id}`);


  return {
    items,
    loading,
    increaseQty,
    decreaseQty,
    grandTotal,
    setItems,
    handleRemoveItem
  };
}
