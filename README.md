# Description

## About 

Fireworks is an app that creates firework visualizations based on audio files.

# Research

The input of the core program is a sound file, the output is a fire works sequence file 

## How Do Sound Files Work

Sound files are waves stored in the time domain. They encode frequency and amplitude.

## Parameters to Extract From an Audio File

Frequency analysis will be employed to determine the relevant characteristics of the song at a given time of the song.


## How Do Fireworks Work

A firework is a shell with [stars](https://en.wikipedia.org/wiki/Pyrotechnic_star) inside.
The embedding of the stars determines the shape of the explosion pattern.

## Parameters to specify a Firework show

* number of shells
* position of shells
* size of the shell
* height of explosion
* number of stars in a shell
* pattern of stars in a shell
* colours of stars
* size of the stars 
* explosiveness of gunpowder
* timing of explosions

## Fireworks Sequence Specification

# Implementation

Frontend:

* Web appplication using Javascript
* `Matter.js` physics engine

Backend:

* Python

## Player

A player will be used to interpret user input directly, or a file with the fireworks display sequence.

## Fireworks Display Sequence Generator

This will be the algorithm that will automatically generate a fireworks display sequence based on a given input song.

# Fireworks Display Sequence Format

Format will be in the following form
```
[Timestamp] TypeOfFirework1 xPosition Angle Speed, TypeOfFirework2 xPosition Angle Speed, etc...
[Timestamp] ...
etc...
```
## Timestamp

This is a 7 digit value in milliseconds. Leading zeros are to be included and must have the square brackets. Having 7 digits gives us a maximum of 9,999,999 milliseconds, which translates to around 167 minutes. This should be enough time for a firework display. 

### Examples

* [0000100] is a valid timestamp
* 0005000 is not a valid timestamp

## TypeOfFirework

This is the specific firework that is to be fired. A database of all existing fireworks will be made, each with a unique identifier. TypeOfFirework will give us details regarding the number of stars used, the colour, type of stars used etc. A TypeOfFirework can be made of TypeOfFirework (the stars are fireworks themselves).

## xPosition

We assume that all fireworks are shot at ground level. Thus, all we need to know is the x position that the fireworks will be shot at. This value will be in pixels.

## Angle

Angle is the degrees between the left horizontal and the initial path of the fireworks. For clarify, 0 degrees will shoot the fireworks towards the left with no y component. Anything less than 90 degrees will shoot the fireworks leftwards, anything greater than 90 degrees will shoot the fireworks rightwards. 180 degrees will shoot the firework toward the right with no y component. Value has to be between 0 and 180 degrees.

## Speed

Speed is the initial speed that the fireworks will be shot at. 
