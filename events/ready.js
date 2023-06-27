const { Prefix } = require("../config.json");
const { ActivityType } = require("discord.js");
const mongoclient = require('../dbConnect.js');
const zello = require("zello");

module.exports = {
  run: async (client) => {
		
		const welcomedata = await mongoclient.db('cowie-welcome').collection('welcomedata').find().toArray();
		welcomedata.forEach(element=>{
			client.welcome.set(element._id, { channelid: element.channelID, msg: element.msg});
		});

    const activities = [
        {
            name: `${client.guilds.cache.size} servers`,
            type: ActivityType.Watching
        },
        {
            name: `${Prefix}help`,
            type: ActivityType.Listening
        },
    ]
    zello.info(`${client.user.tag} is online.`);
    client.user.setActivity(`${client.guilds.cache.size} servers`, { type: ActivityType.Watching });

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * activities.length);
        const newActivity = activities[randomIndex];
  
        client.user.setActivity(newActivity.name, { type: newActivity.type });
      }, 10_000);

},
};
