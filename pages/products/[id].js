// /pages/products/[id].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query; // This is where the dynamic `id` comes from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const stringifiedProducts = localStorage.getItem("products");
        if (!stringifiedProducts) {
          setError("Products not found in localStorage");
          return;
        }

        const products = JSON.parse(stringifiedProducts)?.products;
        if (!products) {
          setError("No products available");
          return;
        }

        const chosenProduct = products.find((product) => product.id == id);
        if (!chosenProduct) {
          setError("Product not found in localStorage.");
          return;
        }

        setProduct(chosenProduct);
      } catch (err) {
        // Handle any parsing or storage errors
        setError("An error occurred while fetching the product.");
        console.error("Error fetching product from localStorage:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center">{product?.title}</h1>

      <div className="flex flex-col md:flex-row items-center md:justify-center gap-6">
        {product?.thumbnail && (
          <div className="flex-shrink-0">
            <Image
              src={product?.thumbnail}
              alt={product?.title || "Product Image"}
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Price:</span> ${product?.price}
          </p>
          <p>
            <span className="font-semibold">Discount:</span>{" "}
            {product?.discountPercentage}%
          </p>
          <p>
            <span className="font-semibold">Stock:</span> {product?.stock}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {product?.rating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
