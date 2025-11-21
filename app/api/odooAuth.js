// --- Odoo Authentication Handler (odooAuth.js) ---

// Module-level caching for the session
let odooSessionCache = {
    session_id: null,
    uid: null,
    last_login_attempt: 0,
    // Session remains valid for 30 minutes (1,800,000 milliseconds)
    login_valid_duration_ms: 1800000 
};

// Use environment variables
const ODOO_URL = process.env.ODOO_URL;
const ODOO_DB = process.env.ODOO_DB;
const ODOO_USER = process.env.ODOO_USER;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD; // This holds the API Key

/**
 * Handles Odoo authentication using the more reliable JSON-RPC 'authenticate' method, 
 * caches the session ID, and ensures it's refreshed if expired.
 * @returns {Promise<{uid: number, session_id: string}>} The user ID and session ID.
 */
export async function odooAuthenticate() {
    const now = Date.now();
    
    // 1. Check if the cached session is still valid
    if (odooSessionCache.session_id && (now - odooSessionCache.last_login_attempt < odooSessionCache.login_valid_duration_ms)) {
        console.log("Odoo authenticated successfully (using cached session).");
        return { 
            uid: odooSessionCache.uid, 
            session_id: odooSessionCache.session_id 
        };
    }

    // 2. Attempt a new authentication using the 'authenticate' method
    console.log("Attempting Odoo authentication...");

    if (!ODOO_URL || !ODOO_DB || !ODOO_USER || !ODOO_PASSWORD) {
        throw new Error("Missing Odoo configuration: Ensure ODOO_URL, ODOO_DB, ODOO_USER, and ODOO_PASSWORD (API Key) are set.");
    }
    
    // Using the generic /jsonrpc endpoint
    const authUrl = `${ODOO_URL}/jsonrpc`; 
    
    const payload = {
        jsonrpc: '2.0',
        method: 'call',
        params: {
            service: 'common', 
            method: 'authenticate',   
            args: [
                ODOO_DB, 
                ODOO_USER, 
                ODOO_PASSWORD,
                {} // Context argument, required by 'authenticate'
            ],
        },
        id: Math.random(),
    };

    try {
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload), 
        });

        // 3. Check for non-JSON response (i.e., HTML redirect)
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await response.text();
            throw new Error(`Expected JSON but received ${contentType || 'Unknown'}. Response text starts with: ${textResponse.substring(0, 50)}...`);
        }
        
        const data = await response.json();

        // 4. Handle Odoo API error block (if login fails)
        if (data.error) {
            const errorMessage = data.error.data?.message || data.error.message || "Unknown Odoo authentication error.";
            console.error("Authentication failed:", data.error);
            // Specifically look for 'Access Denied' or 'Invalid Login' type errors
            if (errorMessage.includes('Access Denied') || errorMessage.includes('Invalid login')) {
                 throw new Error(`Odoo Authentication Failed: Access Denied. Double-check ODOO_USER and ODOO_PASSWORD (API Key).`);
            }
            throw new Error(`Odoo Authentication Failed: ${errorMessage}`);
        }

        const result = data.result;
        let session_id = null;
        let uid = null;

        // 5. Check for successful result from 'authenticate'
        if (result && typeof result === 'number') {
            // The 'authenticate' method returns the UID directly as the result.
            uid = result;
            
            // --- Strategy: Extract session_id from 'set-cookie' header ---
            // The 'set-cookie' header can contain multiple cookies separated by commas.
            // We need to parse all 'set-cookie' headers.
            const sessionCookieHeader = response.headers.get('set-cookie');
            if (sessionCookieHeader) {
                // The 'set-cookie' header might contain multiple cookies. Split and find session_id.
                const cookies = sessionCookieHeader.split(','); 
                for (const cookie of cookies) {
                    const sessionMatch = cookie.match(/session_id=([^;]+)/);
                    if (sessionMatch) {
                        session_id = sessionMatch[1].trim();
                        break; 
                    }
                }
            }
        }
        
        // 6. Final check for success
        if (session_id && uid) {
            // Success: update the cache
            odooSessionCache.session_id = session_id;
            odooSessionCache.uid = uid;
            odooSessionCache.last_login_attempt = now;
            console.log(`Odoo authenticated successfully. User ID: ${uid}. Session ID found: true`);
            
            return { 
                uid: uid, 
                session_id: session_id 
            };
        }
        
        // 7. Fallback for failure to retrieve session info
        throw new Error("Odoo login succeeded but failed to retrieve session_id or uid.");

    } catch (error) {
        console.error("Authentication network/process error:", error.message);
        // Ensure network errors are clearly identified
        if (error.message.includes('Odoo Authentication Failed')) {
             throw error; 
        }
        throw new Error(`Connection Error: Check ODOO_URL (${ODOO_URL}) or network access: ${error.message}`);
    }
}