// components/Product.js
import Link from "next/link";
import Image from "next/image";

const IconA = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 14s1.5-2 3-2 3 2 3 2M9 10h.01M15 10h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    />
  </svg>
);

const IconB = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 13h6m-7 3h8M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    />
  </svg>
);

const IconC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 14s1.5 2 3 2 3-2 3-2M9 10h.01M15 10h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    />
  </svg>
);

function getRatingIcon(rating) {
  if (rating < 3) return <IconA />;
  if (rating <= 4) return <IconB />;
  return <IconC />;
}

export default function Product({ product }) {
  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white">
      <Link href={`/products/${product.id}`}>
        <div className="p-4 cursor-pointer">
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-auto object-cover rounded-md"
            width={400}
            height={300}
          />
          <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
          <p className="text-sm text-gray-600 mt-1">Rating: {product.rating}</p>
          <div className="mt-2">{getRatingIcon(product.rating)}</div>
        </div>
      </Link>
    </div>
  );
}
