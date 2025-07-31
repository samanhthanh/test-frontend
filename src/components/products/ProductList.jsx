import { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ productName: '', minPrice: '', maxPrice: '' });

  const fetchProducts = async () => {
    const params = {
      ...filters,
      page,
      size: 10,
    };
    try {
      console.log('API URL productList:', process.env.REACT_APP_API_URL);
      const res = await axios.get('/api/public/products', { params });
      setProducts(res.data.content);
      setTotalPages(res.data.totalPages);
      console.log('Fetching product list with params:', params);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = () => {
    setPage(0); // Reset to first page
    fetchProducts();
  };

  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Product List</h2>
      <div className="mb-4">
        <input name="productName" placeholder="Product Name" className="border p-1 mr-2"
          value={filters.productName} onChange={handleFilterChange} />
        <input name="minPrice" type="number" placeholder="Min Price" className="border p-1 mr-2"
          value={filters.minPrice} onChange={handleFilterChange} />
        <input name="maxPrice" type="number" placeholder="Max Price" className="border p-1 mr-2"
          value={filters.maxPrice} onChange={handleFilterChange} />
        <button onClick={handleFilterSubmit} className="bg-blue-500 text-white px-3 py-1 rounded">
          Search
        </button>
        <button
          onClick={() => navigate('/home')}
          className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
        >
          Quay về trang home
        </button>
      </div>

      <table className="border w-full mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="text-center border-t">
              <td>{p.id}</td>
              <td>{p.productName}</td>
              <td>
                {p.image ? (
                  <img src={p.image} alt={p.productName} className="h-10 mx-auto" />
                ) : (
                  'No image'
                )}
              </td>

              <td>{p.price}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}
          className="px-2 py-1 bg-gray-300 rounded">Prev</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}
          className="px-2 py-1 bg-gray-300 rounded">Next</button>
      </div>

      <ProductForm onAdd={fetchProducts} />
    </div>
  );
}
