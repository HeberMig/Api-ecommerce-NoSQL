const authorizeRoles = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        res.status(403)
        throw new Error("Acceso denegado, no tienes privilegios");
      }
        next()
      
    }
  }
  
module.exports = {
  authorizeRoles
}