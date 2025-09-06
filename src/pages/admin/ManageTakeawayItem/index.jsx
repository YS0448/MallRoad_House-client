import React, { useEffect, useState } from "react";
import apiCall from "../../../api/apiCall";
import { Toast, showToast } from "../../common/AlertService";
import TableRow from "./TableRow";
import EditModal from "./EditModal";

const ManageTakeaway = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchItems = async (page = 1, search = "") => {
    try {
      const res = await apiCall("GET", `/admin/takeaway?page=${page}&limit=${itemsPerPage}&search=${search}`);
      setItems(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setPreviewImage(item.image_path ? `${baseUrl}${item.image_path}` : null);
    setNewImage(null);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  
const handleSave = async () => {
  try {
    const formData = new FormData();

    // Only append changed fields
    Object.entries(selectedItem).forEach(([key, value]) => {
      if (value !== originalItem[key]) formData.append(key, value);
    });

    if (newImage) formData.append("image", newImage);

    await apiCall("PUT", `/admin/takeaway/${selectedItem.meal_id}`, formData, true);
    showToast("success", "Updated Successfully");
    fetchItems(currentPage, searchTerm);
    setModalOpen(false);
  } catch (err) {
    console.error(err);
    showToast("error", err.message || "Failed to Update");
  }
};


  return (
    <>
      <Toast />
      <div className="container my-5">
        <h2 className="mb-4 text-center">Manage Takeaway Items</h2>

        {/* Search */}
        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              placeholder="Search by category or item..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Item</th>
                <th>Price</th>
                <th>Status</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item.meal_id} item={item} baseUrl={baseUrl} onEdit={handleEditClick} />
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

        {/* Pagination */}
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <EditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedItem={selectedItem}
        previewImage={previewImage}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onSave={handleSave}
      />
    </>
  );
};

export default ManageTakeaway;
