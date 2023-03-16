const db = require("../models");
const config = require("../config/auth.config");
const { payroll, employee, payrollhistory, report } = require("../models");

const Payroll = db.payroll
const Employee = db.employee
const PayrollHistory = db.payrollhistory
const Report = db.report

const Op = db.Sequelize.Op;
const fn = db.Sequelize.fn;
const col = db.Sequelize.col;


exports.createPayroll = (req, res) => {
const branch = req.body.branch;
const month = req.body.month;
const year = req.body.year;
// Validate request
if (!branch|| !month || !year) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Payroll.findAndCountAll({
    where: {
        branch: branch,
        month: month,
        year: year
    }
  })
  .then(result => {
    // console.log(result.count);
    
    if(result.count != 0){
      res.send(result.rows)
    }else{
        Employee.findAll({
            attributes: ['name','tin','position','branch', 'department','hiringDate', 
            'workType','expectedWorkingDays','grossSalary','dailyWage',
            'accountNo','positionAllowance', 'transportAllowance'],
            where: {
                branch: branch,
            },
            order: [
                ['department', 'ASC']
              ],
        }) 
        .then(data => {
          var payrolls = data.map(function(result){
              var payroll = result.toJSON();
              console.log(payroll);
              return payroll;
            });
            for(const element of payrolls) {
              element.branch = branch;
              element.month = month;
              element.year = year;
            }
           
            return Payroll.bulkCreate(payrolls)
      })
      .then(function(files){
          res.send(files)
       });
        
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not operated"
    });
  });

};
exports.getGeneralReport = (req, res) => {
  const month = req.body.month;
  const year = req.body.year;
  // Validate request
  if (!month || !year) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    Report.findAll({
      where: {
          month: month,
          year: year
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving report."
      });
    });
  
};
exports.getOnlyPermanentReport = (req, res) => {
  const month = req.body.month;
  const year = req.body.year;
  // Validate request
  if (!month || !year) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    Report.findAll({
      where: {
          month: month,
          year: year,
          workType: 'Permanent' 
          
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving report."
      });
    });
  
};
exports.getPermanentReport = (req, res) => {
  const month = req.body.month;
  const year = req.body.year;
  // Validate request
  if (!month || !year) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    Report.findAll({
      where: {
          month: month,
          year: year,
          [Op.or]: [
            { workType: 'Permanent' },
            { workType: 'Temporary' },
            { workType: 'Daily-Labor' }
          ]
          
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving report."
      });
    });
};
exports.getPermanentTemporaryReport = (req, res) => {
  const month = req.body.month;
  const year = req.body.year;
  // Validate request
  if (!month || !year) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    Report.findAll({
      where: {
          month: month,
          year: year,
          [Op.or]: [
            { workType: 'Permanent' },
            { workType: 'Temporary' }
          ]
          
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving report."
      });
    });
};
exports.getPayrollHistory = (req, res) => {
  const branch = req.body.branch;
  const month = req.body.month;
  const year = req.body.year;
  // Validate request
  if (!branch|| !month || !year) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    Report.findAll({
      where: {
          branch: branch,
          month: month,
          year: year
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
  
};
exports.getPermanentPayrollHistory = (req, res) => {
  const branch = req.body.branch;
  const month = req.body.month;
  const year = req.body.year;
  // Validate request
  if (!branch|| !month || !year) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    Report.findAll({
      where: {
        [Op.and]: [
          { branch: branch },
          { month: month },
          { year: year }
        ],
        [Op.or]: [
          { workType: 'Permanent' },
          { workType: 'Temporary' }
        ]
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
  
};
exports.getLaborPayrollHistory = (req, res) => {
  const branch = req.body.branch;
  const month = req.body.month;
  const year = req.body.year;
  // Validate request
  if (!branch|| !month || !year) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    Report.findAll({
      where: {
          branch: branch,
          month: month,
          year: year,
          workType: 'Daily-Labor'
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
  
};

exports.createPayrollHistory = (req, res) => {
    Payroll.findAll() 
      .then(data => {
        var payrolls = data.map(function(result){
            var payroll = result.toJSON();
            console.log(payroll);
            return payroll;
          });
          // PayrollHistory.bulkCreate(payrolls)
          Report.bulkCreate(payrolls)
      })
      .then(function(files){
        Payroll.destroy({
          where: {},
          truncate: false
        })
          .then(nums => {
            res.send({ message: `${nums} Payrolls were deleted successfully!` });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all Payrolls."
            });
          });
      }); 
};
exports.allPayroll = (req, res) => {
    Payroll.findAll() 
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      });
};
exports.allLessWorkingDays = (req, res) => {
  Payroll.findAll({
    where:{
      actualWorkingDays: {
        [Op.lt]: 30
      }
    }
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payroll."
      });
    });
};
exports.allPermanentPayroll = (req, res) => {
  Payroll.findAll({
    where: {
      [Op.or]: [
        { workType: 'Permanent' },
        { workType: 'Temporary' }
      ]
    }
  }) 
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving employees."
    });
  });
};
exports.allLaborPayroll = (req, res) => {
  Payroll.findAll({
    where: {
      workType: 'Daily-Labor',
    }
  }) 
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving employees."
    });
  });
};
exports.allPerviousMonthPermanentPayroll = (req, res) => {
  Report.findAll({
    where: {
      branch: req.body.branch,
      month: req.body.month,
      year: req.body.year
    }
  }) 
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving employees."
    });
  });
};

exports.deleteAllPayroll = (req, res) => {
  Payroll.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Payrolls were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all payrolls."
      });
    });
  
};

