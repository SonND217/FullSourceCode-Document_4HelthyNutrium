// Phần để đường dẫn API gốc

export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://sleepy-inlet-56101.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "4NutritionHealthy";
