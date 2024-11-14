import { useState } from 'react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discountPercent: '',
    stock: '',
    file: null
  });
  const [message, setMessage] = useState('');

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
    data.append('file', formData.file);

    // Get the token from localStorage (or any other method you're using to store the token)
    const token = localStorage.getItem('access_token'); // Adjust this if your token is stored elsewhere

    try {
      const response = await fetch('http://localhost:8080/api/admin/product', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        },
        body: data
      });

      if (!response.ok) {
        // Handle non-OK responses (e.g., 400, 500 status codes)
        const errorText = await response.text();
        setMessage(`Failed to add product: ${errorText || 'Unknown error'}`);
      } else {
        // Only attempt to parse JSON if the response status is OK
        const result = await response.json();
        setMessage('Product added successfully!');
        setFormData({
          name: '',
          price: '',
          discountPercent: '',
          stock: '',
          file: null
        });
      }
    } catch (error) {
      setMessage('Error adding product.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Product</h2>
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
          <input type="file" className="form-control" id="file" name="file" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
