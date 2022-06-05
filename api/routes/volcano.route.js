const express = require("express");
const volcanoesController = require("../controllers/volcano.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
const PREFIX = "/volcanoes";

/**
 * @swagger
 *  components:
 *      schemas:
 *          Volcano:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                  name:
 *                      type: string
 *                  country:
 *                      type: string
 *                  region:
 *                      type: string
 *                  subregion:
 *                      type: string
 *                  last_eruption:
 *                      type: string
 *                  summit:
 *                      type: number
 *                  elevation:
 *                      type: number
 *                  latitude:
 *                      type: number
 *                  longitude:
 *                       type: number
 *                  population_5km:
 *                       type: number
 *                  population_10km:
 *                       type: number
 *                  population_30km:
 *                       type: number
 *                  population_100km:
 *                       type: number
 */

/**
 * @swagger
 *  /volcanoes:
 *  get:
 *      summary: |
 *              Returns a list of volcanoes that are associated with the queried country.
 *              The country query parameter is required. The list can optionally be filtered by using
 *              the populatedWithin query parameter. This will return a filtered list of volcanoes
 *              that have at least one person living within the provided radius.
 *      tags: [Data]
 *      parameters:
 *          -   in: query
 *              name: country
 *              description: Name of country
 *              required: true
 *              schema:
 *                  type: string
 *          -   in: query
 *              name: populatedWithin
 *              description: Distance within X km of a volcano
 *              schema:
 *                  type: string
 *                  enum: [5km, 10km, 30km, 100km]
 *      responses:
 *          '200':
 *              description: |
 *                  An array of objects containing id, name. country, region and subregion
 *                  properties. An example of one object in the array is shown below.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Volcano'
 *                      example:
 *                          -   id: 1
 *                              name: Abu
 *                              country: Japan
 *                              region: Japan, Taiwan, Marians
 *                              subregion: Honshu
 *          '400':
 *              description: |
 *                  Missing country query parameter or query parameters invalid.
 *                  Click on 'Schema' below to see the possible error responses.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                          error: true
 *                          message: "Country is a required query parameter."
 */
router.get(`${PREFIX}`, volcanoesController.get);

/**
 * @swagger
 *  /volcano/{id}:
 *  get:
 *      summary: |
 *          Returns an object containing data for the queried volcano. If a valid JWT token
 *          is sent in the header of the request, population data for 5km, 10km, 30km and 100km is also provided.
 *          To test this using Swagger, click the green 'Authorize' button at the top of this page to enter your JWT token.
 *          A JWT token ca be obtained by loggin in. The path parameter (id) is required.
 *      tags: [Data]
 *      security:
 *          -   BearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: The ID of the volcano.
 *              schema:
 *                  type: number
 *      responses:
 *          '200':
 *              description: |
 *                  Returns an object containing id, name, country, region, subregion, last eruption, summit, elevation,
 *                  latitude and longitude data of queried volcano. If a valid JWT token is
 *                  sent in the header of the request, population data for 5km, 10km, 30km and 100km
 *                  is also provided. An example of one object (with an authenticated request) is shown below.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Volcano'
 *                      example:
 *                          id: 1
 *                          name: Abu
 *                          country: Japan
 *                          region: Japan, Taiwan, Marianas
 *                          subregion: Honshu
 *                          last_eruption: 6850 BCE
 *                          summit: 641
 *                          elevation: 2103
 *                          latitude: "34.5000"
 *                          longitude: "131.6000"
 *                          population_5km: 3597
 *                          population_10km: 9594
 *                          population_30km: 117805
 *                          population_100km: 4071152
 *          '400':
 *              description: Invalid paramters.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                          error: true
 *                          message: Invalid query parameters. Query parameter are not permitted.
 *          '401':
 *              $ref: '#/components/responses/InvalidTokenError'
 *          '404':
 *              description: Volcano ID not found.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                          error: true
 *                          message: "Volcano with ID: 99999 not found."
 *
 */
router.get(`/volcano/:id`, authMiddleware, volcanoesController.find);

module.exports = router;
