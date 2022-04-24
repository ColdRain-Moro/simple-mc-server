export default {
    id: 0x00,
    fields: {
        protocolVersion: 'varint',
        serverAddress: 'sized-string',
        serverPort: 'unsigned-short',
        nextState: 'varint'
    }
}