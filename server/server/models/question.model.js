module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("questions", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      obs: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      }
    });
  
    return Question;
  };
  