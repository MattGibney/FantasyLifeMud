// TODO: Add Winston.js logging to NDJSON format.

// TODO: Log everything that happens on the server.

const net = require('net');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;

const Config = require('../config/environment');

const ModelFactory = require('./modelFactory');
const DaoFactory = require('./daoFactory');
const Game = require('./game');


const logger = createLogger({
  format: combine(
    timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.ndjson' })
  ]
});


const game = new Game(ModelFactory, DaoFactory);

function socketHandler(socket) {
  logger.defaultMeta = { ip: socket.remoteAddress };
  
  const player = new ModelFactory.player(socket, game, {}, logger);
  game.connectedPlayers.push(player);

  player.commandLook();

  logger.log({
    level: 'info',
    message: 'Player Connected'
  });

  player.socket.on('data', data => player.instruction(data));

  player.socket.on('end', function() {
    game.connectedPlayers = game.connectedPlayers.filter(c => c !== player) || [];

    logger.log({
      level: 'info',
      message: 'Player Disconnected'
    });
  });
}

 

const server = net.createServer(socketHandler);
server.listen(Config.port, () => {
  logger.log({
    level: 'info',
    message: 'Fantasy Life MUD server started.'
  });
});