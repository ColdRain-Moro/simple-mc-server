import { createServer } from 'net'
import { config } from './config.js'
import { ServerPacket } from './packet/packet.js';

const server = createServer((socket) => {
    socket.on('data', (data) => {
        const reader = new ServerPacket(data);
        const size = reader.readVarInt()
        const id = reader.readVarInt()
        const protocolVersion = reader.readVarInt()
        const address = reader.readSizedString()
        const port = reader.readUnsignedShort()
        const nextState = reader.readVarInt()
        console.log(
            {
                size,
                id,
                protocolVersion,
                address,
                port,
                nextState
            }
        )
    })
})
server.maxConnections = config.maxConnection

server.getConnections((err, count) => {
    console.log(`${count}/${config.maxConnection} connections`)
})

server.listen(config.port, config.host, () => console.log("Server is running on " + config.host + ":" + config.port))