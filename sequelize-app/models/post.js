'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    object: DataTypes.STRING,
    article: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    like: DataTypes.STRING,
    dislike: DataTypes.STRING,
    userliked: DataTypes.STRING,
    userdislike: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};

// Posts.associate = (models) => {
//   Posts.hasMany(models.Comments, {
//     onDelete: "cascade",
//   });

//   Posts.hasMany(models.Likes, {
//     onDelete: "cascade",
//   });
// };
