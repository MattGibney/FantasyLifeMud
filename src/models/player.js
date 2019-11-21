const chalk = require('chalk');
const Socket = require('../socket');

const BASIC_COMMANDS = [
  'look',
  'move',
  'help'
];

class Player {
  constructor(socket, game, playerDetails = {}, logger) {
    this.socket = new Socket(socket);
    this.game = game;
    this.logger = logger;

    // this.isAuthenticated = true;
    // this.screen = '';

    this.mapId = 'login';
    this.roomId = playerDetails.roomId || 1;
  }

  /**
   * Sends a message to the user. This function also adds a prompt to the end of
   * all communications. The player always sees a [] to indicate that they can
   * provide input. The goal will be to expand on this in the future, possibly
   * adding some useful content to the prompt.
   * @param {string} message 
   */
  sendMessage(message) {
    message += '\n[] ';
    return this.socket.write(message);
  }

  /**
   * Player send an instruction. This function is the ingestion point. This is
   * where the game code starts.
   * @param {string} data 
   */
  instruction(data)  {
    const char = Buffer.from(data).toString().trim();
    this.logger.log({
      level: 'info',
      message: {
        command: char
      }
    });

    const roomCommand = this.getCurrentRoom().commands
      .find(command => command.command === char);
    
    if(roomCommand) {
      return this.commandRoomCommand(roomCommand);
    }

    if(char === 'look') {
      return this.commandLook();
    }

    if(char.match(/^move/)) {
      const args = char.slice(4).trim();
      return this.commandMove(args);
    }

    if(char.match(/^help/)) {
      return this.commandHelp();
    }

    return this.commandUnknown(char);
  }

  /**
   * Gets the room that the player is currently in.
   */
  getCurrentRoom() {
    const map = this.game.maps.find(map => map.id === this.mapId);
    return map.rooms.find(room => room.id === this.roomId);
  }

  // Commands

  /**
   * Displays basic information about the room that the player is in. Primarily,
   * this consists of the name, description and the exits available.
   * This function takes no inputs and provides no outputs. As a class method,
   * it gets it's data from the class instance. It outputs the details of the
   * room directly to the player via the sendMessage() method.
   */
  commandLook() {
    const room = this.getCurrentRoom();
    const namePadding = (80 - room.name.length) / 2;
    let description = `
${' '.repeat(namePadding)}${chalk.cyan(room.name)}
${room.description}`;
    if(room.exits.length > 0) {
      const exits = chalk.yellow(
        room.exits.reduce((a, b) => a.concat(`${b.direction} `), '')
      );
      description += `
Exits: ${exits}
`;
    }

    return this.sendMessage(description);
  }

  commandMove(direction) {
    const newRoom = this.getCurrentRoom()
      .getRoomInDirection(direction.toUpperCase());
    if(newRoom) {

      return this.movePlayer(
        newRoom.mapObj.id,
        newRoom.id
      );

    }
    return this.sendMessage('You are unable to move in that direction');
  }

  commandRoomCommand(commandObject) {
    if(commandObject.type === 'teleport') {
      this.sendMessage(commandObject.description);

      // Pause here for dramatic effect.
      setTimeout(() => {
        this.movePlayer(
          commandObject.destination.mapId,
          commandObject.destination.roomId
        );
      }, commandObject.actionDelay || 0);
    }
    return;
  }

  commandHelp() {
    const roomCommands = this.getCurrentRoom().commands
      .map(command => command.command);
    const commandList = chalk.yellow(
      BASIC_COMMANDS.concat(roomCommands).reduce((a, b) => a.concat(`${b} `), '')
    );
    return this.sendMessage(
      `Commands: ${commandList}`
    );
  }

  commandUnknown(command) {
    return this.sendMessage(
      `The command ${chalk.red(command)} is not recognised`
    );
  }

  /**
   * Move the player to a new location.
   * @param {integer} mapId Unique Identifier for the destination map
   * @param {integer} roomId Unique identifier for the destination room
   */
  movePlayer(mapId, roomId) {
    this.mapId = mapId;
    this.roomId = roomId;

    return this.commandLook();
  }
}

module.exports = Player;