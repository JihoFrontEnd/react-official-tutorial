# React Tic-Tac-Toe

###### https://ko.reactjs.org/tutorial/tutorial.html

## 개요

### React란 무엇인가요?

React는 사용자 인터페이스를 구축하기 위한 선언적이고 효율적이며 유연한 JavaScript 라이브러리입니다.
"컴포넌트"라고 불리는 작고 고립된 코드의 파편을 이용하여 복잡한 UI를 구성하도록 돕습니다.

React는 몇 가지 종류의 컴포넌트를 가지지만
우리는 React.Component의 하위 클래스를 사용해보겠습니다.

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

// 사용 예제: <ShoppingList name="Mark" />
```

XML과 유사한 재밌는 태그를 사용할 것입니다.
우리는 컴포넌트를 사용하여 React에게 화면에 표현하고 싶은 것이 무엇인지 알려줍니다.
데이터가 변경될 때 React는 컴포넌트를 효율적으로 업데이트하고 다시 렌더링합니다.

여기에서 ShoppingList는 **React 컴포넌트 클래스** 또는 **React 컴포넌트 타입**입니다.
개별 컴포넌트는 `props`라는 매개변수를 받아오고
`render` 함수를 통해 표시할 뷰 계층 구조를 반환합니다.

`render` 함수는 화면에서 보고자 하는 *내용*을 반환합니다.
React는 설명을 전달받고 결과를 표시합니다.
특히 `render`는 렌더링할 내용을 경량화한 **React 엘리먼트**를 반환합니다.
다수의 React 개발자는 "JSX"라는 특수한 문법을 사용하여 React의 구조를 보다 쉽게 작성합니다.
`<div />`구문은 빌드하는 시점에서 `React.createElement('div')`로 변환됩니다.
위에서 본 예시는 아래와 같이 변화합니다.

```js
return React.createElement(
  'div',
  { className: 'shopping-list' },
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */),
);
```

> 전체 코드
> 
> ```js
> /*#__PURE__*/
> React.createElement(
>   "div",
>   { className: "shopping-list" },
>   /*#__PURE__*/
>   React.createElement("h1", null, "Shopping List for ", props.name),
>   /*#__PURE__*/
>   React.createElement(
>     "ul",
>     null,
>     /*#__PURE__*/React.createElement("li", null, "Instagram"),
>     /*#__PURE__*/React.createElement("li", null, "WhatsApp"),
>     /*#__PURE__*/React.createElement("li", null, "Oculus")
>   )
> );
> ```

`createElement()`에 대해 궁금한 점이 있다면
[API 참조](https://ko.reactjs.org/docs/react-api.html#createelement)에서
자세한 설명을 확인할 수 있습니다.
하지만 자습서에는 이 방식이 아니라 JSX를 계속 사용할 것입니다.

> `createElement()`
> ```js
> React.createElement(
>   type,
>   [props],
>   [...children]
> );
> ```
> 인자로 주어지는 타입에 따라 새로운
> [React 엘리먼트](https://ko.reactjs.org/docs/rendering-elements.html)
> 를 생성하여 반환합니다.
> type 인자로는 태그 이름 문자열(`div` 또는 `span` 등),
> [React 컴포넌트 타입](https://ko.reactjs.org/docs/components-and-props.html),
> 또는 [React Fragment 타입](https://ko.reactjs.org/docs/react-api.html#reactfragment)
> 중 하나가 올 수 있습니다.
>
> JSX로 작성된 코드는 `React.createElement()`를 사용하는 형태로 변환됩니다.
> JSX를 사용할 경우 `React.createElement()`를 직접 호출하는 일은 거의 없습니다.
> 자세한 정보는
> [JSX 없이 React 사용하기](https://ko.reactjs.org/docs/react-without-jsx.html)
> 문서에서 확인할 수 있습니다.

JSX는 JavaScript의 강력한 기능을 가지고 있습니다.
JSX 내부의 중괄호 안에 *어떤* JavaScript 표현식도 사용할 수 있습니다.
React 엘리먼트는 JavaScript 객체이며 변수에 저장하거나 프로그램 여기저기에 전달할 수 있습니다.

`ShoppingList` 컴포넌트는 `<div />`와 `<li />` 같은 내각 DOM 컴포넌트만을 렌더링하지만
컴포넌트를 조합하여 커스텀 React 컴포넌트를 렌더링하는 것도 가능합니다.
예를 들어 `<ShoppingList />`를 작성하여 모든 쇼핑 목록을 참조할 수 있습니다.
React 컴포넌트는 캡슐화되어 독립적으로 동작할 수 있습니다.
이러한 이유로 단순한 컴포넌트를 사용하여 복잡한 UI를 구현할 수 있습니다.

### 초기 코드 살펴보기

**브라우저에서** 자습서 작성을 하는 경우
새 탭에서 [초기 코드](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)를 열어주세요.
**로컬 환경에서** 진행하는 경우 프로젝트 폴더에서 `src/index.js`를 열어주세요(이 파일은
[설정](https://ko.reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment)에서
다룬 적이 있습니다).

초기 코드는 제작할 틱택토의 기본 틀입니다.
CSS 스타일은 제공되기 때문에 React를 배우는 것과 게임을 프로그래밍하는 데에만 집중하면 됩니다.

코드를 살펴보면 세 가지 React 컴포넌트를 확인할 수 있습니다.
-   Square
-   Board
-   Game

Square 컴포넌트는 `<button>`을 렌더링하고 Board는 사각형 9개를 렌더링합니다.
Game 컴포넌트는 게임판을 렌더링하며 나중에 수정할 자리 표시자 값을 가지고 있습니다.
지금은 사용자와 상호작용하는 컴포넌트가 없습니다.

### Props를 통해 데이터 전달하기

본격적으로 시작하기 위해 Board 컴포넌트에서 Square 컴포넌트로 데이터를 전달해 봅시다.

자습서를 따를 때 복사/붙여넣기가 아니라 손으로 직접 코드를 작성하길 추천합니다.
이렇게 하면 코드를 몸으로 기억하고 이해력을 더 높일 수 있습니다.

Square에 `value` prop을 전달하기 위해 Board의 `renderSquare` 함수 코드를 수정해주세요.

```jsx
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

