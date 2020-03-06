const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');


module.exports = {
    async index(req, res){
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        const { git_user, techs, latitude, longitude } =  req.body;

        let dev = await Dev.findOne({git_user});
        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${git_user}`)
        
            const {name = login , avatar_url, bio} = response.data;
            
            const techsarray = parseStringAsArray(techs);
            
            
            
            const location = {
                type:'Point', 
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                git_user,
                name,
                avatar_url,
                bio,
                techs: techsarray,
                location,
            });
            //fil conn
            const sendSocketMensageTo = findConnections(
                {latitude, longitude},
                techsarray,
            )
            sendMessage(sendSocketMensageTo, 'newDev', dev);
        }

        
        
        return res.json(dev);
    },

    async update(req, res){
        const { _id, techs, name, avatar_url, bio } =  req.body;
        const techsarray = parseStringAsArray(techs);
        let upd = await Dev.update(
            {_id},
            {
                techs: techsarray,
                name,
                avatar_url,
                bio,
            }
        );
        let dev = await Dev.findOne({_id});
        return res.json({dev});
    },

    async destroy(req, res){
        const {_id} = req.body;
        let del = await Dev.deleteOne({_id});
        return res.json(del);
    },
};