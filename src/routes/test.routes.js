const { authJwt } = require("../middleware");
const controller = require("../controllers/test.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allTestAccess);

  app.get(
    "/api/test/data",
    [authJwt.verifyToken],
    controller.testBoard
  );
};