값을 표시하기 위해 Square의 `render` 함수에서
`{/* TODO */}`를 `{this.props.value}`로 수정해주세요.

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

변경 후에는 렌더링 된 결과에서 각 사각형에 숫자가 표시됩니다.

축하합니다! 부모 Board 컴포넌트에서 자식 Square 컴포넌트로 "prop을 전달"했습니다.
props 전달하기는 React 앱에서 부모에서 자식으로 정보가 어떻게 흘러가는지 알려줍니다.

### 사용자와 상호작용하는 컴포넌트 만들기

Square 컴포넌트를 클릭하면 "X"가 체크되도록 만들어봅시다.
먼저 Square 컴포넌트의 `render` 힘수에서 반환하는 버튼 태그를 아래와 같이 변경해주세요.

```jsx
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={function() { console.log('click'); }}
      >
        {this.props.value}
      </button>
    );
  }
}
```

Square를 클릭하면 'click'이 브라우저 개발자 도구의 콘솔에 출력되는 걸 확인할 수 있습니다.

다음 단계로 Square 컴포넌트를 클릭한 것을 "기억하게" 만들어 "X" 표시를 채워 넣으려고 합니다.
무언가를 "기억하기" 위해 component는 **state**를 사용합니다.

React 컴포넌트는 생성자에 `this.state`를 설정하는 것으로 state를 가질 수 있습니다.
`this.state`는 정의된 React 컴포넌트에 대해 비공개로 간주해야 합니다.
이제 Square의 현재 값을 `this.state`에 저장하고 Square를 클릭하는 경우 변경하겠습니다.

우선 클래스에 생성자를 추가하여 state를 초기화합니다.

