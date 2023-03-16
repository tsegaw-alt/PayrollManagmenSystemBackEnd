const controller = require("../controllers/company.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/company/getCompany", controller.getCompany);
  app.put("/api/company/:id", controller.updateCompany);
};
