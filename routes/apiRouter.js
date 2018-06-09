const router = require("express").Router();
const topicRouter = require("./topicsRouter");
const articleRouter = require ("./articlesRouter")
const userRouter = require ("./userRouter")
const commentRouter = require("./commentsRouter")

router.get("/", (req, res, next) => {
  res.send({ msg: "Welcome to NORTHCODERS NEWS!!" });
});

router.use("/topics", topicRouter);
router.use("/articles", articleRouter)
router.use("/users", userRouter)
router.use("/comments" , commentRouter)

router.use('/*', (req, res, next) => {
  next({ status: 404, msg: 'Page not found' })
})


module.exports = router;