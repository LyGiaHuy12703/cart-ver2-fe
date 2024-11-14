import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getLocalStorage } from '../../../utils/helper';
import toast from 'react-hot-toast';

function ProductListAdmin() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [size] = useState(4); // Products per page

  useEffect(() => {
    fetchProducts(page, size);
  }, [page]);

  const fetchProducts = async (page, size) => {
    try {
      const response = await axios.get('http://localhost:8080/api/product/all', {
        params: { page, size }
      });
      console.log(response.data); // Log the full response to check structure
      setProducts(response.data.data.content || []); // Ensure it's an array
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = getLocalStorage('access_token');
      const response = await axios.delete(`http://localhost:8080/api/admin/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data); // Shows success message
      // Fetch updated product list after deletion
      fetchProducts(page, size);
    } catch (error) {
      console.log(error);
      
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.productId} className="col-md-3 mb-4">
            <ProductCard product={product} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
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

const ProductCard = ({ product, handleDelete }) => (
  <Card className="h-100 shadow-sm">
    <Card.Img
      variant="top"
      src={product.photo} // Correct field name
      alt={product.name}
      style={{ height: '200px', objectFit: 'cover', padding: '10px' }}
    />
    <Card.Body className="d-flex flex-column">
      <Card.Title style={{ fontSize: '16px' }}>{product.name}</Card.Title>
      <Card.Text className="text-muted" style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {product.price.toLocaleString()} đ
      </Card.Text>
      <br />
      <Link to={`/admin/products/${product.productId}`}>
        <Button variant="info" className="mt-auto text-white">
          Chỉnh sửa
        </Button>
      </Link>
      <Button variant="danger" className="mt-2" onClick={() => handleDelete(product.productId)}>
        Xóa
      </Button>
    </Card.Body>
  </Card>
);

export default ProductListAdmin;
