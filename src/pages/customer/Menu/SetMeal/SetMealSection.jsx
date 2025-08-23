import React, { useState, useEffect } from "react";
import SetMealItem from "./SetMealItem";
import apiCall from "../../../../api/apiCall";
import {useAuth} from '../../../../context/AuthContext'

const SetMealSection = () => {
    const { user, role } = useAuth();
  const [meals, setMeals] = useState([]);

  const fetchSetMealData = async () => {
    try {
      let response;
      if(role==="guest"){
        response = await apiCall("GET", "/api/getSetMealMenu?user_id=null");
      }else{
        response = await apiCall("GET", `/api/getSetMealMenu?user_id=${user.user_id}`);
      }

      console.log("response:", response.data.data);
      setMeals(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch set meal data:", error);
    }
  };

  useEffect(() => {
    fetchSetMealData();
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div className="col-md-6 mb-4" key={meal.set_meal_id}>
              <SetMealItem
                meal_id={meal.set_meal_id}
                cart_id={meal.cart_id}
                item_name={meal.set_meal_name}
                price={meal.price}
                image_path={meal.image_path}
                categories={meal.categories} // if you included categories in API
                quantity={meal.quantity || 0 }
                description={meal.description || {}}
                status= {meal.status}
              />
            </div>
          ))
        ) : (
          <p className="text-center">No set meals available</p>
        )}
      </div>
    </div>
  );
};

export default SetMealSection;
