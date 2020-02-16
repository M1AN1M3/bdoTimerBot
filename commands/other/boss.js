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
}
