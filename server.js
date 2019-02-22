const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8000;

// Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/about", function(req, res) {
//     res.json({ message: "About information..."});
// });

app.use(express.static(path.join(__dirname, 'app/public')));
console.log(__dirname);

// Routes
// -----------------

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function() {
    console.log("Listening on Port: " + PORT);
});


