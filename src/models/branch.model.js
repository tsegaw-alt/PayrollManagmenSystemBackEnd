module.exports = (sequelize, Sequelize) => {
    const Branch = sequelize.define("branchs", {
      location: {
        type: Sequelize.STRING
      },
    });
  
    return Branch;
  };
  