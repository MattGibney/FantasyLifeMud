/**
 * IMPORTANT!
 * Lines of text MUST be exactly 76 characters long. with two spaces before and
 * after the line. Please ensure that text conforms to this standard. It ensures
 * that playing experience is consistent and easy to read.
 */

module.exports = {
  id: 'castele',
  rooms: [
    {
      id: 1,
      name: 'Main Square',
      description: `
  A huge water fountain stands proudly in the center of Castele's main square.
  It quietly humms with the sound of  magic as water pours from the top of the 
  ornately carved structure and flows down to the pool below.
  
  The square is bustling with activity as shoppers and merchants alike,  weave 
  between one another.  You catch small pieces of  conversation as people pass 
  you by, but nothing particularly grabs your attention.

  Roads extend out in all directions.  To the north,  the great Castle.  Along
  the road to the Castle  you can see a number of  fancy shops and residential
  buildings. To the south, the grand entrance to the city. You cannot make out 
  any details from this distance,  but you know it to be a formidable obstacle 
  to any would-be attackers.

  To the east of you is the artisans district, the roads appear to be ornately 
  decorated in this direction,  you can  see many colours  and textures in the 
  road surface. To the west is the shopping district. The road abruptly curves 
  behind some shops so you do not have good view of what lies beyond.
      `,
      exits: [
        {
          direction: 'N',
          roomId: 2
        }
      ]
    },
    {
      id: 2,
      name: 'Montague Avenue',
      description: `
  The road is one of the widest in the city, three horse drawn carts could fit
  side-by-side easily.  The road is paved with bricks  that are almost  white,
  they are arranged in a perfect herringbone.  Small trees and shrubs line the 
  road edge and are well trimmed. The citizens here are all very well dressed.
  They amble happily between the many fine shops and houses that run alongside 
  the road.
      `,
      exits: [
        {
          direction: 'N',
          roomId: 3
        },
        {
          direction: 'S',
          roomId: 1
        }
      ]
    },
    {
      id: 3,
      name: 'Montague Avenue',
      description: `
  The road,  paved with white brick in a herringbone pattern,  is seperated in
  the middle by a grassy verge.  Ahead,  you can see the grand castle.  Guards
  block the entrance only allowing visitors who are present on a list that one
  of the guards is holding.

  To the west is the entrance to the  Paladins guild.  Men and women,  clad in
  guilded armour come and go. Armour and weapons clink and rattle against each
  other as they walk.

  To the east is the  Alchemists Guild.  There are far fewer people coming and
  going from this place.
  `,
      exits: [
        {
          direction: 'S',
          roomId: 2
        }
      ]
    }
  ]
};