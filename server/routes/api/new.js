import axios from "axios";
const express = require("express");
const router = express.Router();

const api = "http://data.streetfoodapp.com/1.1/schedule/vancouver";

let newTrucks = axios.get(api).then(res => {
    return res.data.metadata.new
})