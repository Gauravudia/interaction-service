const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use('/interactions', routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Interaction service running on port ${PORT}`);
});
