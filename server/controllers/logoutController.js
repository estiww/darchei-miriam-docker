// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const fsPromises = require('fs').promises;
// const path = require('path');

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  console.log("handleLogout");
  const cookies = req.cookies;
  if (!cookies?.accessToken) return res.sendStatus(204); //No content
  const accessToken = cookies.accessToken;
  if (!cookies?.refreshToken) return res.sendStatus(204); //No content
  const refreshToken = cookies.refreshToken;

  // // Is refreshToken in db?
  // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
  // if (!foundUser) {
  //     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  //     return res.sendStatus(204);
  // }

  // // Delete refreshToken in db
  // const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
  // const currentUser = { ...foundUser, refreshToken: '' };
  // usersDB.setUsers([...otherUsers, currentUser]);
  // await fsPromises.writeFile(
  //     path.join(__dirname, '..', 'model', 'users.json'),
  //     JSON.stringify(usersDB.users)
  // );

  //מחיקת העוגיות
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  //מסמל אין עריך להחזיר והעוגיות נמחקו בהצלחה
  res.sendStatus(204);
};

module.exports = { handleLogout };
