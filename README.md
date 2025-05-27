# Game Project Part 7 - Side-Scrolling Adventure Game

A 2D side-scrolling adventure game built with p5.js featuring a flying character navigating through a mystical landscape.

## Features

### Gameplay
- **Side-scrolling movement** with camera following the player
- **Flying character** with jetpack-style propulsion
- **Collectible items** (golden keys) that increase your score
- **Canyon obstacles** that cause the player to fall
- **Lives system** (3 lives total)
- **Level completion** when reaching the flagpole with all items collected

### Game Elements
- **Mountains** with snow-capped peaks
- **Trees** scattered throughout the landscape
- **Stars** in the night sky
- **Canyons** to avoid falling into
- **Flagpole** marking the end goal
- **Collectible keys** worth 25 points each

### Character States
- Standing still (facing forward)
- Walking left/right
- Jumping/flying with flame effects
- Falling animation
- Different eye colors based on direction

## Controls

- **A** - Move left
- **D** - Move right  
- **W** - Jump/Fly (jetpack propulsion)

## Game Mechanics

### Scoring
- Collect all 4 golden keys (25 points each)
- Maximum score: 100 points
- Score required to complete level: 100 points

### Lives System
- Start with 3 lives
- Lose a life when falling into canyons
- Game over when all lives are lost
- Character respawns at starting position after losing a life

### World Boundaries
- Left boundary prevents moving too far left
- Right boundary prevents moving beyond the game world

## File Structure