exports.updatePayroll = (req, res) => {
    const id = req.params.id;
    Payroll.update(req.body, {
        where: { id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Payroll was updated successfully."
        });
    } else {
        res.send({
        message: `Cannot update Payroll with id=${id}. Maybe Payroll was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Error updating Payroll with id=" + id
    });
    });
};
exports.allPayrollHistory = (req, res) => {
  Report.findAll({
    where:{
      workType: 'Permanent'
    }
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
};
exports.sumPermanentPayrollHistory = (req, res) => {
  Report.findAll({
    attributes:[ 
      'branch','month', 'year',
      [fn("SUM", col("actualWorkInBirr")), "totalActualWorkInBirr"],
    ],
    where:{
      workType: 'Permanent',
      branch: req.body.branch
    },
    group: ['branch','month','year']
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
};
exports.totalSumPermanentPayrollHistory = (req, res) => {
  Report.findAll({
    attributes:[ 
      'branch','month', 'year',
      [fn("SUM", col("actualWorkInBirr")), "totalActualWorkInBirr"],
    ],
    where:{
      workType: 'Permanent',
    },
    group: ['branch','month','year']
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
};
exports.sumLaborPayrollHistory = (req, res) => {
  Report.findAll({
    attributes:[ 
      'branch','month', 'year',
      [fn("SUM", col("taxableIncome")), "totalTaxableIncome"],
    ],
    where:{
      workType: 'Daily-Labor',
      branch: req.body.branch
    },
    group: ['branch','month','year']
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
};
exports.totalSumLaborPayrollHistory = (req, res) => {
  Report.findAll({
    attributes:[ 
      'branch','month', 'year',
      [fn("SUM", col("taxableIncome")), "totalTaxableIncome"],
    ],
    where:{
      workType: 'Daily-Labor'
    },
    group: ['branch','month','year']
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
};
exports.sumOfPreviousPayrollHistory = (req, res) => {
  // let current = new Date();
  // current.setMonth(current.getMonth()-1);
  // let previousMonth = current.toLocaleString('default', { month: 'long' });
  let  months = ["Ter", "Yekatit", "Megabit", "Miyaziya", "Genbot", "Sene", "Hamele", "Nehase", "Meskerm", "Tekemt", "Hidar", "Tahisas"];
  let d = new Date();
  let previousMonth=months[d.getMonth()-1]; 
  console.log(previousMonth);
  Report.findAll({
    attributes:[ 
      [fn("SUM", col("actualWorkInBirr")), "totalActualWorkInBirr"],
    ],
    where:{
      month: previousMonth,
      year: req.body.year,
      [Op.or]: [
        { workType: 'Permanent' },
        { workType: 'Temporary' }
      ]
    },
    group: ['month','year']
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};
exports.allLessWorkingDaysPayrollHistory = (req, res) => {
  // let current = new Date();
  // current.setMonth(current.getMonth()-1);
  // let previousMonth = current.toLocaleString('default', { month: 'long' });
  let  months = ["Ter", "Yekatit", "Megabit", "Miyaziya", "Genbot", "Sene", "Hamele", "Nehase", "Meskerm", "Tekemt", "Hidar", "Tahisas"];
  let d = new Date();
  let previousMonth=months[d.getMonth()-1]; 
  console.log(previousMonth);
  Report.findAll({
    
    where:{
      actualWorkingDays: {
        [Op.lt]: 30
      },
      month: previousMonth,
      year: req.body.year,
      [Op.or]: [
        { workType: 'Permanent' },
        { workType: 'Temporary' }
      ]
    }
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payroll."
      });
    });
};
exports.summaryPermanentPayrollHistory = (req, res) => {
  Report.findAll({
    where:{
      workType: 'Permanent',
    },
    order: [
      ['branch', 'DESC']
    ],
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
};
exports.summaryLaborPayrollHistory = (req, res) => {
  Report.findAll({
    where:{
      workType: 'Daily-Labor',
    },
    order: [
      ['branch', 'DESC']
    ],
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
};
exports.allBankTransferPayroll = (req, res) => {
  Payroll.findAll({
    attributes:[ 
     'name','accountNo', 'netIncome'
    ],
    where:{
      workType: 'Permanent'
    },
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};
exports.permanentPayrollSummary = (req, res) => {
  Report.findAll({
    attributes:[
      'department',
      [fn("SUM", col("actualWorkInBirr")), "totalActualWorkInBirr"],
      [fn("SUM", col("overtimePayment")), "totalOvertimePayment"],
      [fn("SUM", col("positionAllowance")), "totalPositionAllowance"],
      [fn("SUM", col("transportAllowance")), "totalTransportAllowance"],
      [fn("SUM", col("perdiem")), "totalPerdiem"],
      [fn("SUM", col("grossSalary")), "totalGrossSalary"],
      [fn("SUM", col("taxableIncome")), "totalTaxableIncome"],
      [fn("SUM", col("incomeTax")), "totalIncomeTax"],
      [fn("SUM", col("emPension")), "totalEmPension"],
      [fn("SUM", col("comPension")), "totalComPension"],
      [fn("SUM", col("totalPension")), "totalPension"],
      [fn("SUM", col("advanceLoan")), "totalAdvanceLoan"],
      [fn("SUM", col("totalDeduction")), "totalDeduction"],
      [fn("SUM", col("netIncome")), "totalNetIncome"],
    ],
    where:{
      month: req.body.month,
      year: req.body.year
    },
    group: ['department']
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
};