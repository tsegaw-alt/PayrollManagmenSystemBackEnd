module.exports = (sequelize, Sequelize) => {
    const Overtime = sequelize.define("overtimes", {
        period: {
            type: Sequelize.STRING
        },
        rate: {
            type: Sequelize.STRING
        },
        
    });
  
    return Overtime;
  };
  