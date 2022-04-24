import packetHandshake from './server/handshake/packet-handshake.js';
import { readVarInt, readVarLong, writeVarInt } from './utils.js';

// 这里记录的是服务端会收到的数据包
// client包不会被记录在这里
const registry = {
    HANDSHAKING: {
        0x00: packetHandshake,
    },
    STATUS: {

    },
    LOGIN: {

    },
    PLAY: {
        
    },
}

export class ServerPacket {

    /**
    * @param {Buffer} buffer 
    */
    constructor(buffer) {
        this.data = buffer;
        this.offset = 0;
    }

    /**
     * @returns {number} varint
     */
    readVarInt() {
        const [val, pos] = readVarInt(this.data.slice(this.offset, this.data.length));
        this.offset += pos;
        return val;
    }

    readVarLong() {
        const [val, pos] = readVarLong(this.data.slice(this.offset, this.data.length));
        this.offset += pos;
        return val;
    }

    /**
     * @returns {string} sized string
     */
    readSizedString() {
        const length = this.readVarInt();
        const str = this.data.slice(this.offset, this.offset + length).toString('utf-8');
        this.offset += length;
        return str;
    }

    /**
     * @returns {number} unsigned short
     */
    readUnsignedShort() {
        const val = this.data.readUInt16BE(this.offset);
        this.offset += 2;
        return val;
    }
}

export class ClientPacket {
    constructor(packetStruct) {
        
    }
}