'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReplySchema extends Schema {
  up () {
    this.create('replies', (table) => {
      table.increments()
        table.integer('user_id').unsigned().notNullable()
        table.integer('post_id').unsigned().notNullable()
        table.string('reply',300).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('replies')
  }
}

module.exports = ReplySchema
