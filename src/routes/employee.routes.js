const controller = require("../controllers/employee.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/employee/create", controller.createEmployee);
  app.get("/api/employee/allEmployee", controller.allEmployee);
  app.post("/api/employee/allNewEmployee", controller.allNewEmployee);
  app.post("/api/employee/allResignedEmployee", controller.allResignedEmployee);
  app.post("/api/employee/allSalaryIncrement", controller.allSalaryIncrement);
  app.get("/api/employee/findAllSalaryIncrement", controller.findAllSalaryIncrement);
  app.get("/api/employee/findAllResignedEmployee", controller.findAllResignedEmployee);
  app.post("/api/employee/createSalaryIncrement", controller.createSalaryIncrement);
  app.delete("/api/employees/:id", controller.deleteEmployee);
  app.delete("/api/employees/resignedEmployee/:id/:data", controller.createResignedEmployee);
  app.get("/api/employees/:id", controller.findOneEmployee);
  app.put("/api/employees/:id", controller.updateEmployee);
};
