const router = require("express").Router();
const topicsRouter = require("./topicsRouter");

router.get("/", (req, res, next) => {
  res.send({ msg: "Welcome to NORTHCODERS NEWS!!" });
});

router.use("/topics", topicsRouter);

router.use('/*', (req, res, next) => {
  next({ status: 404, msg: 'Page not found' })
})


module.exports = router;