```jsx
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  render() {
    return (
      <button className="square" onClick={() => console.log('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

> **주의**
> 
> [JavaScript 클래스](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)에서
> 하위 클래스의 생성자를 정의할 때 항상 super를 호출해야합니다.
> 모든 React 컴포넌트 클래스는 `생성자`를 가질 때 `super(props)` 호출 구문부터 작성해야 합니다.

이제 Square를 클릭할 때 현재 state 값을 표시하기 위해 render 함수를 변경할 것입니다.

-   `<button>` 태그 안 `this.props.value`를 `this.state.value`로 변경해주세요.
-   `onClick={...}` 이벤트 핸들러를
    `onClick={() => this.setState({ value: 'X' })}`로 변경해주세요.
-   가독성을 높이기 위해 `className`과 `onClick` props를 별도의 줄에 넣어주세요.

이와 같은 변경 후에 Square의 `render` 함수에서 반환하는 `<button>` 태그는 아래의 형태와 같습니다.

```jsx
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({ value: 'X' })}
      >
        {this.state.value}
      </button>
    );
  }
}
```

Square의 `render` 함수 내부에서 `onClick` 핸들러를 통해
`this.setState`를 호출하는 것으로 React에게 `<button>`을 클릭할 때
Square가 다시 렌더링해야 한다고 알릴 수 있습니다.
업데이트 이후에 Square의 `this.state.value`는 `'X'`가 되어
게임 판에서 `X`가 나타나는 것을 확인할 수 있습니다.
어떤 Square를 클릭하던 `X`가 나타날 것입니다.

컴포넌트에서 `setState`를 호출하면 React는 자동으로 컴포넌트 내부에 자식 컴포넌트 역시 업데이트합니다.

## 게임 완성하기

이제 틱택토 게임을 위한 기본 구성 요소를 가지고 있습니다.
완전한 게임을 위해 게임판의 "X"와 "O"를 번갈아 표시할 필요가 있으며
승자를 결정하는 방법이 필요합니다.

### State 끌어올리기

현재 게임의 state를 각각의 Square 컴포넌트에서 유지하고 있습니다.
승자를 확인하기 위해 9개 사각형의 값을 한 곳에 유지할 것입니다.

Board가 각 Square의 state를 요청해야 한다고 생각할 수도 있습니다.
그리고 React에서 이런 접근이 가능하기는 하지만
이 방식은 코드를 이해하기 어렵게 만들고 버그에 취약하며 리팩토링이 어렵기 때문에 추천하지 않습니다.
각 Square가 아닌 부모 Board 컴포넌트에 게임의 상태를 저장하는 것이 가장 좋은 방법입니다.
각 Square에 숫자를 넘겨주었을 때와 같이
Board 컴포넌트는 각 Square에게 prop을 전달하는 것으로 무엇을 표시할지 알려줍니다.

**여러 개의 자식으로부터 데이터를 모으거나 두 개의 자식 컴포넌트들이 서로 통신하게 하려면**
**부모 컴포넌트에 공유 state를 정의해야 합니다.**
**부모 컴포넌트는 props를 사용하여 자식 컴포넌트에 state를 다시 전달할 수 있습니다.**
**이것은 자식 컴포넌트들이 서로 또는 부모 컴포넌트와 동기화 하도록 만듭니다.**

state를 부모 컴포넌트로 끌어올리는 것은 React 컴포넌트를 리팩토링할 때 흔히 사용합니다.
이번 기회에 시험해 보겠습니다.

Board에 생성자를 추가하고 9개의 사각형에 해당하는 9개의 null 배열을 초기 state로 설정해주세요.

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

나중에 board를 채우면 `this.state.squares` 배열은 이래와 같이 보일 것입니다.

```js
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

Board의 `renderSquare` 함수는 현재 아래와 같은 상태입니다.

```jsx
renderSquare(i) {
  return <Square value={i} />;
}
```

처음에는 모든 Square에서 0부터 8까지의 숫자를 보여주기 위해
Board에서 value prop을 자식으로 전달했습니다.
또 다른 이전 단계에서는 숫자를 Square의 자체 state에 따라 "X" 표시로 바꾸었습니다.
그렇기 때문에 현재 Square는 Board에서 전달한 value prop을 무시하고 있습니다.

