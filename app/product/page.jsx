'use client';

import { useEffect, useState, useCallback } from 'react';
// Next/Image causing resolution error. Using standard <img> tag instead.
// import Image from 'next/image'; 
import { PackageOpen, Loader2, X, Plus, CheckCircle } from 'lucide-react'; // Using lucide-react for icons

const CURRENCY_SYMBOL = '₹';

// --- AddProductPopup Component ---
const AddProductPopup = ({ onClose, onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState(''); // Added description state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      // API call to the local Next.js route
      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          // --- FIX APPLIED HERE ---
          // Mapping frontend names to Odoo API names:
          list_price: price, // Frontend 'price' maps to API 'list_price'
          inventory_quantity: stock, // Frontend 'stock' maps to API 'inventory_quantity'
          // ------------------------
          description: description // Including description for API route
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create product in Odoo.');
      }

      setSuccess(true);
      // Wait a moment for visual confirmation, then close and refresh
      setTimeout(() => {
        onProductAdded(data.productId); // Calls parent to close and refresh list
      }, 1500);

    } catch (err) {
      console.error('Creation Error:', err);
      // Check if error message is an object and parse it if possible
      let errorMessage = err.message;
      if (errorMessage.includes('read properties of undefined')) {
         errorMessage = 'Odoo API Call Error: Check required fields or Odoo logs for details.';
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg transition-all transform scale-100 opacity-100">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-indigo-600" />
            Add New Product
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-gray-700">Product Added Successfully!</h3>
            <p className="text-sm text-gray-500 mt-2">Refreshing product list...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                placeholder="e.g., Wireless Mouse"
              />
            </div>

            {/* Price Field */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Price ({CURRENCY_SYMBOL})
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="0.00"
                />
              </div>

              {/* Stock Field */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Stock Quantity
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(parseInt(e.target.value))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="0"
                />
              </div>
            </div>
            
            {/* Description Field (Added this to the modal) */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Sales Description (Optional)
                </label>
                <textarea
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    placeholder="A brief description for sales and website."
                ></textarea>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 p-2 bg-red-50 rounded-lg border border-red-200">
                Error: {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Plus className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Adding Product...' : 'Add Product to Odoo'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
// --- END AddProductPopup Component ---


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Function to fetch product data from the local API route
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      // Use the full relative path construction to ensure URL parsing success.
      const apiPath = new URL('/api/products', window.location.origin).toString();
      const res = await fetch(apiPath);
      const data = await res.json();

      if (!res.ok) {
        // Handle API route errors
        throw new Error(data.error || 'Failed to fetch products from Odoo.');
      }

      const productArray = Array.isArray(data.products) ? data.products : [];
      setProducts(productArray);

    } catch (err) {
      console.error('Fetch Error:', err);
      // More descriptive error if the issue is connection
      let errorMessage = err.message;
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('parse URL')) {
          errorMessage = 'Connection Error: Failed to connect to local API. Check if your server is running and Odoo credentials are correct.';
      }
      setFetchError(errorMessage);
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  }, []);

  // Hook to fetch products on component mount and when list needs refresh
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Callback executed after a product is successfully added in the modal
  const handleProductAdded = () => {
    setShowModal(false); 
    fetchProducts(); // Refresh the product list
  };

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Odoo Product Catalog</h1>
        {/* Button to open the Add New Product modal */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </header>

      {/* Loading State UI */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mr-2" />
          <p className="text-gray-500">Loading products...</p>
        </div>
      )}

      {/* Error State UI */}
      {fetchError && (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg mb-6 shadow-md">
          <p className="font-bold">Data Fetch Error</p>
          <p>{fetchError}</p>
          <p className="text-xs mt-2">
            **Checklist:** Ensure your Odoo server is accessible, credentials (email/API Key) in <code>.env.local</code> are correct, and your Next.js server is running without errors.
          </p>
        </div>
      )}

      {/* Product List or Empty State */}
      {!loading && !fetchError && products.length === 0 ? (
        <div className="text-center p-10 border border-dashed border-gray-300 rounded-xl bg-gray-50">
          <PackageOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">No products found in Odoo.</p>
          <p className="text-sm text-gray-500 mt-1">Click 'Add New Product' to get started.</p>
        </div>
      ) : (
        // Grid layout for product cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Product Image/Placeholder */}
              <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name || 'Product Image'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <PackageOpen className="w-16 h-16 text-gray-400" />
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 truncate mb-2" title={p.name}>
                  {p.name}
                </h3>
                <p className="text-2xl font-bold text-indigo-600 flex items-center mb-3">
                  {CURRENCY_SYMBOL}
                  {p.list_price ? p.list_price.toFixed(2) : (0).toFixed(2)}
                </p>
                
                <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <span className="font-medium text-gray-700">Stock: </span>
                      <span className={`font-semibold ${p.qty_available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {p.qty_available || 0} units
                      </span>
                    </p>
                </div>
              </div>

              {/* Sales Description (Optional) */}
              {p.description && (
                <div className="p-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 line-clamp-2" title={p.description}>
                    {p.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal (Conditionally rendered) */}
      {showModal && (
        <AddProductPopup 
          onClose={() => setShowModal(false)} 
          onProductAdded={handleProductAdded} 
        />
      )}
    </div>
  );
}