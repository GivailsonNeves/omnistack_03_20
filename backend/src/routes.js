const express = require('express');
const routes = express.Router();

const OngController = require('./controllers/OngController');
const SessionController = require('./controllers/SessionController');
const IncidentsController = require('./controllers/IncidentesController');
const ProfileController = require('./controllers/ProfileController');

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/login/:id', SessionController.create);

module.exports = routes;