이제 prop을 전달하는 방법을 다시 사용할 것입니다.
각 Square에게 현재 값 (`'X'`, `'O'`, 또는 `null`)을 표현하도록 Board를 수정할 것입니다.
Board의 생성자에서 `squares` 배열을 이미 선언했으며
`renderSquare` 함수를 아래와 같이 수정할 것입니다.

```jsx
renderSquare(i) {
  return <Square value={this.state.squares[i]} />;
}
```

Square는 이제 빈 사각형에 `'X'`, `'O'`, 또는 `null`인 `value` prop을 받습니다.

다음으로 Square를 클릭할 때 발생하는 변화가 필요합니다.
Board 컴포넌트는 어떤 사각형이 채워졌는지 여부를 관리하므로
Square가 Board를 변경할 방법이 필요합니다.
컴포넌트는 자신이 정의한 state에만 접근할 수 있으므로
Square에서 Board의 state를 직접 변경할 수 없습니다.

대신에 Board에서 Square로 함수를 전달하고 Square는 사각형을 클릭할 때 함수를 호출할 것입니다.
이제 Board의 `renderSquare` 함수를 아래와 같이 변경해주세요.

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

> **주의**
> 
> 반환되는 엘리먼트를 여러 줄로 나누어 가독성을 확보하였고
> 괄호를 추가하여 JavaScript가 `return` 뒤에 세미콜론을 삽입하지 않아도 코드가 깨지지 않습니다.

이제 Board에서 Square로 `value`와 `onClick` 두 개의 props를 전달하였습니다.
`onClick` prop은 Square를 클릭하면 호출되는 함수입니다.
Square를 아래와 같이 변경해주세요.

-   Square의 `render` 함수 내부의 `this.state.value`를
    `this.props.value`로 바꾸어주세요.
-   Square의 `render` 함수 내부의 `this.setState()`를
    `this.props.onClick()`으로 바꾸어주세요.
-   Square는 게임의 상태를 유지할 필요가 없기 때문에 `constructor`를 지워주세요.

이렇게 바꾼 후에 Square는 아래와 같은 모습이 됩니다.

```jsx
class Square extends React.Component {
  render() {
    return (
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

Square를 클릭하면 Board에서 넘겨받은 onClick 함수가 호출됩니다.
이때 일어나는 일을 정리해보겠습니다.

1.  내장된 DOM `<button>` 컴포넌트에 있는 `onClick` prop은
    React에게 클릭 이벤트 리스너를 설정하라고 알려줍니다.
2.  버튼을 클릭하면 React는 Square의 `render` 함수에 정의된
    `onClick` 이벤트 핸들러를 호출합니다.
3.  이벤트 핸들러는 `this.props.onClick()`을 호출합니다.
    Square의 `onClick` prop은 Board에서 정의되었습니다.
4.  Board에서 Square로 `onClick={() => this.handleClick(i)}`를 전달했기 때문에
    Square를 클릭하면 Board의 `handleClick(i)`를 호출합니다.
5.  아직 `handleClick`을 정의하기 않았기 때문에 코드가 깨질 것입니다.
    지금은 사각형을 클릭하면 "this.handleCLick is not a function"과 같은 내용을 표시하는
    붉은 에러 화면을 보게 됩니다.

> **주의**
>
> DOM `<button>` 엘리먼트의 `onClick` 어트리뷰트는
> 내장된 컴포넌트라는 점에서 React에게 특별한 의미가 있습니다.
> Square 같은 사용자 정의 컴포넌트의 경우 이름 지정은 자유롭습니다.
> Square의 `onClick` prop이나 Board의 `handleClick` 함수에는 어떤 이름도 붙일 수 있으며
> 코드는 동일하게 작동합니다.
> React에서 이벤트를 나타내는 prop에는 `on[Event]`,
> 이벤트 처리하는 함수에는 `handle[Event]`를 사용하는 것이 일반적입니다.

`handleClick`을 아직 정의하지 않았기 때문에 Square를 클릭하려고 할 때 에러가 발생합니다.
이제 Board 클래스에 `handleClick`을 추가하겠습니다.

```jsx
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  ////
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({ squares: squares });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

