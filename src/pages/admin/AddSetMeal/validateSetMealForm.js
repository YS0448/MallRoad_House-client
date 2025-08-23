export const validateSetMealForm = (formData) => {
  if (!formData.mealName?.trim()) 
    return { valid: false, message: "Please enter a meal name" };

  if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
    return { valid: false, message: "Please enter a valid price greater than 0" };

  if (!formData.mealImageFile) 
    return { valid: false, message: "Please upload an image for the meal" };

  if (!Array.isArray(formData.categories) || formData.categories.length === 0)
    return { valid: false, message: "Please add at least one category" };

  for (const cat of formData.categories) {
    if (!cat.cat_name?.trim()) 
      return { valid: false, message: "Each category must have a name" };

    if (cat.choose === undefined || isNaN(cat.choose) || Number(cat.choose) < 0)
      return { valid: false, message: "Choose must be a number 0 or greater" };

    // ✅ Validate each field in this category
    if (!Array.isArray(cat.fields) || cat.fields.length === 0) {
      return { valid: false, message: `Category "${cat.cat_name}" must have at least one item` };
    }

    for (const field of cat.fields) {
      if (!field.itemName?.trim()) 
        return { valid: false, message: `Each item in "${cat.cat_name}" must have a name` };

      if (field.extra_charge === undefined || isNaN(field.extra_charge) || Number(field.extra_charge) < 0)
        return { valid: false, message: `Extra charge in "${cat.cat_name}" must be 0 or greater` };
    }
  }

  return { valid: true };
};
