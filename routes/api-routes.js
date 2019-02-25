const db = require("../models");

module.exports = function (app) {
    //gets all products from API
    app.get("/api/products", function (req, res) {
        db.Product.findAll({}).then(function (data) {
            res.json(data);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //gets product with specific id from API
    app.get("/api/products/:id", function (req, res) {
        db.Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //posts products via API
    app.post("/api/products", function (req, res) {
        db.Product.create(req.body)
            .then(function (data) {
                res.json("success");
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    //posts a specific product via API
    app.put("/api/products/:id", function (req, res) {
        db.Product.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(function (data) {
            res.json("success");
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //deletes product of a specific ID via API
    app.delete("/api/products/:id", function (req, res) {
        db.Product.destroy(
            {
                where:
                    { id: req.params.id }
            }).then(function (data) {
                res.json("success");
            }).catch(function(error){
                res.json({error: error});
            });
    });
}