이제 이전과 마찬가지로 Square를 클릭하여 사각형을 채울 수 있습니다.
그러나 이제는 state가 각 Square 컴포넌트 대신에 Board 컴포넌트에 저장됩니다.
Board의 상태가 변화할 때 Square 컴포넌트는 자동으로 다시 렌더링합니다.
Boaed 컴포넌트의 모든 사각형의 상태를 유지하는 것으로 이후에 승자를 결정하는 것이 가능합니다.

Square 컴포넌트가 더 이상 state를 유지하지 않기 때문에
Square 컴포넌트는 Board 컴포넌트에서 값을 받아 클릭될 때 Board 컴포넌트로 정보를 전달합니다.
React 용어로 Square 컴포넌트는 이제 **제어되는 컴포넌트**입니다.
Board는 이들을 완전히 제어합니다.

`handleClick`에서는 `.slice()`를 호출하는 것으로 기존 배열을 수정하지 않고
`squares` 배열의 복사본을 생성하여 수정하는 것에 주의해주세요.
왜 `squares` 배열의 사본을 생성하였는지 다음 단락에서 설명하겠습니다.

### 불변성이 왜 중요할까요?

이전 코드 예시에서 기존 배열을 수정하는 것이 아니라 `.slice()` 연산자를 사용하여
`squares` 배열의 사본 만들기를 추천했습니다.
지금부터 불변성이 무엇인지와 왜 불변성이 중요한지 알아보겠습니다.

일반적으로 데이터 변경에는 두 가지 방법이 있습니다.
첫 번째는 데이터의 값을 직접 *변경*하는 것입니다.
두 번째는 원하는 변경 값을 가진 새로운 사본으로 데이터를 교체하는 것입니다.

> ***객체 변경을 통해 데이터 수정하기***
> ```js
> var player = { score: 1, name: 'Jeff' };
> player.score = 2;
> // 이제 player는 { score: 2, name: 'Jeff' }입니다.
> ```
> 
> ***객체 변경 없이 데이터 수정하기***
> ```js
> var player = { score: 1, name: 'Jeff' };
> var newPlayer = Object.assign({}, player, { score: 2 });
> // 이제 player는 변하지 않았지만 newPlayer는 { score: 2, name: 'Jeff' }입니다.
> 
> // 객체 spread 구문을 사용한다면 이렇게 쓸 수 있습니다.
> // var newPlayer = { ...player, score: 2 };
> ```

최종 결과는 동일하지만 직접적인 객체 변경이나 기본 데이터의 변경을 하지 않는다면
아래에 기술된 몇 가지 이점을 얻을 수 있습니다.

#### 복잡한 특징들을 단순하게 만듦

불변성은 복잡한 특징들을 구현하기 쉽게 만듭니다.
자습서에서는 "시간 여행" 기능을 구현하여 틱택토 게임의 이력을 확인하고
이전 동작으로 "되돌아갈 수 있습니다".
이 기능은 게임에만 국한되지 않습니다.
특정 행동을 취소하고 다시 실행하는 기능은 애플리케이션에서 일반적인 요구사항입니다.
직접적인 데이터 변이를 피하는 것은 이전 버전의 게임 이력을 유지하고 나중에 재사용할 수 있게 만듭니다.

#### 변화를 감지함

객체가 직접적으로 수정되기 때문에 복제가 가능한 객체에서 변화를 감지하는 것은 어렵습니다.
감지는 복제가 가능한 객체를 이전 사본과 비교하고 전체 객체 트리를 돌아야 합니다.

불변 객체에서 변화를 감지하는 것은 상당히 쉽습니다.
참조하고 있는 불변 객체가 이전 객체와 다르다면 객체는 변한 것입니다.

#### React에서 다시 렌더링하는 시기를 결정함

불변성의 가장 큰 장점은 React에서 *순수 컴포넌트*를 만드는 데 도움을 준다는 것입니다.
변하지 않는 데이터는 변경이 이루어졌는지 쉽게 판단할 수 있으며
이를 바탕으로 컴포넌트가 다시 렌더링할지를 결정할 수 있습니다.

