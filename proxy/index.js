const express = require('express');
const app = express();
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');
app.use(cors());

app.get('/', createProxyMiddleware({target:'https://master.spicaengine.com/api', changeOrigin: true}))

app.listen(3000, () => {
    console.log('Proxy listening on port 3000');
})