let users = require('../mocks/users');

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

  createUser(request, response) {
    const { body } = request;
    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(newUser);

    response.send(200, newUser);
  },

  updateUser(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const userExists = users.find((user) => user.id === Number(id));

    if (!userExists) return response.send(404, { error: 'User not found.' });

    users = users.map((user) =>
      user.id === Number(id) ? { ...user, name } : user
    );

    response.send(200, { id, name });
  },

  deleteUser(request, response) {
    const { id } = request.params;

    const userExists = users.find((user) => user.id === Number(id));

    if (!userExists) return response.send(404, { error: 'User not found.' });

    users = users.filter((user) => user.id !== Number(id));

    response.send(200, userExists);
  },
};
