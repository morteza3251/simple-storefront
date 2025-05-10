import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">فروشگاه تاسیسات</h1>
      <ul className="space-y-4">
        {products.map(product => (
          <li key={product.id} className="bg-white p-4 rounded shadow">
            {product.name} - {product.price.toLocaleString()} تومان
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;