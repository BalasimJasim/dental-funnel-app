export const handleCorsError = (err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({
      error: "CORS Error",
      message: "Origin not allowed",
      origin: req.headers.origin,
    });
  } else {
    next(err);
  }
};
