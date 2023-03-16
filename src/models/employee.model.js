module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees", {
      name: {
        type: Sequelize.STRING
      },
      phone:{
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING
      },
      city:{
        type: Sequelize.STRING
      },
      tin:{
        type: Sequelize.STRING
      },
      houseNo:{
        type: Sequelize.STRING
      },
      birthDay:{
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
      hiringDate:{
        type: Sequelize.STRING
      },
      workType:{
        type: Sequelize.STRING
      },
      expectedWorkingDays:{
        type: Sequelize.INTEGER
      },
      grossSalary:{
        type: Sequelize.STRING
      },
      positionAllowance:{
        type: Sequelize.STRING
      },
      transportAllowance:{
        type: Sequelize.STRING
      },
      dailyWage:{
        type: Sequelize.STRING
      },
      accountNo:{
        type: Sequelize.STRING
      }
      
    });
  
    return Employee;
  };
  