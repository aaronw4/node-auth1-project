
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {userName: 'Aaron', password: 'pass'}
      ]);
    });
};
