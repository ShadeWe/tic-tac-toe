# TIC TAC TOE
See [it](https://shadewe.github.io/tic-tac-toe.github.io/) working. 

This is a more complex version of tic-tac-toe game, where you have a 3x3 grid of 3x3 grids of squares. That means you have something like this:

```
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - -
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - -
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
```
The very first move can be made anywhere a player want, but the main point is that the square a player moves to forces the opponent to move only to the grid, corresponding to the number of the cell the first player has made his move to. In other words (look at the game fields below), If, let's say, the first player has made his move into the center cell of the second grid (the center top grid, first move), that forces the opponent to move in the center grid in any clear cell (second move). The same thing happends here, his move forces the first player to move in the left top grid (third move). Knowing the fact, that you force your player to move in the grid which corresponds to the cell that you have made your move to, allows you to change the game flow, change the outcome, to avoid losing, the game becomes interesting.
```
first move, made randomly       second move, (center grid)       third move, (first grid)
| □ □ □ | □ □ □ | □ □ □ |       | □ □ □ | □ □ □ | □ □ □ |        | □ □ □ | □ □ □ | □ □ □ | 
| □ □ □ | □ X □ | □ □ □ |       | □ □ □ | □ X □ | □ □ □ |        | □ □ □ | □ X □ | □ □ □ | 
| □ □ □ | □ □ □ | □ □ □ |       | □ □ □ | □ □ □ | □ □ □ |        | □ □ X | □ □ □ | □ □ □ | 
- - - - - - - - - - - - -       - - - - - - - - - - - - -        - - - - - - - - - - - - -
| □ □ □ | □ □ □ | □ □ □ |       | □ □ □ | O □ □ | □ □ □ |        | □ □ □ | O □ □ | □ □ □ | 
| □ □ □ | □ □ □ | □ □ □ |       | □ □ □ | □ □ □ | □ □ □ |        | □ □ □ | □ □ □ | □ □ □ | 
| □ □ □ | □ □ □ | □ □ □ |       | □ □ □ | □ □ □ | □ □ □ |        | □ □ □ | □ □ □ | □ □ □ | 
- - - - - - - - - - - - -       - - - - - - - - - - - - -        - - - - - - - - - - - - -
| □ □ □ | □ □ □ | □ □ □ |       | □ □ □ | □ □ □ | □ □ □ |        | □ □ □ | □ □ □ | □ □ □ | 
| □ □ □ | □ □ □ | □ □ □ |       | □ □ □ | □ □ □ | □ □ □ |        | □ □ □ | □ □ □ | □ □ □ | 
| □ □ □ | □ □ □ | □ □ □ |       | □ □ □ | □ □ □ | □ □ □ |        | □ □ □ | □ □ □ | □ □ □ | 
```
To win the game, you need to create a row of three 'X' or 'O', the same as the classic one. But the point is that you need to win 3 grids in a row to win the game. In other words, you need to win 3 times, and your won fields should form a row of three. Worth saying that you should not force your opponent to move in a field that's already been won except if there's no other way. If you do this, the opponent can move anywhere, which won't come in handy for you.

That's how a won game looks like:
```
| □ □ □ | □ □ □ | □ □ □ |
| □ X □ | □ X X | X □ □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - - 
| □ □ □ | O O O | □ O □ |
| O O O | □ X □ | X O □ |
| □ □ □ | □ □ □ | □ O □ |
- - - - - - - - - - - - - 
| □ □ □ | □ □ □ | □ □ □ |
| □ □ X | □ □ X | X □ □ |
| □ □ □ | □ □ □ | □ □ □ |
```
This game has been won by 'O' from the center left grid to the right center grid. I guess the main idea is very clear. 

Let's get into some trouble situations that can appear:

### 1. A player forces the opponent to move in a field that's already been won
```
| □ □ □ | □ □ □ | □ □ □ |
| □ X □ | □ X □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - - 
| □ □ □ | O O O | □ □ □ |
| □ □ □ | □ X □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - - 
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
```
Here, the center grid has been won by the 'O'. And now it's turn of 'X' to make a move, and, for some reason, the 'X' player makes his move in the center cell of the third grid:
```
| □ □ □ | □ □ □ | □ □ □ |
| □ X □ | □ X □ | □ X □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - - 
| □ □ □ | O O O | □ □ □ |
| □ □ □ | □ X □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - - 
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
```
According to the game rules, the opponent must make a move in the grid that corresponds to the number of the cell the other player has made a move to. But in this situation, the 'X' player forces the 'O' player to move in the center grid which is already won by 'O'. In this case, the player that's forced to move in a field that's already won can make a move anywhere. And, let's say, the 'O' player decides to move in the right bottom grid, and the game continues.
```
| □ □ □ | □ □ □ | □ □ □ |
| □ X □ | □ X □ | □ X □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - - 
| □ □ □ | O O O | □ □ □ |
| □ □ □ | □ X □ | □ □ □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - - 
| □ □ □ | □ □ □ | □ □ □ |
| □ □ □ | □ □ □ | O □ □ |
| □ □ □ | □ □ □ | □ □ □ |
```

### 2. A player forces the opponent to move in a field with a draw

Let's say we've got something like this:
```
| □ □ □ | □ □ □ | □ □ □ |
| □ X □ | □ O □ | □ X □ |
| □ □ □ | □ □ □ | □ □ □ |
- - - - - - - - - - - - -
| □ □ □ | O X O | □ □ □ |
| □ X □ | O X O | □ X □ |
| □ □ □ | X O X | □ □ □ |
- - - - - - - - - - - - -
| □ □ □ | □ □ □ | □ □ □ |
| □ O □ | □ □ □ | □ O □ |
| □ O □ | X □ □ | □ □ □ |
```
In this situation, it's a move for 'X', and he decides to move in the center cell of the 8 grid, which forces 'O' to move in the center. But there's a draw, and there's no cells to move. In this situation, 'O' can move anywhere.
