module.exports = {
    name: "boss",
    category: "info",
    description: "prints boss spawn info",
    run: bossCommand
}

let spawnTimes = { 
    "mon": 
        {
            "0:15": ["Kutum", "Karanda"],
            "2:00": ["Karanda"]
        },
    "tue":
        {
            "0:15": ["Karanda"],
            "2:00": ["Kutum"]
        },
    "wed":
        {
            "0:15": ["Kutum", "Karanda"]
        },
}

let channel = null;

async function bossCommand(client, message, args) {
	const emptyHeader = "        ";
	let response = "";
	Object.keys(spawnTimes).forEach(function(day) {
		response += "day=" + day + "\n";
		Object.keys(spawnTimes[day]).forEach(function(bossTime) {
			response += emptyHeader + bossTime + "\n";
			spawnTimes[day][bossTime].forEach(function(bossName) {
				response += emptyHeader + emptyHeader + bossName + "\n";
			});
		});
	});
	message.channel.send(response);
	channel = message.channel; // update channel to latest message's channel
}

function init() {
	var CronJob = require('cron').CronJob;
	var job = new CronJob('0 * * * * *', cronJob, null, true, 'Europe/Paris');
	job.start();
}

function cronJob() {
	if (channel) {
		channel.send('message from cron, one a minute');
	}
	else {
		console.log('cron: channel not set yet')
	}
}

init();
