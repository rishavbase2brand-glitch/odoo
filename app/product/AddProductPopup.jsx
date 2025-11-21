'use client';

import { useState } from 'react';
import { X, Save, DollarSign, Package, Tag, Loader2, AlertTriangle } from 'lucide-react';

export default function AddProductPopup({ onClose, onProductAdded }) {
    const [name, setName] = useState('');
    const [list_price, setListPrice] = useState('');
    const [qty_available, setQtyAvailable] = useState('');
    const [description_sale, setDescriptionSale] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Simple validation
        if (!name || !list_price) {
            setError('Product Name and Price are mandatory fields.');
            setLoading(false);
            return;
        }

        const newProduct = {
            name: name,
            // Convert strings to appropriate types for Odoo
            list_price: parseFloat(list_price) || 0.0,
            // Odoo does not take qty_available on creation directly, but we pass it anyway.
            // The API route handles stock updates via inventory moves later if needed, 
            // but for product creation, we only need name, price, and description.
            // Sending it here is fine as the backend ignores it for the 'create' method.
            qty_available: parseInt(qty_available) || 0, 
            description_sale: description_sale,
            sale_ok: true, 
            // Default IDs for UoM and Category, assumed to be ID 1 (default) in Odoo
            uom_id: 1, 
            categ_id: 1, 
        };

        try {
            // --- FIX: Call the unified /api/products/add route ---
            const response = await fetch('/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            const data = await response.json();

            if (!response.ok) {
                // If the error message is too long, show a concise version
                const details = data.error.length > 100 ? data.error.substring(0, 100) + '...' : data.error;
                throw new Error(details || 'Failed to create product in Odoo.');
            }

            setSuccess(true);
            
            // Wait a moment and then close the modal and refresh the list
            setTimeout(() => {
                onProductAdded();
            }, 1500);

        } catch (err) {
            console.error('Create Product Error:', err);
            setError(err.message || 'An unknown error occurred while saving.');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Modal Backdrop
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Tag className="w-6 h-6 mr-2 text-indigo-600" />
                        Add New Product to Odoo
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                        disabled={loading}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body / Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    {/* Status Messages */}
                    {error && (
                        <div className="flex items-start p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                            <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg">
                            <p className="text-sm font-medium">Product created successfully!</p>
                        </div>
                    )}

                    {/* Form Fields */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                            placeholder="e.g., Laptop Pro 15"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">List Price ({'₹'}) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <DollarSign className="w-5 h-5 text-gray-400" />
                                </span>
                                <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={list_price}
                                    onChange={(e) => setListPrice(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                    placeholder="999.00"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Package className="w-5 h-5 text-gray-400" />
                                </span>
                                <input
                                    id="stock"
                                    type="number"
                                    value={qty_available}
                                    onChange={(e) => setQtyAvailable(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Sales Description</label>
                        <textarea
                            id="description"
                            rows="3"
                            value={description_sale}
                            onChange={(e) => setDescriptionSale(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                            placeholder="Short description for sales orders..."
                        ></textarea>
                    </div>

                    {/* Modal Footer / Submit Button */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || success}
                            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition duration-150 ease-in-out 
                                ${loading || success 
                                    ? 'bg-indigo-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : success ? (
                                <span>Done!</span>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    <span>Save Product</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}