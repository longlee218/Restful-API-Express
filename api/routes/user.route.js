const express = require("express");
const usersController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {
    validateRegisterUser,
    validateUpdateUser,
    validateLoginUser,
} = require("../middlewares/user.middleware");

const router = express.Router();
const PREFIX = "/user";

/**
 * @swagger
 *  components:
 *      schemas:
 *          UserProfile:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  dob:
 *                      type: string
 *                  address:
 *                      type: string
 *          Token:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 *                  token_type:
 *                      type: string
 *                  expires_in:
 *                      type: number
 *          RequestBodyUserAuth:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              required:
 *                  -   email
 *                  -   password
 *          RequestBodyUserUpdate:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  dob:
 *                      type: string
 *                  address:
 *                      type: string
 *              required:
 *                  -   firstName
 *                  -   lastName
 *                  -   dob
 *                  -   address
 */

/**
 * @swagger
 *  /user/register:
 *  post:
 *      summary: |
 *          Create a new user account. A request body containing the user to be registered
 *          must be sent.
 *      tags: [Authentication]
 *      requestBody:
 *          description: |
 *              An object containing the email and password of the user to be registered.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RequestBodyUserAuth'
 *                  example:
 *                      email: "mike@gmail.com"
 *                      password: password
 *      responses:
 *          '201':
 *              description: User successfully created.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                      example:
 *                          message: User created
 *          '400':
 *              description: Bad request.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                          error: true
 *                          message: |
 *                              Request body incomplete, both email and password are required.
 *          '409':
 *              description: User already exists.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                          error: true
 *                          message: User already exists.
 */
router.post(
    `${PREFIX}/register`,
    validateRegisterUser,
    usersController.regsiter
);

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: |
 *          Login into an existing user account.
 *          A request body containing the user creadentials must be sent.
 *      tags: [Authentication]
 *      requestBody:
 *          description: The credentials of the user to log in.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RequestBodyUserAuth'
 *                  example:
 *                      email: "mike@gmail.com"
 *                      password: password
 *      responses:
 *          '200':
 *              description: Log in successfull.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Token'
 *                      example:
 *                          token: ajsonwebtoken
 *                          toke_type: Bearer
 *                          expries_in: 86400
 *          '400':
 *              description: Bad request.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                          error: true
 *                          message: Request body incomplete, both email and password are required.
 *          '401':
 *              description: Log in failed.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                          error: true
 *                          message: Incorrect email or password
 */
router.post(`${PREFIX}/login`, validateLoginUser, usersController.login);

/**
 * @swagger
 * /user/{email}/profile:
 *  get:
 *      summary: |
 *              Returns an object containing a user's profile information. The path parameter (email) is required
 *              and must be an email that has registered. This route returns additional information if the user is
 *              authenticated. To be authenticated, a valid JWT token must be sent in the header of the request.
 *              To test this using Swagger, click the green 'Authorize' button at the top of this page to enter your
 *              JWT token. A JWT token can be obtained by loggin in.
 *      tags: [Profile]
 *      security:
 *          -   BearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: email
 *              description: Email address of a registered user
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: |
 *                  An object containing email, firstName, lastName, address (authenticated only) and dob (authenticated only)
 *                   properties. An example object for an authenticated request is shown belown. If no profile information has been
 *                  entered for the user via the profile PUT request route, all returned values except email are expected to be null. Click
 *                  on 'Schema' below to see a response example for an unauthenticated request.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserProfile'
 *                      example:
 *                          email: "mike@gmail.com"
 *                          firstName: "Michael"
 *                          lastName: "Jordan"
 *                          dob: "1963-02-17"
 *                          address: 123 Fake Street, Springfield
 *          '401':
 *              $ref: '#/components/responses/ExpTokenError'
 *          '404':
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                          error: true
 *                          message: User not found
 *  put:
 *      summary: |
 *          Updates a user's profile information. The path parameter (email) is required and must be
 *          an email that has been registered. A request body containing the user's profile information
 *          must be sent. This route returns an object containing the user's updated profile information. This route
 *          also requires the user to be authenticated - a valid JWT token must be sent in the header of the request.
 *          To test this route using Swagger, click the green 'Authorize' button at the top of this page to enter your
 *          JWT token. A JWT token can be obtained by loggin in.
 *      tags: [Profile]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: email
 *              description: Email address of a registered user.
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          description: |
 *              An object containing the user's firstName, lastName, dob and address. firstname, lastname and
 *              address must be strings, dob must be a validate string in the past matching the format YYYY-MM-DD. All
 *              key/value pairs are required.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RequestBodyUserUpdate'
 *                  example:
 *                      firstName: Michael
 *                      lastName: Jordan
 *                      dob: 1963-02-17
 *                      address: 123 Fake Street, Springfield
 *      responses:
 *              '200':
 *                  description: |
 *                          An object containing the user's updated profile information. The object
 *                          should contain email, firstName, lastName, dob and address properties. An example object is shown below.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserProfile'
 *                          example:
 *                              email: "mike@gmail.com"
 *                              firstName: Michael
 *                              lastName: Jordan
 *                              dob: 1963-02-17
 *                              address: 123 Fake Steet, Springfield
 *              '400':
 *                  description: |
 *                      Bad request. Click on 'Schema' below to see the possible error responses.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *                          example:
 *                              error: true
 *                              message: "Request body incomplete: firstName, lastName, dob and address are required."
 *              '401':
 *                  description: |
 *                      Unauthorized. Click on 'Schema' below to see the possible error responses.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *                          example:
 *                              error: true
 *                              message: Authorization header ('Bearer token') not found
 *              '403':
 *                  description: |
 *                      Forbidden. Email address associated with JWT token is not the same as email provied in path parameter.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error'
 *                          example:
 *                              error: true
 *                              message: Forbidden
 */
router.get(`${PREFIX}/:email/profile`, authMiddleware, usersController.profile);
router.put(
    `${PREFIX}/:email/profile`,
    authMiddleware,
    validateUpdateUser,
    usersController.update
);

module.exports = router;
