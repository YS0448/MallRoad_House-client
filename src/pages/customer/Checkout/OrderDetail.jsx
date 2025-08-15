import "../../../assets/styles/customer/Checkout/OrderDetail.css";

const OrderDetails = ({
  items,
  increaseQty,
  decreaseQty,
  paymentMethod,
  grandTotal,
}) => {
  console.log('items:', items);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="container my-4">
      <h3 className="mb-4">Your Order</h3>

      {items.length === 0 ? (
        <div className="alert alert-warning">No items in your order.</div>
      ) : (
        <>
          {/* Scrollable List */}
          <div className="order-list ps-3 ">
            {items.map((item, index) => {
              const price = Number(item.price) || 0;
              const qty = Number(item.number_of_items) || 0;
              const subtotal = price * qty;

              return (
                <div
                  className="row align-items-center border rounded p-3 mb-3 shadow-sm bg-white order-item"
                  key={item.cart_id || index}
                >
                  {/* Image */}
                  <div className="col-md-3 col-12 text-center">
                    <img
                      src={baseUrl + item.image_path}
                      alt={item.product_name}
                      className="img-fluid rounded order-img"
                    />
                  </div>

                  {/* Details */}
                  <div className="col-md-9 col-12">
                    <h5 className="mb-1">{item.item_name}</h5>
                    <div className="text-muted">Price: ₹{price.toFixed(2)}</div>

                    {/* Quantity with + - */}
                    <div className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-outline-secondary btn-sm px-2 py-1"
                        onClick={() => decreaseQty(index)}
                      >
                        −
                      </button>
                      <span className="mx-2">{qty}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm px-2 py-1"
                        onClick={() => increaseQty(index)}
                      >
                        +
                      </button>
                    </div>

                    <div className="fw-bold mt-2">Subtotal: ₹{subtotal.toFixed(2)}</div>
                  </div>

                  {/* Removed the "Remove" button section */}
                </div>
              );
            })}
          </div>
            <hr />
          {/* Grand Total */}
          <div className="row mt-3">
            <div className="col text-end fw-bold fs-5">
              Grand Total: ₹{grandTotal.toFixed(2)}
            </div>
          </div>

          {/* Payment Section - COD only */}
          <div className="payment-section mt-4 p-3 border rounded bg-light shadow-sm">
            <h5 className="mb-3">Payment Method</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="cod"
                value="cod"
                checked={paymentMethod === "cod"}
                readOnly
              />
              <label className="form-check-label fw-bold" htmlFor="cod">
                Cash on Delivery
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
