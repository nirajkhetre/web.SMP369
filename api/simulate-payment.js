export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { username, rank, orderId, paymentId, amount } = req.body;

        const lambdaResponse = await fetch(
            "https://nikaixeqpk.execute-api.us-east-1.amazonaws.com/default/paymentUpdateHandler",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, rank, orderId, paymentId, amount }),
            }
        );

        const text = await lambdaResponse.text();

        // Try to parse JSON to return clean JSON, otherwise return text wrapped in JSON
        let data;
        try {
            data = JSON.parse(text);
            res.status(lambdaResponse.status).json(data);
        } catch (e) {
            res.status(lambdaResponse.status).json({ lambda: text });
        }

    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
