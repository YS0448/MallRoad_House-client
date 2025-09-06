const TableRow = ({ item, baseUrl, onEdit }) => {
  const statusClass =
    item.status === "available"
      ? "bg-success"
      : item.status === "out_of_stock"
      ? "bg-warning text-dark"
      : "bg-secondary";

  return (
    <tr>
      <td>{item.meal_id}</td>
      <td>{item.category_name}</td>
      <td>{item.item_name}</td>
      <td>₹{item.price}</td>
      <td><span className={`badge ${statusClass}`}>{item.status}</span></td>
      <td>
        {item.image_path ? (
          <img
            src={`${baseUrl}${item.image_path}`}
            alt={item.item_name}
            className="rounded shadow-sm"
            width="60"
            height="60"
            style={{ objectFit: "cover" }}
          />
        ) : (
          "No Image"
        )}
      </td>
      <td>
        <button className="btn btn-sm btn-primary shadow-sm" onClick={() => onEdit(item)}>
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
