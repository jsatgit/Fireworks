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

Fireworks display sequence format will be in JSON. The general format is as follows:
```
{display: [
  {timestamp: 2342342342, shells: [{type: 1, xPosition: 234, angle: 90, speed: 120}]},
  {timestamp: 12312123, shells: [{type: 1, xPosition: 232, angle: 45, speed: 50}, {type: 2, xPosition: 342, angle: 60, speed: 76}]}
]}
```

## Timestamp

This is an integer value that is measured in milliseconds.

## Type

This is the type of firework that is to be fired. A generic set of fireworks will be available. Custome fireworks can also be made. The fireworks details will also be in JSON format and requires a unique identifier. The type gives us information regarding the number of stars used, the type of stars used, the colour etc. 

## xPosition

We assume that all fireworks are shot at ground level. Thus, all we need to know is the x position that the fireworks will be shot at. This value will be in pixels.

## Angle

Angle is the degrees between the left horizontal and the initial path of the fireworks. For clarify, 0 degrees will shoot the fireworks towards the left with no y component. Anything less than 90 degrees will shoot the fireworks leftwards, anything greater than 90 degrees will shoot the fireworks rightwards. 180 degrees will shoot the firework toward the right with no y component. Value has to be between 0 and 180 degrees.

## Speed

Speed is the initial speed that the fireworks will be shot at. 
