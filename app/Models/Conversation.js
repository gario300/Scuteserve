'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Conversation extends Model {
    users(){
      return this.belongsToMany('App/Models/User', 'userone', 'usertwo')
      .pivotTable('conversations')
      } 
}

module.exports = Conversation
