const express = require('express');
const app = express();
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'static')));

app.use(express.urlencoded({ extended: false }));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
    res.sendFile(path.join(__dirname, 'static', 'style.css'));
    res.sendFile(path.join(__dirname, 'static', 'app.js'));
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server running at http://192.168.1.4:${PORT}/`);
});
