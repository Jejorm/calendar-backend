const { request, response } = require( 'express' )
const Event = require( '../models/Event' )

const getEvents = async ( req = request, res = response ) => {

    const events = await Event.find().populate( 'user', 'name' )

    return res.json( {
        ok: true,
        events
    } )
}

const createEvent = async ( req = request, res = response ) => {

    console.log( req )

    const event = new Event( req.body )

    try {

        event.user = req.uid

        const savedEvent = await event.save()

        res.json( {
            ok: true,
            event: savedEvent
        } )

    } catch ( error ) {

        console.log( error )

        res.status( 500 ).json( {
            ok: false,
            msg: 'Please contact the admin'
        } )
    }
}

const updateEvent = async ( req = request, res = response ) => {

    const eventId = req.params.id
    const { uid } = req

    try {

        const event = await Event.findById( eventId )

        if ( !event ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'Id does not exist'
            } )
        }

        if ( event.user.toString() !== uid ) {

            return res.status( 401 ).json( {
                ok: false,
                msg: 'User cannot edit this event'
            } )
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } )

        res.json( {
            ok: true,
            updatedEvent
        } )

    } catch ( error ) {

        console.log( error )

        res.status( 500 ).json( {
            ok: false,
            msg: 'Please contact the admin'
        } )
    }
}

const deleteEvent = async ( req = request, res = response ) => {

    const eventId = req.params.id
    const { uid } = req

    try {
        const event = await Event.findById( eventId )

        if ( !event ) {
            return res.status( 404 ).json( {
                ok: false,
                msg: 'Id does not exist'
            } )
        }

        if ( event.user.toString() !== uid ) {

            return res.status( 401 ).json( {
                ok: false,
                msg: 'User cannot delete this event'
            } )
        }

        await Event.findByIdAndDelete( eventId )

        return res.status( 200 ).json( {
            ok: true,
            msg: 'Event deleted successfully!'
        } )

    } catch ( error ) {

        console.log( error )

        res.status( 500 ).json( {
            ok: false,
            msg: 'Please contact the admin'
        } )
    }

}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}