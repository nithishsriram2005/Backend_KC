exports.updateProfile = (req, res, db) => {
  const { userId, username, name } = req.body;

  if (!userId) {
    return res.json({
      status: false,
      message: "UserId missing"
    });
  }

  db.query(
    "UPDATE users SET username=?, name=? WHERE id=?",
    [username, name, userId],
    (err) => {
      if (err) {
        return res.json({
          status: false,
          message: "Update failed"
        });
      }

      return res.json({
        status: true,
        message: "Profile updated"
      });
    }
  );
};
