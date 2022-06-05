const express = require("express");

const router = express.Router();
const PREFIX = "/me";

/**
 * @swagger
 *  /me:
 *  get:
 *      summary: |
 *          A route to assist in automating some of the marking process for this assignment
 *      tags: [Administrator]
 *      responses:
 *          '200':
 *              description: An object containing your name and student number.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              student_number:
 *                                  type: string
 *                      example:
 *                          name: Mike Wazowski
 *                          student_number: n1234567
 */
router.get(`${PREFIX}`, (req, res) => {
    return res.json({
        name: process.env.STUDENT_NAME,
        student_number: process.env.STUDENT_NUMBER,
    });
});

module.exports = router;
