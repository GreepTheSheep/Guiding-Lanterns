List of all commands:

Syntax:
* = commands for supporters
^ = commands for owner
// = disabled

Arguments:
[ ] = need a argument
{ } = optional argument
? = dynamic number or text

------------ Only for /r/tangled ------------ https://discord.gg/yFD42Zy

!scr [movie/tbea/tea/s?e?] [timestamp MM:SS]        : sends a screenshot of Tangled; Tangled Before Ever After; Tangled Ever After; or the series (more info at https://guiding-lanterns.greep.cf/screenshot.html)
!lanterns                                           : shows the number of lanterns thrown with :Lantern: emoji on the server

------------ Disney-related ------------

!quote [movie]                                      : Send a random quote from your movie
^ !addquote [movie] [text]                          : add a new quote on the quotes data
!picture [movie]                                    : Send a random picture (or GIF) from your movie
!addpicture [movie] [URL or attachment]             : Send suggestion for a new picture on a movie. Verificator role on server adds the file directely
^ !addworld [movie]                                 : Creates files for new data

------------ Utility ------------

!about                                              : Informations of bot (versions, uptime...)
!geturl [attachment]                                : Sends a direct URL link to your attachment
!wolfram [question]                                 : What would you like to know about ?
!googleimage [input]                                : Input your search and he will returns an image
!prefix {set %newPrefix%}                           : changes the server's prefix
!lang {%langcode%}                                  : Changes the user's language

------------ Currency ------------

!market {buy - sell} {ID} {count}                   : See what we have in the 24/7 market.
!inventory                                          : Opens your inventory and see what you have.
!balance {user Mention Or ID}                       : See your actual balance.
!use [ID]                                           : Uses your item. (When used, item is removed from inventory)
!claim                                              : Get your daily money reward
!loot                                               : Win a chance to get money
^ !setmoney [User mention or ID] [money]            : Sets specific number of money
^ !additem [User mention or ID] [Item ID] {count}   : Add item to user
^ !clearinventory [User mention or ID]              : Clears inventory of user

------------ Fun ------------

!8ball [question]                                   : Ask a question and he will answer.
* !say [text]                                       : Makes the bot talking !

------------ Games ------------

!guessthenumber                                     : Starts a game of the famous Guess The Number
!gtnguess [number]                                  : Guess the number on GTN
^ !gtnstats [User mention or ID]                    : Stats of user's current game on GTN
^ !gtnreset [User mention or ID]                    : Resets all stats of user on GTN

------------ Other ------------

!about                                              : Show stats of the bot
!invite                                             : Invite the bot in your server
!bug                                                : Send a link to GitHub issue & Support server

------------ Without prefix ------------

@mention                                            : Send random messages from list located at cmds/Fun/ping_answers.json
@mention help                                       : Shows this help menu
@mention prefix                                     : Shows server's prefix
thanks @mention                                     : you're welcome!

------------ Owner ------------

^ !eval [JS script]                                 : evaluate JavaScript
^ !ssh [command]                                    : execute shell command to computer
^ !log                                              : send log file (clears every 24h)
^ !setstatus [play/watch/listen/stream]             : await status of bot
^ !update                                           : shell eval: git pull && npm update && restart bot