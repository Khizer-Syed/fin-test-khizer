const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

const ctrl = require('./controller');
const PORT = 3002;

const app = express();

app.use(bodyParser.json());

// Setting static files here
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Cors required only during dev as 2 different servers are used for ui and api
app.use(cors());

app.route('/api/user')
  .get(ctrl.getMany)
  .post(ctrl.addOne);

app.route('/api/user/:id')
  .get(ctrl.getOne)
  .patch(ctrl.updateOne)
  .delete(ctrl.removeOne);


//Serving the single page app after its built
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });

app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`);
});