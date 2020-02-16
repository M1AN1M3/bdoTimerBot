module.exports = {
    name: "ping",
    category: "info",
    description: "it's a ping command",
    run: async (client, message, args) => {
        message.channel.send(`pong`)
    }


}