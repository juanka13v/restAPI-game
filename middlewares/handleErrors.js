const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    success: false,
    msg: err.message || "Something went wrong try again later",
  };

  return res
    .status(customError.statusCode)
    .json({ success: customError.success, msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
