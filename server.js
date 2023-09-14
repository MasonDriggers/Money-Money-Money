const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());  // Enable CORS for all routes

app.get('/stock/:symbol', async (req, res) => {
    const symbol = req.params.symbol;

    try {
        // Fetching data from Alpha Vantage using the provided endpoint
        const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
                function: 'TIME_SERIES_DAILY', // this is just an example; adjust based on the data you want
                symbol: symbol,
                apikey: 'GDCUDJMS3MTAJKUG',
            }
        });

        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
