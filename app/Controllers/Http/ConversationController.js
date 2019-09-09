'use strict'
const User = use('App/Models/User')
const Conversation = use('App/Models/Conversation')
const Sender = use('App/Models/Seender')

class ConversationController {
    
    async newconversation({auth, request, response}){
        const seender = auth.current.user
        const data = request.only(['to_user_id']);
        
        const conversation = await Conversation.findOrCreate(
            { to_user_id: data.to_user_id },
            
            { from_user_id: seender.id, 
              to_user_id: data.to_user_id,
            }
          )
          
          return response.json({
            status: 'success',
            data: conversation
        })
        
    } 

    async getconversation({auth, response}){

        const me = auth.current.user
        
        const conversations  = await Conversation.query()
        .select('user1.username AS Emisor', 
        'user2.username AS Receptor',
        'user1.avatar AS Emisoravatar',
        'user2.avatar AS Receptoravatar',
        'conversations.id'
        )
        .join('users as user1', 'conversations.from_user_id', '=', 'user1.id')
        .join('users as user2', 'conversations.to_user_id', '=', 'user2.id')
        .where(function () {
          this.orWhere('from_user_id', me.id)
          this.orWhere('to_user_id', me.id )
        })
        .with('seenders')
        .fetch()
        

        return response.json({
            status: 'success',
            data: conversations
      })
    }
    async getconversationbyid({params, response}){
      
      const conversation  = await Conversation.query()
      .select('user1.username AS Emisor', 
        'user2.username AS Receptor',
        'conversations.id'
        )
        .join('users as user1', 'conversations.from_user_id', '=', 'user1.id')
        .join('users as user2', 'conversations.to_user_id', '=', 'user2.id')
        .where('id', params.id)
        .with('seenders')
        return response.json({
          status: 'success',
          data: conversation
        })
    }
    
}

module.exports = ConversationController
