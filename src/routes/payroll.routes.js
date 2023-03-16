const controller = require("../controllers/payroll.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/payroll/create", controller.createPayroll);
  app.post("/api/payroll/getPayrollHistory", controller.getPayrollHistory);
  app.post("/api/payroll/getPermanentPayrollHistory", controller.getPermanentPayrollHistory);
  app.post("/api/payroll/getLaborPayrollHistory", controller.getLaborPayrollHistory);
  app.get("/api/payroll/allPayroll", controller.allPayroll);
  app.get("/api/payroll/allPayrollHistory", controller.allPayrollHistory);
  app.get("/api/payroll/allLessWorkingDays", controller.allLessWorkingDays);
  app.get("/api/payroll/allPermanentPayroll", controller.allPermanentPayroll);
  app.get("/api/payroll/allLaborPayroll", controller.allLaborPayroll);
  app.get("/api/payroll/allPerviousMonthPermanentPayroll", controller.allPerviousMonthPermanentPayroll);
  app.get("/api/payroll/totalSumPermanentPayrollHistory", controller.totalSumPermanentPayrollHistory);
  app.get("/api/payroll/totalSumLaborPayrollHistory",controller.totalSumLaborPayrollHistory)
  app.get("/api/payroll/summaryPermanentPayrollHistory",controller.summaryPermanentPayrollHistory)
  app.get("/api/payroll/summaryLaborPayrollHistory",controller.summaryLaborPayrollHistory)
  app.get("/api/payroll/allBankTransferPayroll",controller.allBankTransferPayroll)
  app.post("/api/payroll/permanentPayrollSummary",controller.permanentPayrollSummary)
  app.post("/api/payroll/sumPermanentPayrollHistory",controller.sumPermanentPayrollHistory)
  app.post("/api/payroll/sumLaborPayrollHistory",controller.sumLaborPayrollHistory)
  app.post("/api/payroll/createPayrollHistory", controller.createPayrollHistory);
  app.post("/api/payroll/allLessWorkingDaysPayrollHistory", controller.allLessWorkingDaysPayrollHistory);
  app.post("/api/payroll/sumOfPreviousPayrollHistory", controller.sumOfPreviousPayrollHistory);
  app.delete("/api/payroll", controller.deleteAllPayroll);
//   app.get("/api/department/:id", controller.findOneDepartment);
  app.put("/api/payroll/:id", controller.updatePayroll);
  app.post("/api/payroll/getGeneralReport", controller.getGeneralReport);
  app.post("/api/payroll/getPermanentReport", controller.getPermanentReport);
  app.post("/api/payroll/getOnlyPermanentReport", controller.getOnlyPermanentReport);
  app.post("/api/payroll/getPermanentTemporaryReport", controller.getPermanentTemporaryReport);
};
