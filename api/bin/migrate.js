#!/usr/bin/env node
const knex = require("../knex");

function up(knex) {
    console.log("running...");
    return knex.schema
        .hasTable("users")
        .then((exists) => {
            if (!exists) {
                return knex.schema.createTable("users", function (table) {
                    table.increments();
                    table.string("email");
                    table.string("password");
                    table.string("firstName");
                    table.string("lastName");
                    table.string("dob");
                    table.string("address");
                });
            }
            return false;
        })
        .then((action) => {
            if (!!!action) {
                console.log(
                    "table users already exists. Please delete it before run migrate again."
                );
            } else {
                console.log("migrate table users success.");
            }
        })
        .catch((error) => console.error(error))
        .finally(() => process.exit(1));
}

up(knex);
