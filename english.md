# React Tic-Tac-Toe

###### https://reactjs.org/tutorial/tutorial.html

## Overview

Now that you're set up, let's get an overview of React!

### What is React?

React is a declarative, efficient, and flexible JavaScript library
for building user interfaces.
It lets you compose complex UIs
from small amd isolated pieces of code called "components".

React has a few differenct kinds of components,
but we'll start with `React.Component` subclasses:

```jsx
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
```

We'll get to the funny XML-like tags soon.
We use components to tell React what we want to see on the screen.
When our data changes,
React will efficiently update and re-render our components.

Here, ShoppingList is a **React component class**,
or **React component type**.
A component takes in parameters,
called `props`(short for "properties"),
and returns a hierarchy of views to display via the `render` method.

The `render` method returns a *description*
of what you want to see on the screen.
React takes the description and displays the result.
In particular, `render` returns a **React element**,
which is a lightweight description of what to render.
Most React developers use a special syntax called "JSX"
which makes these structures easier to write.
The `<div />` syntax is transformed at build time
to `React.createElement('div')`.
The example above is equivalent to:

```js
return React.createElement(
  'div', { className: 'shopping-list' },
  React.createElement('h1', /* ... h1 children ... */)
  React.createElement('ul', /* ... ul children ... */)
);
```

