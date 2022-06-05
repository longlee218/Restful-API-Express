/**
 * @swagger
 * components:
 *  schemas:
 *      Error:
 *          type: object
 *          properties:
 *              error:
 *                  type: boolean
 *              message:
 *                  type: string
 *  securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  responses:
 *      InvalidTokenError:
 *          description: |
 *                  Unauthorized. Click on 'Schema' below to see the possible error response.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 *                  example:
 *                      error: true
 *                      message: Invalid JWT token.
 *      ExpTokenError:
 *          description: |
 *                  Unauthorized. Click on 'Schema' below to see the possible error response.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 *                  example:
 *                      error: true
 *                      message: JWT token has expired.
 */

/**
 * @swagger
 * tags:
 *      -   name: Data
 *      -   name: Authentication
 *      -   name: Profile
 *      -   name: Administrator
 */
