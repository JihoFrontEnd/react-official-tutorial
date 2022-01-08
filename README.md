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

> #### 주의
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
