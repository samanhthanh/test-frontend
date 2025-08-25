import { useState } from "react";
import axios from '../../axiosConfig';

export default function AgeCalculator() {
  const [age, setAge] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await axios.get("/guest/calculator", {
        params: { age: age || null, yearOfBirth: yearOfBirth || null },
      });
      setResult(response.data);
    } catch (err) {
      setError("Có lỗi xảy ra khi gọi API!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-center">Tính tuổi / năm sinh</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nhập tuổi:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Ví dụ: 25"
              disabled={yearOfBirth !== ""}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Nhập năm sinh:</label>
            <input
              type="number"
              value={yearOfBirth}
              onChange={(e) => setYearOfBirth(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Ví dụ: 2000"
              disabled={age !== ""}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg"
          >
            Tính kết quả
          </button>
        </form>

        {result && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
            <strong>Kết quả:</strong> {JSON.stringify(result)}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