If you're curious, `createElement()` is described in more detail
in the [API reference](https://reactjs.org/docs/react-api.html#createelement),
but we won't be using it in this tutorial. Instead, we will keep using JSX.

JSX comes with the full power of JavaScript.
You can put *any* JavaScript expressions within braces inside JSX.
Each React element is a JavaScript object
that you can store in a variable or pass around in your program.

The `ShoppingList` component above only renders
built-in DOM components like `<div />` and `<li />`.
But you can compose and render whole shooping list by writing `<ShoopingList />`
Each React component is encapsulated and can operate independently;
this allows you to build complex UIs from simple components.

### Inspecting the Starter Code

If you're going to work on the tutorial **in your browser**,
open this code in a new tab:
[**Starter Code**](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).
If you're going to work on the tutorial **locally**,
instead open `src/index.js` in your project folder
(you have already touched this file during the setup).

This Starter Code is the base of what we're building.
We've provided the CSS styling
so that you only need to focus on learning React
and programming the tic-tac-toe game.

By inspecting the code, you'll notice that we have three React components:

-   Square
-   Board
-   Game

The Square component renders a single `<button>` and Board renders 9 squares.
The Game component renders a board with placeholder values
which we'll modify later. There are currently no interactive components.

### Passing Data Through Props

To get our feet wet, let's try passing some data
from our Board component to our Square component.

We strongly recommend typing code by hand
as you're working through the tutorial and not using copy/past.
This will help you develop muscle memory and a stronger understanding.

In Board's `renderSquare` method,
change the code to pass a prop called `value` to the Square:

```jsx
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

Change Square's `render` method to show that
value by replacing `{/* TODO */}` with `{this.props.value}`:

```jsx
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

Congratulations! You've just  "passed a prop"
from a parent Board component to child Square component.
Passing props is how information flows in React apps, from parents to children.

### Making an Interactive Component

Let's fill the Square component with an "X" when we click it.
First, change the button tag
that is returned from the Square component's `render` function to this:

```jsx
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={function() {
          console.log('click');
        }}
      >
        {this.props.value}
      </button>
    );
  }
}
```

If you click on a Square now,
you should see 'click' in your browser's devtools console.

> **Note**
> 
> To save typing and avoid the
> [confusing behavior of this](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/),
> we will use the
> [arrow function syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
> for event handlers here
> and further below:
> 
> ```jsx
> class Square extends React.Component {
>   render() {
>     return (
>       <button className="square" onClick={() => console.log('click')}>
>         {this.props.value}
>       </button>
>     );
>   }
> }
> ```
> 
> Notice how with `onClick={() => console.log('click')}`,
> we're passing a *function* as the `onClick` prop.
> React will only call this function after a click.
> Forgetting `() =>`
> and writing `onCLick={console.log('click')}` is a common mistake,
> and would fire every time the component re-renders.

As a next step, we want the Square component to "remember"
that it got clicked, and fill it with an "X" mark.
To "remember" things, components use **state**.

React components can have state by setting `this.state` in their constructors.
`this.state` should be considered as private to a React component
that it's defined in.
Let's store the current value of the Square in `this.state`,
and change it when the Square is clicked.

First, we'll add a constructor to the class to initialize the state:

```jsx
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  // ...
}
```

> **Note**
> 
> In [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes),
> you need to alwats call `super`
> when defining the constructor of a subclass.
> All React component classes that have a `constructor`
> should start with a `super(props)` call

Now we'll change the Square's `render` method
to display the current state's value when clicked:

-   Replace `this.props.value` with `this.state.value`
    inside the `<button>` tag.
-   Replace `onClick={...}` event handler
    with `onClick={() => this.setState({ value: 'X' })}`.
-   Put the `className` and `onClick` props on separate lines
    for better readability.

After these changes, the `<button>` tag
that is returned by the Square's `render` methood looks like this:

```jsx
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({ value: 'X' })}
      >
        {this.state.value}
      </button>>
    );
  }
}
```

By calling `this.setState` from an `onClick` handler
in the Square's `render` method,
we tell React to re-render that Square whenever its `<button>` is clicked.
After the update, the Square's `this.state.value` will be `'X'`,
so we'll see the 'X' on the game board.
If you click ob any Square, an `X` should show up.

When you call `setState` in a component,
React automatically updates the child components inside of it too.

## Completing the Game

We now have the basic building blocks for our tic-tac-toe game.
To have a complete game,
we now need to alternate placing "X"s and "O"s on the board,
and we need a way to determine a winner.

### Lifting State Up

Currently, each Square component maintains the game's state.
To check for a winner,
we'll maintain the value of each of 9 squares in on location.

We may think that Board should just ask each Square for the Square's state.
Although this approach is possible in React,
we duscourage it because the code becomes difficult to understand,
susceptible to bugs, and hard to refactor.
Instead, the best approach is to store the game's state
in the parent Board component instead of in each Square.
The Board component can tell each Square what to display by passing a prop,
just like we did when we passed a number to each Square.

**To collect data form multiple children,**
**or to have two child components communicate with each other,**
**you need to declare the shared state in their parent component instead.**
**The parent component can pass the state back down to the children**
**by using props;**
**this keeps the child components in sync with each other**
**and with the parent component.**

Lifting state into a parent component is common
when React components are refactored -
let's take this opportunity to try it out.

Add a constructor to the Board
and set the Board's initial state
to contain an array of 9 nulls corresponding to the 9 squares:

```jsx
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

when we fill the voard in later,
the `this.state.squares` array will look something like this:

```js
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

The Board's `renderSquare` method currently looks like this:

```jsx
renderSquare(i) {
  return <Square value={i} />;
}
```

In the beginning, we passed the value prop down from the Board
to show numbers from 0 to 8 in every Square.
In a different previous step,
we replaced the numbers with an "X" mark determined be Square's own state.
This is why
Square currently ignores the `value` prop passed to it by the Board.

We will now use the prop passing mechanism again.
We will modify the Board to instruct each individual Square
about its current value (`'X'`, `'O'`, or `null`).
We have already defined the `squares` array in the Board's constructor,
and we will modify the Board's `renderSquare` method to read from it:

```jsx
renderSquare(i) {
  return <Square value={this.state.squares[i]} />
}
```

Each Square will noe receive a `value` prop
that will either be `'X'`, `'O'`, or `null` for empty squares.

Next, we need to change what happens when a Square is clicked.
The Board component now maintains which squares are filled.
We need to create a way for the Square to update the Board's state.
Since state is considered to be private to a component that defines it,
we cannot update the Board's state directly from Square.

Instead, we'll pass down a function from the Board to the Suqare,
and we'll have Square call that function when a square is clicked.
We'll change the `renderSquare` method in Board to:

```jsx
renderSquare(i) {
  return (
    <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
  );
}
```

> **Note**
> 
> We split the returned element into multiple lines for readability,
> and added parentheses so that JavaScript doesn't insert a semicolon
> after `return` and break our code.

Now we're passing down two props from Board to Square: `value` and `onClick`.
The `onClick` prop is a function that Square can call when clicked.
We'll make the following changes to Square:

-   Replace `this.state.value` with `this.props.value`
    in Square's `render` method
-   Replace `this.setState()` with `this.props.onClick()`
    in Square's `render` method
-   Delete the `constructor` from Square
    because Square no longer keeps track of the game's state

After these changes, the Square component looks like this:

```jsx
class Square extends React.Component {
  render() {
    return(
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

When a Square is clicked,
the `onClick` function provided by the Board is called.
Here's a review of how this is achieved:

1.  The `onClick` prop on the built-in DOM `<button>` component
    tells React to set up a click event listener.
2.  When the button is clicked, React will call `onClick` event handler
    that is defined in Square's `render` method.
3.  This event handler calls `this.props.onClick()`.
    The Square's `onClick` prop was specified by the Board.
4.  Since the Board passed `onClick={() => this.handleClick(i)}` to Square,
    the Square calls the Board's `handleClick(i)` when clicked.
5.  We have not defined the `handleClick()` method yet, so our code crashed.
    If you click a square now,
    you should see a red error screen saying something
    like "this.handleClick is not a function."

> **Note**
> 
> The DOM `<button>` element's `onClick` attribute
> has a special meaning to React beacause it is a built-in component.
> For custom components like Square, the naming is up to you
> We could give ant name to the Square's `onClick` prop
> or Board's `handleClick` method, and the code would work the same.
> In React,
> it's conventional to use `on[Event]` names for props which represent events
> and `handle[Event]` for the methods which handle the events.

When we try to click a Square,
we should get an error because we haven't defined `handleClick` yet.
We'll now add `handleClick` to the Board class:

```js
// Board
handleClick(i) {
  const squares = this.state.squares.slice();
  squares[i] = 'X';
  this.setSate({ squares: squares });
}
```

After these changes, we're again able to click on the Squares to fill them,
the same as we had before.
However, now the state is stored in the Board component
instead of the individual Square components.
When the Board's state changes, the Square components re-render automatically.
Keeping the state of all squares in the Board component
will allow it to determine the winner in the future.

Since the Square components no longer maintain state,
the Square components receive values from the Board component
and inform the Board component when they're clicked.
In React terms, the Square components are now **controlled components**.
The Board has full control over them.

Note how in `handleClick`,
we call `.slice()` to create a copy of the `squares` array to modify
instead of modifying the existing array.
We will explain
why we create a copy of the `squares` array in the next section.

### Why Immutability Is Important

In the previous code example,
we suggested that you create a copy of the `squares` aray
using the `slice()` method instead of modifying the existing array.
We'll now discuss immutability and why immutability is important to learn.

There are generally two approaches to changing data.
The first approach is to *mutate* the data
by directly changing the data's values.
The second approach is to replace the data with a new copy
which has the desired changes.

#### Data Change with Mutation

```js
var player = { score: 1, name: 'Jeff' };
player.score = 2;
// Now player is { score: 2, name: 'Jeff' }
```

#### Data Change without Mutation

```js
var player = { score: 1, name: 'Jeff' };

var newPlayer = Object.assign({}, player, { score: 2 });
// Now player is unchanged, but newPlayer is { score: 2, name: 'Jeff' }

// Or if you are using object spread syntax proposal, you can write:
var newPlayer = { ...player, score: 2 };
```

The end result is the same but by not mutating
(or changing the underlying data) directly,
we gain several benefits described below.

#### Complex Features Become Simple

Immutability makes complex features much easier to implement.
Later in this tutorial, we will implement a "time travel" feature
that allows us to review the tic-tac-toe game's history
and "jump back" to previous versions of the game's history intact,
and reuse them later.

#### Detecting Changes

Detecting changes in mutable objects is difficult
because they are modified directly.
This detection requires the mutable object
to be compared to previous copies of itself
and the entire object tree to be traversed.

Detecting changes in immutable objects is considerably easier.
If the immutable object that is being referenced is different
than the previous one, then the object has changed.

#### Determining When to Re-Render in React

The main benefit of immutability is
that is helps you build *pure components* in React.
Immutable data can easily determine if changes have been made,
which helps to determine when a component requires re-rendering.

You can learn more about `shouldComponentUpdate()`
and how you can build *pure components*
by reading [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html#examples).

### Function Components

We'll now change the Square to be a **function component**.

In React, **function components** are a simpler way to write components
that only contain a `render` metho and don't have their own state.
Instead of defining a class which extends `React.Component`,
we can write a function that takes `props` as input
ad returns what should be rendered.
Function components are less tedious to write than classes,
and many components can be eexpressed this way.

Replace the Square class with this function:

```jsx
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

We have chaged `this.props` to `props` both times it appears.

> **Note**
> 
> When we modified the Square to be a function component,
> we also changed `onClick={() => this.props.onClick()}`
> to a shorter `onClick={props.onClick}`
> (note the lack of parentheses on both sides).

### Taking Turns

We now need to fix an obvious defect in our tic-tac-toe game:
the "O"s cannot be marked on the board.

We'll set the first move to be "X" by default.
We can set this default by modifying the initial state in our Board constructor:

```jsx
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
}
```

Each time a player moves, `xIsNext` (a boolean) will be flipped to determine
which player goes next and the game's state will be saved.
We'll update the Board's `handleClick` function to flip the value of `xIsNext`:

```js
handleClick(i) {
  const squares = this.state.squares.slice();
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    squares: squares,
    xIsNext: !this.state.xIsNext,
  });
}
```

With this change, "X"s and "O"s can take turns. Try it!

Let's also change the "staus" text in Board's `render`
so that it displays which player has the next turn:

```js
render() {
  const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  return (
    // ...
  );
}
```

### Declaring a Winner

Now that we show which player's turn is next,
we should also show when the game is won
and there are no more turns to make.
Copy this helper function and paste it at the end of the file:

```js
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

Given an array of 9 squares,
this function will check for a winner
and return `'X'`, `'O'`, or `null` as appropriate.

We will call `calculateWinner(squares)` in the Board's `render` function
to check if a player has won.
If a player has won,
we can display text such as "Winner: X" or "Winner: O".
We'll replace the `status` declaration
in Board's `render` function with this code:

```js
render() {
  const winner = calculateWinner(this.state.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next plater: ' + (this.state.xIsNext ? 'X' : 'O');
  }

  return (
    // ...
  );
}
```

We can now change the Board's `handleClick` function
to return early by ignoring a click if someone has won the game
or if a Square is already filled:

```js
handleClick(i) {
  const squares = this.state.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    squares: squares,
    xIsNext: !this.state.xIsNext,
  });
}
```

Congratulations! You now have a working tic-tac-toe game.
And you've just learned the basics of React too.
So *you're* probably the real winner here.
