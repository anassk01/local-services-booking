function adminOnly(request, response, next) {
  if (!request.user) {
    return response.status(401).json({ message: "authentication required" });
  }
  if (request.user.role !== "admin") {
    return response.status(403).json({ message: "Access forbidden" });
  }
  return next();
}

module.exports = adminOnly;
