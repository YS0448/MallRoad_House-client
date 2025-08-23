// import React from "react";

// const DescriptionAccordion = ({ item }) => {
//   return (
//     <div className="accordion mt-3 w-100" id={`desc-accordion-${item.cart_id}`}>
//       <div className="accordion-item">
//         <h2 className="accordion-header" id={`desc-heading-${item.cart_id}`}>
//           <button
//             className="accordion-button collapsed py-2"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target={`#desc-collapse-${item.cart_id}`}
//             aria-expanded="false"
//             aria-controls={`desc-collapse-${item.cart_id}`}
//           >
//             Description
//           </button>
//         </h2>
//         <div
//           id={`desc-collapse-${item.cart_id}`}
//           className="accordion-collapse collapse"
//           aria-labelledby={`desc-heading-${item.cart_id}`}
//           data-bs-parent={`#desc-accordion-${item.cart_id}`}
//         >
//           <div className="accordion-body py-2">
//             {item.description &&
//               (typeof item.description === "string" ? (
//                 <p className="text-muted small mb-2">{item.description}</p>
//               ) : (
//                 Object.entries(item.description).map(([category, selected]) => (
//                   <div key={category} className="mb-2">
//                     <h6 className="fw-bold mb-1">{category}</h6>

//                     {/* Normal items */}
//                     {selected.normal.length > 0 && (
//                       <div className="mb-1">
//                         <span className="badge bg-secondary-subtle text-dark">
//                           Normal
//                         </span>
//                         <ul className="list-unstyled small mb-0 mt-1">
//                           {selected.normal.map((it) => (
//                             <li key={it.id}>
//                               • {it.name}{" "}
//                               {it.extra_charge > 0 && (
//                                 <span className="text-success">
//                                   (+£{it.extra_charge})
//                                 </span>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {/* Extra items */}
//                     {selected.extra.length > 0 && (
//                       <div>
//                         <span className="badge bg-warning-subtle text-dark">
//                           Extra
//                         </span>
//                         <ul className="list-unstyled small mb-0 mt-1">
//                           {selected.extra.map((it) => (
//                             <li key={it.id}>
//                               • {it.name}{" "}
//                               {it.extra_charge > 0 && (
//                                 <span className="text-success">
//                                   (+£{it.extra_charge})
//                                 </span>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 ))
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DescriptionAccordion;
import React, { useId } from "react";
import "../../assets/styles/components/common/DescriptionAccordion.css";

const DescriptionAccordion = ({ description }) => {
  const uniqueId = useId(); // generates unique ID like ":r0:"

  const toTitleCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // ✅ Helper to extract item data (handles both flat & nested id objects)
  const getItemData = (it) => {
    if (it?.id && typeof it.id === "object") {
      return it.id; // nested case { id: { id, name, extra_charge } }
    }
    return it; // flat case { id, name, extra_charge }
  };

  const renderDescription = () => {
    if (!description)
      return <p className="text-muted small">No description available</p>;

    if (typeof description === "string") {
      return <p className="small mb-0">{description}</p>;
    }

    if (typeof description === "object") {
      return Object.entries(description).map(([category, items]) => (
        <div key={category} className="mb-4 border-bottom pb-3">
          <h6 className="mb-1 badge desc_accordion_item_head">
            {toTitleCase(category)}
          </h6>

          {/* Normal items */}
          {items.normal?.length > 0 && (
            <ul className="list-unstyled small mb-0 mt-1">
              {items.normal.map((it, index) => {
                const itemData = getItemData(it);
                return (
                  <li key={itemData.id || index}>
                    • {itemData.name}{" "}
                    {Number(itemData.extra_charge) > 0 && (
                      <span className="badge bg-success ps-2">
                        (+£{itemData.extra_charge})
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {/* Extra items */}
          {items.extra?.length > 0 && (
            <ul className="list-unstyled small mb-0 mt-1">
              {items.extra.map((it, index) => {
                const itemData = getItemData(it);
                return (
                  <li key={itemData.id || index}>
                    • {itemData.name}{" "}
                    {Number(itemData.extra_charge) > 0 && (
                      <span className="badge bg-success ps-2">
                        (+£{itemData.extra_charge})
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ));
    }

    return null;
  };

  return (
    <div
      className="accordion mt-3 w-100 desc_accordion_container"
      id={`desc-accordion-${uniqueId}`}
    >
      <div className="accordion-item">
        <h2 className="accordion-header" id={`desc-heading-${uniqueId}`}>
          <button
            className="accordion-button collapsed py-2 fw-bold rounded-0 shadow-none desc_accordion_btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#desc-collapse-${uniqueId}`}
            aria-expanded="false"
            aria-controls={`desc-collapse-${uniqueId}`}
          >
            Description
          </button>
        </h2>

        <div
          id={`desc-collapse-${uniqueId}`}
          className="accordion-collapse collapse"
          aria-labelledby={`desc-heading-${uniqueId}`}
          data-bs-parent={`#desc-accordion-${uniqueId}`}
        >
          <div className="accordion-body py-2 mt-2">{renderDescription()}</div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionAccordion;
