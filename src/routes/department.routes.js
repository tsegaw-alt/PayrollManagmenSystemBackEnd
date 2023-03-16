const controller = require("../controllers/department.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/department/create", controller.createDepartment);
  app.get("/api/department/allDepartment", controller.allDepartment);
  app.delete("/api/department/:id", controller.deleteDepartment);
  app.get("/api/department/:id", controller.findOneDepartment);
  app.put("/api/department/:id", controller.updateDepartment);
};
