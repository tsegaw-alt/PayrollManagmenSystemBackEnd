module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define("reports", {
      name: {
        type: Sequelize.STRING
      },
      tin:{
        type: Sequelize.STRING
      },
      position:{
        type: Sequelize.STRING
      },
      department:{
        type: Sequelize.STRING
      },
      branch:{
        type: Sequelize.STRING
      },
      month:{
        type: Sequelize.STRING
      },
      year:{
        type: Sequelize.STRING
      },
      hiringDate:{
        type: Sequelize.STRING
      },
      workType:{
        type: Sequelize.STRING
      },
      expectedWorkingDays:{
        type: Sequelize.INTEGER
      },
      actualWorkingDays:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      grossSalary:{
        type: Sequelize.STRING
      },
      dailyWage:{
        type: Sequelize.STRING
      },
      accountNo:{
        type: Sequelize.STRING
      },
      actualWorkInBirr:{
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      differenceInBirr:{
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      overtime:{
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      overtimeWorkingHour:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      overtimePayment:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      positionAllowance:{
        type: Sequelize.STRING
      },
      allowance:{
        type: Sequelize.STRING
      },
      transportAllowance:{
        type: Sequelize.STRING
      },
      taxableTransportAllowance:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      otherAllowance:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      incentive:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      perdiem:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      advanceLoan:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      emPension:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      comPension:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      totalPension:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      totalDeduction:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      totalEarning:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      taxableIncome:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      incomeTax:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      penality:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      netIncome:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      updated:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      
    });
  
    return Report;
  };
  