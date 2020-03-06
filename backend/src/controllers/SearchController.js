const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res){

        const { latitude, longitude, techs} = req.query;

        const techsarray = parseStringAsArray(techs);


         const devs = await Dev.find({
            techs: {
                $in: techsarray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance: 10000,
                },  
            },


        });
        return res.json({devs});


    },
}