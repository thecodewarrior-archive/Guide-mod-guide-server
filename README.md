# Guide-mod-guide-server
The Guide server for the In-game Guides mod

Using the guide server allows the In-game Guides mod to automatically download and update guides for every mod that 
it has installed.

### Guide Syntax:
Guides are made up of two main components, text, and tags. Text is, well, text. Tags are special parts of the guide,
such as links to other guides, images, indentation, and in the future much much more.

Tags have the following syntax, anything surrounded by [] is optional.
`<<protocol[:[arguments]]>>`

Tag arguments are seperated with pipes `|` and are in either the format `name=value` or `valueN`. 
Values without an equal sign are just numbered 0,1,...

The current tags are (_italic_ arguments are optional):
* Link
  * protocol: guide
  * arguments:
    * 0: actual text
    * 1: guide name
* Image
  * protocol: image
  * arguments:
    * 0: path
    * _width_: max width
    * _height_: max height
    * _align_: left, right, center
* Indent
  * protocol: indent
  * arguments:
    * _width_: width of indent (GUI pixels)
* Dedent
  * protocol: dedent
  * arguments:
    * _width_: width of dedent (GUI pixels)
* Horizontal space
  * protocol: hspace
  * arguments:
    * 0: width of space (GUI pixels)
* Vertical space
  * protocol: vspace
  * arguments:
    * 0: height of space (GUI pixels)
* Bullet point (in development)
  * protocol: bullet
  * arguments:
    * _0_: (type) round, round_open, diamond, diamond_open

For example:
```
Grass

Probably the first material you will encounter when you spawn, 
it's uses are mainly decorative. Grass can only be picked up 
with a <<guide:silk touch|minecraft:silkTouch>> tool, and will 
drop dirt if broken with any other tool.
```

The structure of a guide pack is as follows
* lang
  * [ guides ]
* images
  * [ images ]
* pack.info
* register.txt

`pack.info`:
```
version: [pack version]
```

`register.txt`:
```
blocks:

block:id=guide:name
block:id.meta=guide:name

items:

item:id=guide:name
item:id.damage=guide:name
```
