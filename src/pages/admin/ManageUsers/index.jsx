import React, { useEffect, useState } from "react";
import apiCall from "../../../api/apiCall";
import { showToast, Toast } from "../../common/AlertService";
import Loader from "../../common/Loader";
import '../../../assets/styles/admin/ManageUsers/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async (isFirstLoad = false) => {
    if (isFirstLoad) {
      setIsLoadingInitial(true);
    } else {
      setIsLoadingTable(true);
    }

    try {
      const response = await apiCall(
        "GET",
        `/admin/getAllUserDetails?page=${page}&limit=${limit}&search=${debouncedSearch}`
      );
      setUsers(response.data.data);
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("error", "Error fetching users.");
    } finally {
      if (isFirstLoad) {
        setIsLoadingInitial(false);
      } else {
        setIsLoadingTable(false);
      }
    }
  };

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch data when page or search changes
  useEffect(() => {
    fetchUsers(false);
  }, [page, debouncedSearch]);

  // Initial load
  useEffect(() => {
    fetchUsers(true);
  }, []);

  const handleStatusChange = async (user, newStatus) => {
    try {
      const data = { status: newStatus };
      const res = await apiCall(
        "PUT",
        `/admin/toggleUserStatus/${user.user_id}`,
        data
      );
      if (res.status === 200) {
        setUsers((prev) =>
          prev.map((u) =>
            u.user_id === user.user_id ? { ...u, status: newStatus } : u
          )
        );
        showToast("success", "User status updated successfully.");
      }
    } catch (error) {
      console.error("Status change error:", error);
      showToast("error", "Failed to change user status.");
    }
  };

  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <>
      <Toast />
      {isLoadingInitial ? (
        <Loader />
      ) : (
        <div className="container mt-4">
          <h3 className="mb-4 manage_users_title">Manage Users</h3>
          {/* Search Input */}
          <div className="my-3 d-flex justify-content-md-end">
            <input
              type="text"
              className="form-control search_input"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark text-center">
                <tr>
                  <th>User ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Last Login</th>
                  <th>Created At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingTable ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.user_id} className="text-center">
                      <td >{user.user_id}</td>
                      <td>{user.full_name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{new Date(user.last_login_at).toLocaleString()}</td>
                      <td>{new Date(user.created_at).toLocaleString()}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={user.status}
                          onChange={(e) =>
                            handleStatusChange(user, e.target.value)
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="deactivated">Deactivated</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
            <div className="fw-bold ps-2">Toal Number of Users:- {totalUsers}</div>  

          {/* Pagination */}
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link "
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${page === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
    </>
  );
};

export default ManageUsers;
