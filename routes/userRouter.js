const router = require("express").Router();
const { getUsers, getUsersByUsername } = require("../controllers/users")
router
  .route("/")
  .get(getUsers)


  router
  .route("/:username")
  .get(getUsersByUsername)


module.exports = router;
