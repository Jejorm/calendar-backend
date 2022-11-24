/*
    Events Routes
    host + /api/events
*/

const { Router } = require( 'express' )
const { check } = require( 'express-validator' )
const { validateJWT } = require( '../middlewares/validar-jwt' )
const { getEvents, createEvent, updateEvent, deleteEvent } = require( '../controllers/events' )
const { validateFields } = require( '../middlewares/validar-campos' )
const { isDate } = require( '../helpers/isDate' )

const router = Router()

router.use( validateJWT )

router.get(
    '/',
    getEvents
)

router.post(
    '/',
    [
        check( 'title', 'Title required' ).not().isEmpty(),
        check( 'start', 'Start date required' ).custom( isDate ),
        check( 'end', 'End date required' ).custom( isDate ).custom( ( value, { req } ) => value > req.body.start ).withMessage( 'Invalid dates' ),
        validateFields
    ],
    createEvent
)

router.put(
    '/:id',
    check( 'title', 'Title required' ).not().isEmpty(),
    check( 'start', 'Start date required' ).custom( isDate ),
    check( 'end', 'End date required' ).custom( isDate ).custom( ( value, { req } ) => value > req.body.start ).withMessage( 'Invalid dates' ),
    validateFields,
    updateEvent
)

router.delete(
    '/:id',
    deleteEvent
)

module.exports = router