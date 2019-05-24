const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('hello world'));

app.listen(3000, () => {
    console.log("App Running On Port 3000");
});