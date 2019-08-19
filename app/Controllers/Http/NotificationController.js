'use strict'
const Notification = use('App/Models/Notification')
const Post = use('App/Models/Post')

class NotificationController {
    async newnotification ({ request, auth, params}) {
        const data = request.only(['notification_type']);

        const user = auth.current.user;
        const post = await Post.query()
                    .where('id', params.id)
                    .with('user')
                    .firstOrFail(); 
        
        const noti = new Notification();
        noti.user_id = user.id; 
        noti.receptor_id = post.user_id
        noti.post_id = post.id;
        noti.notification_type = data.notification_type;
        await noti.save();
        await noti.loadMany(['user','post'])

    }

    async shownotification ({auth , response}){
        
        const user = auth.current.user
        try {
            const noti = await Notification.query()
                .where('receptor_id', user.id)
                .with('user')
                .with('post')
                .orderBy('created_at', 'DESC')
                .fetch()
    
            return response.json({
                status: 'success',
                data: noti
            })
    
    }catch (error) {
        return console.log(error)
    }
}

async shownotificationreader ({auth , response}){
        
    const user = auth.current.user
    try {
        const noti = await Notification.query()
            .where('receptor_id', user.id)
            .where('is_readed', false)
            .fetch()

        return response.json({
            status: 'success',
            data: noti
        })

}catch (error) {
    return console.log(error)
}
}

async putnoti ({ request, auth, response}) {
    const data = request.only(['is_readed']);

    const user = await auth.current.user;
    const userid = user.id
    const noti = await Notification.find(userid.receptor_id)
        
    noti.is_readed = data.is_readed
    
    await noti.save()
    
    return response.status(200).json(noti)
    

}
    

    
}

module.exports = NotificationController
