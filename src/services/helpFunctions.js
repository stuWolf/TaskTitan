export function validateFields(...fields) {
    // Check if all fields are truthy
    const allFieldsFilled = fields.every(field => !!field);
  
    if (!allFieldsFilled) {
      return {
        isFormSubmitted: true,
        errorMessage: "Please fill in missing fields"
      };
    } else {
      return {
        isFormSubmitted: true,
        errorMessage: ''
      };
    }
  }
  