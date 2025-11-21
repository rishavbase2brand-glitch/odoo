import { odooAuthenticate } from './odooAuth';

// Use environment variable for the base URL
const ODOO_URL = process.env.ODOO_URL;

/**
 * Executes a JSON-RPC call to the Odoo server.
 * @param {string} model - The Odoo model (e.g., 'product.template').
 * @param {string} method - The Odoo method (e.g., 'search_read', 'create').
 * @param {Array<any>} args - The arguments for the method.
 * @param {object} kwargs - Keyword arguments (e.g., { limit: 10 }).
 * @returns {Promise<any>} The result data from Odoo.
 */
export async function callOdoo(model, method, args = [], kwargs = {}) {
    if (!ODOO_URL) {
        throw new Error("ODOO_URL environment variable is not set.");
    }
    
    // 1. Get Authentication Details
    const { uid, session_id } = await odooAuthenticate();
    
    if (!session_id || !uid) {
        // यह error आमतौर पर तब आता है जब odooAuth.js में authentication failed हो जाती है
        throw new Error("Authentication failed: Missing session ID or user ID after successful login attempt. Check ODOO_DB, ODOO_USER, ODOO_PASSWORD.");
    }

    const rpcUrl = `${ODOO_URL}/web/dataset/call_kw/${model}/${method}`; 

    const payload = {
        jsonrpc: '2.0',
        method: 'call',
        params: {
            model: model,
            method: method,
            args: args,
            kwargs: kwargs,
        },
        id: Math.random(),
    };

    try {
        const response = await fetch(rpcUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Send the required session ID for the RPC call
                'Cookie': `session_id=${session_id}`, 
            },
            body: JSON.stringify(payload),
        });

        // Check if the RPC call itself returned an HTTP error
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Odoo RPC call failed with status ${response.status}. Response: ${errorText.substring(0, 200)}...`);
        }

        const data = await response.json();
        
        // Check for Odoo RPC error inside the JSON body
        if (data.error) {
            const errorMessage = data.error.data?.message || data.error.message || "Unknown Odoo RPC error.";
            console.error(`Odoo RPC Error on ${model}.${method}:`, data.error);
            // Specifically check for permission/access errors
            if (errorMessage.includes('Access Denied') || errorMessage.includes('The requested operation cannot be completed due to security restrictions')) {
                 throw new Error(`Odoo Permission Error: ${errorMessage}. The authenticated user (UID: ${uid}) lacks access rights to model '${model}'.`);
            }
            throw new Error(`Odoo RPC Error: ${errorMessage}`);
        }

        return data.result;

    } catch (error) {
        console.error("Error during Odoo RPC call:", error.message);
        throw error;
    }
}