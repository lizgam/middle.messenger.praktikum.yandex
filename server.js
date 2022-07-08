/* global __dirname*/
/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint no-undef: "off"*/

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, "dist")));

// Index Route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, function () {
    console.log(`Server listening on Port ${PORT}`);
});
