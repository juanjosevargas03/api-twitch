const express = require('express');
const cors = require('cors');
const app = express();
require('./db/mongoConnection');


app.set('port', process.env.port || 4000);

app.use(express.json());
app.use(cors());

app.use(require('./routes'));

app.listen(app.get('port') ,() => {
    console.log('Server on port ',app.get('port'));
})

