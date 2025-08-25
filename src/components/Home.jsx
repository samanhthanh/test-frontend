import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  if (onLogout) onLogout(); // cập nhật state ở App
  navigate('/');
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Trang chủ</h2>
      <div className="space-x-4">
        <button onClick={() => navigate('/add-product')} className="bg-green-500 text-white px-3 py-1 rounded">
          Thêm sản phẩm
        </button>
        <button onClick={() => navigate('/products')} className="bg-blue-500 text-white px-3 py-1 rounded">
          Danh sách sản phẩm
        </button>
        <button onClick={() => navigate('/calculator')} className="bg-blue-500 text-white px-3 py-1 rounded">
          Tính tuổi
        </button>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
