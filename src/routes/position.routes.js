const controller = require("../controllers/position.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/position/create", controller.createPosition);
  app.get("/api/position/allPosition", controller.allPosition);
  app.delete("/api/position/:id", controller.deletePosition);
  app.get("/api/position/:id", controller.findOnePosition);
  app.put("/api/position/:id", controller.updatePosition);
};
