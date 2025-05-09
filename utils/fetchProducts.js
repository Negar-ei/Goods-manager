import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export async function getProducts() {
  const cached = localStorage.getItem("products");
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.products?.length === 100) return parsed; // assuming full data
    } catch (e) {
      console.error("Failed to parse cached products:", e);
    }
  }

  try {
    const { data } = await axios.get(API_URL);
    localStorage.setItem("products", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
