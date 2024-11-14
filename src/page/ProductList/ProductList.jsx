import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import ProductCard from "../../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [size] = useState(4); // Products per page

  useEffect(() => {
    fetchProducts(page, size);
  }, [page]);

  const fetchProducts = async (page, size) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/product/all",
        {
          params: { page, size },
        }
      );
      console.log(response.data); // Log the full response to check structure
      setProducts(response.data.data.content || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (data) => {
    console.log({ data });
    axios
      .post("http://localhost:8080/api/cart/product", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.productId} className="col-md-3 mb-4">
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="secondary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Trang trước
        </Button>
        <span className="mx-3">Trang {page}</span>
        <Button variant="secondary" onClick={() => setPage(page + 1)}>
          Trang sau
        </Button>
      </div>
    </div>
  );
}

export default ProductList;
