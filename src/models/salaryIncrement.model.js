module.exports = (sequelize, Sequelize) => {
    const SalaryIncrement = sequelize.define("salaryIncrements", {
        name: {
            type: Sequelize.STRING
        },
        newSalary: {
            type: Sequelize.STRING
        },
        previousSalary: {
            type: Sequelize.STRING
        },
        branch: {
            type: Sequelize.STRING
        },
        reason: {
            type: Sequelize.STRING
        },
        createdDate: {
            type: Sequelize.STRING
        },
        
    });
  
    return SalaryIncrement;
  };
  