const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    const sortedUsers = users.sort((a, b) => {
      const { order } = request.query;
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) return response.send(404, { error: 'User not found.' });

    response.send(200, user);
  },
};
