# draw_bot

## Introduction

The purpuse of this project was to create a robot that was capable of drawing on walls no mater it's width or heigh.

This work was manely based on this project : https://github.com/fumikrobot/source-code

And added some usefull features and modifications. 

## How to use the robot 

### 1) Setup the robot on the board

You need to fix the two nails which will be used as holding and rotational points on the corners of the board.

Attach a pen in the pen holder so that when the holder is down it is touching the board.

### 2) Generate configs.txt file

Once the robot is in place, you have to use this online tool to generate the requiered files :  [theoliss.github.io/draw_bot/](https://theoliss.github.io/draw_bot/)

On the top-left corner put all the values corresponding to how the robot is fixed in real life (in milimeter). 

The canva should change its shape to match what you typed.

Then (after scrolling down), you can click on "download configs.txt". You need to put it in the micro SD card without changing it's name. Be carefull it needs to be named exactly "configs.txt" (sometimes your computer might rename it configs(2).txt if you already downloaded before).

### 3) Generate draw.txt file

Import a svg file using the "load an svg" button. Then it should appear on the canvas. You can adjust it's position and scale using the sliders. Then press the "done".

Then, just like you did for the "configs.txt" file, scroll down and click on the download draw.txt. Then put it in the micro-SD card (the "exact name" rule still applies).

*NB : The convertion from svg to instruction does not work yet... you can use the convertor made by the project I took for reference, it should work great.*

### 4) Start !

Put the micro-SD card with the two files in it in the robot's card holder and plug the alimentation cable. It should move the pen up and down then start drawing.
