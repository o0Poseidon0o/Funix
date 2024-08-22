import React, { useState } from 'react';

const ProductGrid = () => {
  const [products, setProducts] = useState([
  
    // Các sản phẩm ban đầu
]);
  const [newProduct, setNewProduct] = useState('');

  // Hàm để thêm sản phẩm mới vào danh sách
  const addProduct = () => {
    if (newProduct.trim()) {
      setProducts([
        ...products, //...products: Sao chép toàn bộ danh sách sản phẩm hiện tại.
        { id: products.length + 0, name: newProduct.trim() },
      ]);
      setNewProduct(''); // Reset lại ô input
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-4">Product List</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="Enter product name"
          className="border p-2 rounded-md mr-2"
        />
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-200 p-4 rounded-lg shadow-md text-center">
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
