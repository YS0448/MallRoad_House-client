const EditModal = ({ open, onClose, selectedItem, previewImage, onChange, onImageChange, onSave }) => {
  if (!selectedItem) return null;

  return (
    <div className={`modal fade ${open ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: open ? "rgba(0,0,0,0.5)" : "transparent" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Edit Takeaway Item</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <input type="text" className="form-control" name="category_name" value={selectedItem.category_name} onChange={onChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Item Name</label>
                  <input type="text" className="form-control" name="item_name" value={selectedItem.item_name} onChange={onChange} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={selectedItem.description || ""} onChange={onChange}></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price</label>
                  <input type="number" className="form-control" name="price" value={selectedItem.price} onChange={onChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" name="status" value={selectedItem.status} onChange={onChange}>
                    <option value="available">Available</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Image</label>
                <input type="file" className="form-control" onChange={onImageChange} />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-2 rounded shadow-sm" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={onSave}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
