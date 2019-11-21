const chalk = require('chalk');

module.exports = {
  id: 'login',
  rooms: [
    {
      id: 1,
      name: 'Fantasy Life MUD',
      description: `
  Welcome to Fantasy Life MUD.  This game is played entirelly with a terminal.
  For best results, please ensure your window is ${chalk.yellow('80')} characters wide.

  You are standing in a room with two doors.  To your left  (west) is the door
  for  returning players.  Please enter through  that door  to return  to your
  adventure. To your right (east) is the door for new adventurers.  If this is
  first time here, please enter through this door with the command ${chalk.yellow('move E')}
`,
      exits: [
        {
          direction: 'E',
          roomId: 3
        },
        {
          direction: 'W',
          roomId: 2
        }
      ]
    },
    {
      id: 2,
      name: 'Returning Adventurer',
      description: `
  INSERT LOGIN INSTRUCTIONS
`,
      exits: [
        {
          direction: 'E',
          roomId: 1
        }
      ],
      commands: [
        {
          type: 'teleport',
          command: 'login',
          description: `
  NICE DESCRIPTION OF BEING TELEPORTED.`,
          destination: {
            mapId: 'castele',
            roomId: 1
          },
          actionDelay: 1000
        }
      ]
    },
    {
      id: 3,
      name: 'New Adventurer',
      description: `
  INSERT Registration INSTRUCTIONS
`,
      exits: [
        {
          direction: 'W',
          roomId: 1
        }
      ],
      commands: [
        {
          type: 'teleport',
          command: 'register',
          description: `
  NICE DESCRIPTION OF BEING TELEPORTED.`,
          destination: {
            mapId: 'castele',
            roomId: 1
          },
          actionDelay: 1000
        }
      ]
    }
  ]
};