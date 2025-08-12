import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import apiCall from "../../../api/apiCall";

const ManageTakeawayItem = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await apiCall("get", "/api/takeaway-menu");
        setItems(res.data || []);
      } catch (error) {
        console.error("Error fetching takeaway items:", error);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Manage Takeaway Items</h3>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Item ID</th>
            <th>Category</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Allergens</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.category_name}</td>
                <td>{item.item_name}</td>
                <td>{item.description}</td>
                <td>
                  {item.allergens_icons ? (
                    <img
                      src={item.allergens_icons}
                      alt="allergen"
                      style={{ width: "30px", height: "30px" }}
                    />
                  ) : (
                    "None"
                  )}
                </td>
                <td>₹{item.price}</td>
                <td>
                  {item.status === "available" ? (
                    <span className="badge bg-success">Available</span>
                  ) : (
                    <span className="badge bg-danger">Unavailable</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTakeawayItem;
