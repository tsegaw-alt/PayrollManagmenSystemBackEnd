module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("companys", {
        Name: {
            type: Sequelize.STRING
        },
        Kelele: {
            type: Sequelize.STRING
        },
        K_Ketema: {
            type: Sequelize.STRING
        },
        Wereda: {
            type: Sequelize.STRING
        },
        Kebele: {
            type: Sequelize.STRING
        },
        HouseNo: {
            type: Sequelize.STRING
        },
        TIN: {
            type: Sequelize.STRING
        },
        Phone: {
            type: Sequelize.STRING
        },
        AccountNo: {
            type: Sequelize.STRING
        },
        FaxNo: {
            type: Sequelize.STRING
        }
        
    });
  
    return Company;
  };
  