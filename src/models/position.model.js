module.exports = (sequelize, Sequelize) => {
    const Position = sequelize.define("positions", {
        designation: {
        type: Sequelize.STRING
      },
    });
  
    return Position;
  };
  