const { Topic, Article, User } = require("../models");

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.send({ users });
    })
    .catch(next);
};

exports.getUsersByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      if (user === null) return next({ status: 404, msg: "User not Found" });
      res.status(200).send({ user });
    })
    .catch(next);
};
