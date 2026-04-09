

const roleMiddleware = (...allowedRoles) => {

  return (req, res, next) => {


    try {



      //  check if user exists (from auth middleware)
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Not authorized"
        });
      }

      //  check if user's role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      

      // allow access
      next();

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  };
};

export { roleMiddleware };