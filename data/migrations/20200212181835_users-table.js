
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('users', table => {
            table.increments();
            table.string('userName', 48).unique().notNullable();
            table.string('password', 48).notNullable();
        })
  )
};

exports.down = function(knex) {
  return (
      knex.schema
        .dropTableIfExists('users')
  )
};
