import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLocalStorage } from '../../../utils/helper'; // Assuming you have a helper to get the token

const UpdateProduct = () => {
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // Navigate hook for redirecting

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discountPercent: '',
    stock: '',
    file: null
  });
  const [message, setMessage] = useState('');

  // Fetch existing product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = getLocalStorage('access_token');
        if (!token) {
          setMessage('No token found. Please log in.');
          return;
        }

        const response = await fetch(`http://localhost:8080/api/admin/product/${productId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched product data:', data); // Log the fetched data
          setFormData({
            name: data.data.name || '',
            price: data.data.price || '',
            discountPercent: data.data.discountPercent || '',
            stock: data.data.stock || '',
            file: null // No file initially
          });
        } else {
          setMessage('Failed to fetch product data');
        }
      } catch (error) {
        setMessage('Error fetching product data');
        console.error('Error:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('discountPercent', formData.discountPercent);
    data.append('stock', formData.stock);

    if (formData.file) {
      data.append('file', formData.file); // Add file only if selected
    }

    try {
      const token = getLocalStorage('access_token'); // Retrieve token from localStorage
      const response = await fetch(`http://localhost:8080/api/admin/product/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}` // Ensure token is sent in the header
        },
        body: data
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(`Failed to update product: ${errorText || 'Unknown error'}`);
      } else {
        setMessage('Product updated successfully!');
        navigate('/admin/products'); // Redirect after successful update
      }
    } catch (error) {
      setMessage('Error updating product.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Product</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discountPercent" className="form-label">
            Discount Percent
          </label>
          <input
            type="number"
            className="form-control"
            id="discountPercent"
            name="discountPercent"
            value={formData.discountPercent}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Product Image
          </label>
          <input type="file" className="form-control" id="file" name="file" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
