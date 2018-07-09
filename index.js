const https = require('https');
const config = require('./config/configuracion.json');
const agent = new https.Agent({
	keepAlive : true
});
const cors = require('cors')({origin: true});

/**
 * HTTP Cloud Function that uses a cached HTTP agent
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.reporteHistorico = (req, res) => {


	var options = {
		hostname : config.host.apiManager,
		path : config.paths.reporte_historico,
		method : 'GET',
		agent : agent,
		headers : {
			'Accept' : 'application/json',
			'Accept-Charset' : 'utf-8',
			'apiKey' : config.apiKey
		}
	};
	if (req.method !== 'GET') {
		// This is an error case, as "message" is required.
		res.status(400).send('Metodo no soportado.');
	} else {
		// Everything is okay.
		var idParticipante = req.query.idParticipante;
		var modoConsulta = req.query.modoConsulta;
		var banCancelados = req.query.banCancelados;
		var codFiliacion = req.query.codFiliacion;
		options.path = path + "?idParticipante=" + idParticipante + "&modoConsulta=" + modoConsulta + "&banCancelados=" + banCancelados + "&codFiliacion=" + codFiliacion;
		console.info("=============Path========");
		console.info(options.path);
	    console.info(options.hostname);
		const reqService = https.request(options, (resService) => {
			console.log('statusCode:', resService.statusCode);
			console.log('headers:', resService.headers);
			resService.on('data', (d) => {
				res.status(resService.statusCode).send(d);
			});
		});

		reqService.on('error', (e) => {
			console.error(e);
			res.status(500).send(e.message);
		});
		reqService.end();
	}
};

exports.consultaReporte24hrs = (req, res) => {


	var options = {
		hostname : config.host.apiManager,
		path : config.paths.reporte_24_hrs,
		method : 'GET',
		agent : agent,
		headers : {
			'Accept' : 'application/json',
			'Accept-Charset' : 'utf-8',
			'apiKey' : config.apiKey
		}
	};
	if (req.method !== 'GET') {
		// This is an error case, as "message" is required.
		res.status(400).send('Metodo no soportado.');
	} else {
		// Everything is okay.
		var idParticipante = req.query.idParticipante;
		var modoConsulta = req.query.modoConsulta;
		var banCancelados = req.query.banCancelados;
		var codFiliacion = req.query.codFiliacion;
		options.path = path + "?idParticipante=" + idParticipante + "&modoConsulta=" + modoConsulta + "&banCancelados=" + banCancelados + "&codFiliacion=" + codFiliacion;
		console.info("=============Path========");
		console.info(options.path);
		const reqService = https.request(options, (resService) => {
			console.log('statusCode:', resService.statusCode);
			console.log('headers:', resService.headers);
			resService.on('data', (d) => {
				res.status(resService.statusCode).send(d);
			});
		});

		reqService.on('error', (e) => {
			console.error(e);
			res.status(500).send(e.message);
		});
		reqService.end();
	}
};


exports.altaWorldCheck = (req, res) => {


	var options = {
		hostname : config.host.apiManager,
		path : config.paths.alta_persona,
		method : 'POST',
		agent : agent,
		body : {},
		headers : {
			'Accept' : 'application/json',
			'Accept-Charset' : 'utf-8',
			'apiKey' : config.apiKey
		}
	};
	cors(req, res, () => {});
	if (req.method !== 'POST') {		
		res.status(400).send({error:'Metodo no soportado.'});
	} else {
		// Everything is okay.		
		let body = req.body;
		options.body = body;	
		
		const reqService = https.request(options, (resService) => {
			console.log('statusCode:', resService.statusCode);
			console.log('headers:', resService.headers);
			resService.on('data', (d) => {
				res.status(resService.statusCode).send(d);
			});
		});

		reqService.on('error', (e) => {
			console.error(e);
			res.status(500).send(e.message);
		});
		reqService.end();
	}
};
	
