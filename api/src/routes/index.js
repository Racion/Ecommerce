const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category");
const SearchRouter = require("./navbar");
const userRouter = require("./user.js");
const ordersRouter = require("./order.js");
const reviewsRouter = require("./review.js");
const wishlistRouter = require("./wishlist.js");
const checkoutRouter = require("./checkout.js");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/search", SearchRouter );
router.use("/user", userRouter);
router.use("/orders", ordersRouter);
router.use("/review", reviewsRouter);
router.use("/wishlist", wishlistRouter);
router.use("/checkout", checkoutRouter);

module.exports = router;
