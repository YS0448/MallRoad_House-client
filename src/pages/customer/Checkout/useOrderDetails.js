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
        number_of_items: Number(item.number_of_items),
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
    updated[index].number_of_items += 1;
    setItems(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...items];
    if (updated[index].number_of_items > 1) {
      updated[index].number_of_items -= 1;
      setItems(updated);
    }
  };

  const grandTotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.number_of_items),
    0
  );

  return {
    items,
    loading,
    increaseQty,
    decreaseQty,
    grandTotal,
    setItems,
  };
}
