const controller = require("../controllers/overtime.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/overtime/create", controller.createOvertime);
  app.get("/api/overtime/allOvertime", controller.allOvertime);
  app.delete("/api/overtime/:id", controller.deleteOvertime);
  app.get("/api/overtime/:id", controller.findOneOvertime);
  app.put("/api/overtime/:id", controller.updateOvertime);
};
