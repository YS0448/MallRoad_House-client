import apiCall from "../../../api/apiCall";
import '../../../assets/styles/customer/MyOrders/MyOrders.css';
import React, { useEffect, useState } from "react";
import CustomHeroSection from "../../components/layout/CustomHeroSection";
import no_data_img from '../../../assets/media/image/no_data.jpg';

const OrderItemRow = ({ item }) => {
  const { order_item_id, item_name, quantity, per_item_price, total_price } = item;

  return (
    <tr key={order_item_id}>
      <td>{item_name || "Item"}</td>
      <td>{quantity}</td>
      <td>₹{per_item_price.toFixed(2)}</td>
      <td>₹{total_price.toFixed(2)}</td>
    </tr>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await apiCall("GET", `/api/orders/my?limit=${limit}&offset=${offset}`);
        console.log('response:', response.data);
        setOrders(response?.data?.data || []);
      } catch (err) {
        setError("Failed to load orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (orders.length === limit) setPage(page + 1);
  };

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  if (orders.length === 0)
    return (
      <div className="no-orders-container" style={{ textAlign: "center", marginTop: "2rem" }}>
        <img
          src={no_data_img}
          alt="No orders found"
          style={{ maxWidth: "300px", width: "100%", height: "auto" }}
        />
        <p>No orders found.</p>
      </div>
    );

  return (
    <>
      <CustomHeroSection
        title="My Orders"
        slogan="Your orders, delivered with care and precision."
      />
      <section className="my-orders" aria-label="User Orders">
        {orders.map(({ order_id, status, created_at, items }) => {
          // Calculate grand total for this order
          const grandTotal = items.reduce((sum, item) => sum + item.total_price, 0);

          return (
            <article key={order_id} className="order-card" aria-labelledby={`order-${order_id}`}>
              <header>
                <h2 id={`order-${order_id}`}>Order #{order_id}</h2>
                <p>
                  Status:{" "}
                  <strong className={`status-badge status-${status.toLowerCase()}`}>
                    {status}
                  </strong>
                </p>
                <p>Placed on: {new Date(created_at).toLocaleString()}</p>
              </header>

              <table className="order-items-table" aria-label={`Items in order #${order_id}`}>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price (Per Item)</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <OrderItemRow key={item.order_item_id} item={item} />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
                      Grand Total:
                    </td>
                    <td style={{ fontWeight: "bold" }}>₹{grandTotal.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </article>
          );
        })}

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={handleNextPage} disabled={orders.length < limit}>
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default MyOrders;
