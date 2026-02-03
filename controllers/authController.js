exports.login = (req, res, db) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      status: false,
      message: "Missing fields",
    });
  }

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) {
        return res.json({ status: false, message: "DB error" });
      }

      if (result.length > 0) {
        const user = result[0];
        console.log("User logged in:", user);
        return res.json({
          status: true,
          userId: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
        });
      }

      return res.json({
        status: false,
        message: "Invalid credentials",
      });
    }
  );
};