`shouldComponentUpdate()`와 *순수 컴포넌트*를 작성하는 법에 대해 더 알아보고 싶다면
[성능 최적화하기](https://ko.reactjs.org/docs/optimizing-performance.html#examples)를
보세요.

### 함수 컴포넌트

이제 Square를 **함수 컴포넌트**로 바꿔보겠습니다.

React에서 **함수 컴포넌트**는 더 간단하게 컴포넌트를 작성하는 방법이며
state 없이 `render` 함수만을 가집니다.
`React.Component`를 확장하는 클래스를 정의하는 대신
`props`를 입력받아서 렌더링할 대상을 반환하는 함수를 작성할 수 있습니다.
함수 컴포넌트는 클래스로 작성하는 것보다 빠르게 작성할 수 있으며
많은 컴포넌트를 함수 컴포넌트로 표현할 수 있습니다.

Square 클래스를 아래의 함수로 바꿔보세요.

```jsx
function Square(props) {
  return (
    <button className="suqare" onClick={props.onClick}>
      {props.vlaue}
    </button>
  );
}
```

모든 `this.props`를 `props`로 변경하였습니다.

> **주의**
> 
> Square를 함수 컴포넌트로 수정했을 때
> `onClick={() => this.props.onClick()}`을
> `onClick={props.onClick}`로 간결하게 작성했습니다.
> *양쪽* 모두 괄호가 사라진 것에 주목해주세요.

### 순서 만들기

우리의 틱틱토 게임이 가진 큰 문제점을 고칠 시간입니다.
게임판에서 "O"가 표시되지 않는 점이죠.

첫 번째 차례를 "X"로 시작하겠습니다.
Board 생성자의 초기 state를 수정하는 것으로 기본값을 설정할 수 있습니다.

```js
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

플레이어가 수를 둘 때마다 `xIsNext`(boolean 값)이 뒤집혀
다음 플레이어가 누군지 결정하고 게임의 state가 저장될 것입니다.
Board의 `handleClick` 함수를 수정하여 `xIsNext` 값을 뒤집겠습니다.

```js
handleClick(i) {
  const squares = this.state.squares.slice();
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    squares,
    xIsNext: !this.state.xIsNext,
  });
}
```

이제 "X"와 "O"는 번갈아 나타납니다. 한 번 시도해보세요!

Board의 `render` 안에 있는 "status" 텍스트도 바꿔서
어느 플레이어가 다음 차례인지 알려주겠습니다.

```js
render() {
  const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  return (
    // ...
  );
}
```

### 승자 결정하기

이제 어떤 선수가 다음 차례인지 알려주었으니
승부가 나는 때와 더 이상 둘 곳이 없을 때를 알려주어야 합니다.
다음의 도우미 함수를 복사하여 파일 최하단에 붙여넣으세요.

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

9개의 사각형의 배열을 가지고 함수는 승자를 확인하여
적절한 값으로 `'X'`, `'O'`, 또는 `null`을 반환합니다.

어떤 플레이어가 우승했는지 확인하기 위해 Board의 `render` 함수에서
`calculateWinner(squares)`를 호출할 것입니다.
한 플레이어가 이긴다면 "Winner: X" 또는 "Winner: O" 같은 문구를 표시할 수 있습니다.
Board의 `render` 함수에서 선언한 `status`를 아래 코드로 바꿔주세요.

```js
render() {
  const winner = calcuateWinner(this.state.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  }

  return (
    // ...
  );
}
```

누군가 승리하거나 Square가 이미 채워졌다면
Board의 `handleClick` 함수가 클릭을 무시하도록 변경하겠습니다.

```js
handleClick(i) {
  const squares = this.state.squares.slice();
  if (calculateWinner(squares) || square[i]) {
    return;
  }
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    squares: squares,
    xIsNext: !this.state.xIsNext,
  });
}
```

축하합니다! 이제 제대로 동작하는 틱택토 게임을 만들었습니다.
그리고 React의 기본도 배웠습니다. 여기서 진정한 승자는 *여러분*인 것 같네요.
