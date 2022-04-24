const SEGMENT_BITS = 0x7F
const CONTINUE_BIT = 0x80

/**
 * @param {Buffer} data 
 */
export function readVarInt(data) {
    let value = 0;
    let position = 0;
    let currentByte;
    let pos = 0;
    while (true) {
        currentByte = data[pos++];
        value |= (currentByte & SEGMENT_BITS) << position;

        if ((currentByte & CONTINUE_BIT) === 0) break;

        position += 7;

        if (position >= 32) throw new Error("VarInt is too big");
    }

    return [value, pos];
}

/**
 * @param {Buffer} data 
 */
 export function readVarLong(data) {
    let value = 0;
    let position = 0;
    let currentByte;
    let pos = 0;
    while (true) {
        currentByte = data[pos++];
        value |= (currentByte & SEGMENT_BITS) << position;

        if ((currentByte & CONTINUE_BIT) === 0) break;

        position += 7;

        if (position >= 64) throw new Error("VarLong is too big");
    }

    return [value, pos];
}


/**
 * @param {Buffer} buffer
 * @param {number} value
 * @returns {number} size
 */
export function writeVarInt(buffer, value) {
    while (true) {
        let size = 1;
        if ((value & ~SEGMENT_BITS) == 0) {
          buffer.writeInt8(value);
          return size;
        }

        buffer.writeInt8((value & SEGMENT_BITS) | CONTINUE_BIT);
        // Note: >>> means that the sign bit is shifted with the rest of the number rather than being left alone
        value >>>= 7;
        size++;
    }
}