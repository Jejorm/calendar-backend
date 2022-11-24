/*
    Auth Routes
    host + /api/auth
*/

const { Router } = require( 'express' )
const { check } = require( 'express-validator' )
const { createUser, loginUser, revalidateToken } = require( '../controllers/auth' )
const { validateFields } = require( '../middlewares/validar-campos' )
const { validateJWT } = require( '../middlewares/validar-jwt' )

const router = Router()

router.post(
    '/new',
    [
        check( 'name', 'Name is required' ).not().isEmpty(),
        check( 'email', 'Email is required' ).isEmail(),
        check( 'password', 'Password must be greater than 6' ).isLength( { min: 6 } ),
        validateFields
    ],
    createUser
)

router.post(
    '/',
    [
        check( 'email', 'Email is required' ).isEmail(),
        check( 'password', 'Password must be greater than 6' ).isLength( { min: 6 } ),
        validateFields
    ],
    loginUser )

router.get(
    '/renew',
    validateJWT,
    revalidateToken
)

module.exports = router
