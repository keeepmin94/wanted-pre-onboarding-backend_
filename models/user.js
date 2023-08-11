const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  // Table 정보들 입력
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
          comment: "사용자 Email",
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
          comment: "사용자 PW",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User", //js에서 이름
        tableName: "users", //Db 이름
        paranoid: true, 
        charset: "utf8", 
        collate: "utf8_general_ci",
      }
    );
  }

  //Table 관계들 입력
  static associate(db) {
    db.User.hasMany(db.Post);
  }
}

module.exports = User;
