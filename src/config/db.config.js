module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "santa_2012",
  DB: "payroll",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
