import { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState({
    productName: '',
    image: '',
    description: '',
    quantity: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/product', form);
      alert('Product added!');
      setForm({ productName: '', image: '', description: '', quantity: 0 });
      onAdd(); // Refresh list
    } catch (err) {
      console.error('Failed to add product', err);
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Add Product</h3>
      <input name="productName" placeholder="Name" className="border p-1 mr-2 mb-2"
        value={form.productName} onChange={handleChange} />
      <input name="image" placeholder="Image URL" className="border p-1 mr-2 mb-2"
        value={form.image} onChange={handleChange} />
      <input name="description" placeholder="Description" className="border p-1 mr-2 mb-2"
        value={form.description} onChange={handleChange} />
      <input name="quantity" type="number" placeholder="Quantity" className="border p-1 mr-2 mb-2"
        value={form.quantity} onChange={handleChange} />
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
        Add Product
      </button>
      <button
      type='button'
        onClick={() => navigate('/home')}
        className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
      >
        Quay về trang home
      </button>
    </form>
  );
}
