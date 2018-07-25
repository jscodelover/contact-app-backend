const express = require('express');
const Nexmo = require('nexmo');
const bodyParser = require('body-parser');
const cors = require('cors');
const rn = require('random-number');

const port = process.env.PORT || 5000;

const router = express();

const NEXMO_FROM_NUMBER = 919821818733;

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const nexmo = new Nexmo({
  apiKey: 'd0ddea39',
  apiSecret: 'yIFN162l7j0wJmq6'
});

router.post('/send', (req, res) => {

	let OTP_gen = rn.generator({
	  min:  100000
	, max:  999999
	, integer: true
	});
	let otp_no = OTP_gen();
	let message = `Hi your OTP No is ${otp_no}. ${req.body.message}`;
	nexmo.message.sendSms( NEXMO_FROM_NUMBER, req.body.toNumber, message, {type: 'unicode'},(err, responseData) => {
		if (responseData) {
			let sendData = {
				otpno : otp_no,
				res : responseData
			}
			res.send({ result : sendData});
		}
		else
			res.send(err)
	});
});

router.listen(port,() => {
	console.log(`server is up on port ${port}`)
});