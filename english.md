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
