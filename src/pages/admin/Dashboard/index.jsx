import React, { useEffect, useState } from "react";
import apiCall from "../../../api/apiCall";
import '../../../assets/styles/admin/dashboard/AdminDashboard.css';
import Loader from '../../common/Loader';


const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await apiCall("GET", "/admin/dashboard");
        console.log("res:", res);
        setDashboardStats(res.data);
        setRecentOrders(res.data.recentOrders);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <>
    { loading ? <Loader />: null }
    <div className="container-fluid p-4 bg-light min-vh-100">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
      </div>

      {/* Statistic Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card text-white shadow">
            <div className="card-body bg-primary rounded-3">
              <h5 className="card-title">Total Orders</h5>
              <h3>{dashboardStats?.totalOrders}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white  shadow">
            <div className="card-body bg-success rounded-3">
              <h5 className="card-title">Revenue</h5>
              <h3>£{dashboardStats?.revenue}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white  shadow ">
            <div className="card-body bg-warning rounded-3">
              <h5 className="card-title">Active Items</h5>
              <h3>{dashboardStats?.activeItems}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white  shadow">
            <div className="card-body bg-danger rounded-3">
              <h5 className="card-title">Pending Orders</h5>
              <h3>{dashboardStats?.pendingOrders}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow border-0">
        <div className="card-header bg-white fw-bold">Recent Orders</div>
        <div className="card-body table-responsive">
          <table className="table table-striped table-hover align-middle ">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
              recentOrders.map((order) => {
                let statusClass = "";
                if (order.status.toLowerCase() === "pending") {
                  statusClass = "status-pending";
                } else if (
                  order.status.toLowerCase() === "cancelled" ||
                  order.status.toLowerCase() === "canceled"
                ) {
                  statusClass = "status-cancelled";
                } else if (order.status.toLowerCase() === "delivered") {
                  statusClass = "status-delivered";
                }

                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.total}</td>
                    <td>
                      <span className={statusClass}>{order.status}</span>
                    </td>
                    <td>{new Date(order.date.replace(" ", "T") + "Z").toLocaleString()}</td>
                  </tr>
                );                
              })
              ):(
                <tr>
                  <td colSpan="5" className="text-center">No recent orders found.</td>
                </tr>
              )}


            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
