const express = require("express");
const countriesController = require("../controllers/country.controller");
const { getAllCountries } = require("../middlewares/country.middlware");

const router = express.Router();
const PREFIX = "/countries";
/**
 * @swagger
 * components:
 *      schemas:
 *          Countries:
 *              type: array
 *              items:
 *                  type: string

 */
/**
 * @swagger
 * /countries:
 *  get:
 *      summary: |
 *              Returns a list of all countries that are associated
 *              with one or more volcanoes, ordered alphabetically.
 *      tags: [Data]
 *      responses:
 *          '200':
 *              description: |
 *                 An array of countries. An example of the first five elements
 *                  in the array is shown below.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Countries'
 *                      example: ["Algeria", "Antarctica", "Argentina", "Armenia", "Australia"]
 *          '400':
 *              description: Invalid query parameters.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *                      example:
 *                           error: true
 *                           message: "Invalid query parameters, Query parameters are not permitted."
 */
router.get(`${PREFIX}`, getAllCountries, countriesController.get);

module.exports = router;
