const iconv = require('iconv-lite');

module.exports = {
	
	decryptAuth(spacket)
	{
		let str_dec = Buffer.alloc(spacket.length + 1);
	
		for(let i = 0; i < spacket.length; i++)
		{
			str_dec[i] = (spacket[i] - 0xF) ^ 0xC3;
		}
	
		return iconv.decode(str_dec.slice(0, str_dec.length - 1), 'win1250');
	},

	encryptAuth: function(spacket) {
		
		let packet = iconv.encode(spacket, 'win1250');
		
		let str_enc = Buffer.alloc(packet.length + 1);
		
		for (let i = 0; i < packet.length; i++)
			str_enc[i] = (packet[i] ^ 0xC3) + 0xF;
		
		str_enc[packet.length] = 0xD8;
		return str_enc;
	},
	
	decryptResponse: function(spacket) {
		let str_dec = Buffer.alloc(spacket.length);
		
		for (let i = 0; i < spacket.length; i++)
			str_dec[i] = spacket[i] - 0xF;
		
		return iconv.decode(str_dec.slice(0, str_dec.length - 1), 'win1250');
	},
	
	encryptResponse: function(spacket) {

		let packet = iconv.encode(spacket, 'win1250');

		let str_enc = Buffer.alloc(packet.length + 1);
		
		for (let i = 0; i < packet.length; i++)
			str_enc[i] = packet[i] + 0xF;
		
		str_enc[packet.length] = 0x19;

		return str_enc;
	}
	
};