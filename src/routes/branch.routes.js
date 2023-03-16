const controller = require("../controllers/branch.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/branch/create", controller.createBranch);
  app.get("/api/branch/allBranch", controller.allBranch);
  app.delete("/api/branch/:id", controller.deleteBranch);
  app.get("/api/branch/:id", controller.findOneBranch);
  app.put("/api/branch/:id", controller.updateBranch);
};
