import React, { useEffect, useState, useRef, useCallback } from "react";
import CategorySection from "../CategorySection";
import apiCall from "../../../../api/apiCall";
import { useAuth } from "../../../../context/AuthContext";

const DrinksSection = ({ activeTab }) => {
  const { user, role } = useAuth();
  const [menuData, setMenuData] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const observer = useRef();
  const debounceTimeout = useRef(null);

  const fetchDrinksItems = async (pageNum, search = "") => {
    try {
      setLoading(true);
      const endpoint = `api/drinks?page=${pageNum}&search=${encodeURIComponent(
        search
      )}`;
      const res = await apiCall("GET", endpoint);
      const items = res.data || [];

      if (items.length < 20) setHasMore(false);

      setMenuData((prev) => {
        if (pageNum === 1) {
          // New search — reset data
          const grouped = {};
          items.forEach((item) => {
            if (!grouped[item.category_name]) grouped[item.category_name] = [];
            grouped[item.category_name].push(item);
          });
          return grouped;
        }

        // Append for pagination
        const groupedData = { ...prev };
        items.forEach((item) => {
          if (!groupedData[item.category_name])
            groupedData[item.category_name] = [];
          groupedData[item.category_name].push(item);
        });
        return groupedData;
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching drinks menu:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrinksItems(page, searchTerm);
  }, [page, searchTerm]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [searchTerm]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const onSearchChange = (e) => {
    const val = e.target.value;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setSearchTerm(val.trim());
    }, 300);
  };

  return (
    <div className="takeaway-section container">
      <div className="d-flex justify-content-end">
        <label htmlFor="" className="d-flex align-items-center pe-2 fw-bold">
          Search
        </label>
        <input
          type="text"
          placeholder="Search items..."
          className="form-control my-3 shadow"
          onChange={onSearchChange}
          style={{ width: "200px" }}
        />
      </div>

      {Object.keys(menuData).length === 0 && !loading && <p className="text-center">No items found.</p>}

      {Object.keys(menuData).map((category, idx, arr) => (
        <div
          key={category}
          ref={idx === arr.length - 1 ? lastElementRef : null}
        >
          <CategorySection
            category={category}
            items={menuData[category]}
            activeTab={activeTab}
          />
        </div>
      ))}

      {loading && <p className="text-center my-3">Loading more items...</p>}
      {!hasMore && Object.keys(menuData).length !== 0 && <p className="text-center my-3">No more items.</p>}
    </div>
  );
};

export default DrinksSection;
