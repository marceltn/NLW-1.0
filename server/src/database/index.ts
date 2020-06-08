import knex from 'knex'
const connection = require('./knexfile')[process.env.NODE_ENV || 'development']

export default knex(connection)
