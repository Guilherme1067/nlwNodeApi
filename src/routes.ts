import express from 'express';

import db from '../src/database/connections'
import convertHoursToMinute from './Utils/convertHoursToMinutes';

const routes = express.Router();

interface scheduleItem {
    week_day: number,
    from: string,
    to: string
}

routes.post('/classes', async (request, response) => {
 const {
     name,
     avatar,
     whatsapp,
     bio,
     subject,
     cost,
     schedule
 } = request.body;

 const trx = await db.transaction();

 try {
  const insertUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
    })

    const user_id = insertUsersIds[0];

    const insertClassesId = await trx('classes').insert({
        subject,
        cost,
        user_id
    })
   
    const class_id = insertClassesId[0];

    const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
        return {
            class_id,
            week_day: scheduleItem.week_day,
            from: convertHoursToMinute(scheduleItem.from),
            to: convertHoursToMinute(scheduleItem.to),
        }
    })


     await trx('class_schedule').insert(classSchedule)

     await trx.commit();
     
 return response.status(201).send();

 }catch (err) {
     await trx.rollback();

     return response.status(400).json({
        error: 'Unexpected error while creating new class'
    })
 }
 

})

export default routes;