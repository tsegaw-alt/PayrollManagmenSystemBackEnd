module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("departments", {
        department: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        
    });
  
    return Department;
  };
  