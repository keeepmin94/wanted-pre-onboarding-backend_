const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
          comment: "게시글 내용",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
  }
}

module.exports = Post;
