   react diff算法 -> fiber算法

   小贴士：小图标库 https://emojipedia.org/

0、`npx create-react-app test-react` //通过npx 使用create-react-app脚手架创建项目test-react  //npx 临时安装一个模块
  //此时如果执行 `npm run eject` ,则执行解包，把构建配置写入package.json,及生成config和scripts文件夹等，且解包后不能再打包回去了。解包之前的package.json里的scripts脚本命令也自动改变。 使用中根据需要选择是否解包配置。
  package.json文件dependencies中react-dom用于创建前端组件（app用react-native），react-scripts用于构建（底层封装的webpack）
1、定义组件的方式：
  ① 函数方式：
  ```javascript
    import React from 'react'
    import ReactDom from 'react-dom'
    //函数方式原理：
    // 1、初探: 将xml格式虚拟DOM直接赋值给一个变量
    // const app = <h1> welcome React 16.8 </h1>
    // 2、深入：是否可以灵活的动态改变虚拟dom的属性或子元素内容呢？ 
    //   2.1 定义成一个方法传参进去，然后返回该虚拟dom.
    //       const render = (props)=> <h1>Welcome {props.title}</h1>
    //   2.2 然后，创建组件时传入参数。
    //       const app = render({
    //           title:'React 16.8'
    //       })

    const App = (props)=>{
      return (
        <div>    {/* jsx 虚拟dom元素不要加引号*/}
           {/* 只要是jsx里要插入js代码,加一层花括号(包括注释),两种语法格式且可嵌套交替使用*/}
          <h1 title={props.title}>Welcome {props.title}！！！</h1>
        </div>
      )
    }
    
    //将虚拟dom组件渲染到网页真正dom树上
    ReactDom.render(
      <App title='ksfg' />,
      document.querySelector('#root')  //渲染到public/index.html
      // ,callback
    )
  ```
  ② 类继承React.Component: 常用(因为其可以构建状态和管理、声明周期设置等)
  ```javascript
    import React, {Component} from 'react' 
    import { render} from 'react-dom'
    class App extends Component {
      render(){ //React.Component提供的方法
        <div>
          <h1>类组件</h1>
          <p>{this.props.title}</p>
        </div>
      }
    }


    //将虚拟dom组件渲染到网页真正dom树上
    render(
      <App title='类组件继承自React.Component' />
      document.querySelector('#root')
    )
  ```
2、jsx 编译原理：
  ① 创建虚拟dom树对象
```javascript
    const vdom = {
      tag: 'div',
      attrs:{
        className: ['active',''],
        id:'root'
      },
      children:[
        {
          tag:'',
          attrs:{},
          children:[
            {...}
          ]
        }
      ]
    }
```
  ② 调用 `React.createElement(type,attrs={},[...children])`方法 把vdom树渲染到页面;
  ③ `React.createElement()` 方法内部根据 children 递归调用该方法把所有dom元素渲染出来。

3、jsx中添加类样式的方式：
  ① 添加内联样式
```javascript
    const color = { color：'#F00'}
    <p style={color}>添加样式1</p>
    或 <p style={{color:'#F00'}}>添加样式1</p> //JS语句写入大括号内
```
  ② 添加外部引入css文件
```javascript
    import './index.css'
    <p className="color-red">添加样式1</p>
```
  ③ 动态(是否)添加样式 （`npm i classnames -S`）
```javascript
    import classnames from 'classnames'
    <p className={classnames('a',{'b':true,'c':false})}>添加样式1</p>  
    {/*添加了'a'和'b'样式*/}
```
  ④ styled-components插件标签方式添加样式 （`npm i styled-components -S`）
```javascript
    import styled from 'styled-components'
    const Title = style.h1`
      color:#F00
    `
    <Title>添加样式1</Title>
```
  ⑤ styled-jsx 插件 jsx方式添加样式


4、何时不能使用函数式组件
  ① 有状态 state 时；
  ② 要使用生命周期钩子时；
  ③ 需要使用 ref 时(因为ref要挂到实例上，函数式组件不能创建实例,但你可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件)；
  .....


5、在受控组件上指定 value 的 prop 可以防止用户更改输入。如果指定了 value，但输入仍可编辑，则可能是意外地将value 设置为 undefined 或 null。

6、正确地使用 State
  ① 不要直接修改 State ，不会重新渲染组件 ，而是应该使用 setState() 。构造函数是唯一可以给 this.state 赋值的地方。
  ② State 的更新可能是异步的，出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用 。 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态 ，要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数 。
  ③ State 的更新会被合并 ， 当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。

7、 向事件处理程序传递参数
```javascript
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
  上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。

8、ref 和回调 refs
  ① Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

  ② 回调 Refs :
```javascript
    function CustomTextInput(props) {
        return (
            <div>
            <input ref={props.inputRef} />
            </div>
        );
    }

    class Parent extends React.Component {
        render() {
            return (
            <CustomTextInput
                inputRef={el => this.inputElement = el}
            />
            );
        }
    }
```

9、 去除某频繁改动的组件的不必要的重复渲染
    ① 把该组件改为 PureComponent 先进行前比较（一般就不会再重复多次渲染了）
    ② 使用 shouldComponentUpdate 进行再比较
```javascript
    shouldComponentUpdate ( nextProps,nextState){
        return (nextProps.xxx !== this.props.xxx) || (nextState.yyy !== this.state.yyy)
    }
```
    比如：下面这样在TodoList中某个 ListItem 改变就不会渲染所有的 ListItem 了。
```javascript
    import React, { PureComponent } from 'react'
    const noop = ()=>{}
    export default class ListItem extends pureComponent {
        handleCheckboxChange = ()=>{
             /* this.props.completedChange && this.props.completedChange(this.props.id) */
            const { completedChange=noop, id } = this.props
            /* completedChange && completedChange(id) */
            completedChange(id)
        }
        handleDeleteItem = ()=>{
            this.props.deleteItem(this.props.id)
        }
        render() {
            return (           
                <li>
                    <input type="checkbox" checked={this.props.isCompleted} onChange={ this.handleCheckboxChange} />
                    <span> {this.props.title} {this.props.isCompleted?'已完成😂':'未完成😢'} </span>  
                    <button  onClick={ this.handleDeleteItem} >删除 </button>               
                </li>
    
            )
        }
    }
```

10 周期钩子`static getDerivedStateFromProps (props){}` 的用法，示例：
```javascript
   static  getDerivedStateFromProps (props){
       return {
            completedText: props.isCompleted ? '完成' : '未完成'
       }
   }
```
11、 函数式组件也能添加状态了（React新特性 hook ，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。）
```javascript
import React, { useState, useEffect} from 'react'    // useState和 useEffect 是 hook 常见的两个API
const Counter = ()=> {
    const [count,setCount] = useState(0)  //useState是一个方法，该方法的参数就是默认值，结果是一个数组，数组的第一个参数就是state，第二个就相当于setState
    const [title,setTitle] = useState('数字递增或递减') //一个函数式组件可以有多个state
    useEffect(()=>{
      // useEffect 的参数是一个回调函数，不管组件挂载还是更新，都会触发这个回调，类似于 componentDidMount 和 componentDidUpdate 的结合
      console.log('渲染了')
      document.title = '当前的数是${count}'
    })
    return (
      <div>
        <p>{title}</p>
        { /* 这里的setCount就是useState所生成的方法，注意和setState不同的地方在于参数，这里的参数就是一个新值即可 */}
        <button onClick={()=>{ setCount(count-1)}}> - </button>
        <span>{count}</span>
        <button onClick={()=>{ setCount(count+1)}}> + </button>
      </div>
    )
}
```
12、context 全局传参 （不过一般用redux），示例如下：
```javascript
    // createContext 是react 提供的用于跨多级组件传值的方法
    import React , {Component, createContext} from 'react'
    import {render} from 'react-dom'

    // createContext 这个方法的结果是一个对象，里面有两个组件：Provider 和 Consumer ， 其中 Provider 用于提供状态， Consumer 用于接收状态
    const {
      Provider,
      Consumer: CounterConsumer  
      // 解构出来的 Consumer 重新赋值为 CounterConsumer 组件
    } = createContext()
    
    // 封装 Provider ，因为直接使用 Provider 不方便管理状态
    class CounterProvider extends Component {
      constructor(){
        super()
        // 这里的状态是共享的，任何 CounterProvider 的后代组件都可以通过 CounterConsumer 来接收 Provider提供的 value 值。
        this.state = {
          count: 100
        }
      }
      
      //下面的两个方法也可以 传递下去
      incrementCount = () =>{
        this.setState({
          count: this.state.count + 1
        })
      }
      
      decrementCount = () =>{
        this.setState({
          count: this.state.count - 1
        })
      }
    
      render (){
        return (
          // 使用Provider 组件，必须要有一个 value 值，用于向后代组件传值，一般是一个对象，因为对象比较灵活。
          <Provider value={{
            this.state.count,
            onIncrementCount: this.incrementCount
            onDecrementCount: this.decrementCount
            }}>
            { this.props.chidren}
          </Provider>
        )
      }
    }
    
    class Counter extends Component {
      render (){
        return (
          // Provider 的后代组件通过 Consumer 组件来接收 Provider 提供的 value 值
          <CounterConsumer>
            {
              //  注意！ Consumer 的 children 必须是一个方法，且该方法接收的参数即是 Provider 的 value 值
              ({count})=>{   // 解构出 count
                return <span>{count}</span>
              }
            }
          </CounterConsumer>
        )
      }
    }
    
    class CountBtn extends Component {
      render (){
        return (
          {
            ({onIncrementCount,onDecrementCount}) => {
              const handlerClick = this.props.type === 'increment' ? onIncrementCount : onDecrementCount
              return <Button onClick ={ handlerClick}> {this.props.children} </Button>
            }
          }
          <Button > {this.props.chidren} </Button>
        )
      }
    }
    
    class App extends Component {
      render (){
        return (
          <>
            <CountBtn type="decrement" />
            <Counter />
            <CountBtn type="increment" />
          </>
        )
      }
    }
    
    render(
      // Provider 组件 向后代传值的形式
      <CounterProvider>
        <App />
      </CounterProvider>,
      document.getElementById('root')
    )
```
13、 HOC 高阶组件
```javascript
    import React ,{ Component} from 'react'

    const withCopyright = (YourComponent) =>{
      return class WithCopyright extends Component {
        render (){
          return (
            <>
              // 高阶组件拦截了 YourComponent 传入参数，再把参数还给 YourComponent（自己理解的 ）
              <YourComponent {...this.props} />
              <div> &copy; 2019 &emsp; 千锋教育 </div>
            </>
          )
        }
      }
    }
    
    @ withCopyright
    class YourComponent extends Component {
      render(){
        return (
          <div name="传递给高阶组件的值">
            要添加高阶组件的组件 
          </div>
        )
      }
    }
```
    让 create-react-app 支持@ 装饰器写法 ，需要做的配置：
    1、不管你是要配置什么，我们最好的方式是使用 react-app-rewired 这个包来对cra 创建 的项目进行略微 的配置调整, `npm install customize-cra --save-dev`
    2、 安装好之后，在package.json 里把 scripts 里的 react-scripts 替换成 react-app-rewired 
    3、 在根目录下创建一个 config-overrides.js
```javascript
        module.exports = (config) =>{
          // 如果没使用customize-cra,在这里配置
          return config
        }
```
    4、 当然如果想要配置更方便，可以再安装 customize-cra,`npm install customize-cra --save-dev`,然后把 config-overrides.js 改成这样
```javascript
        const {override,addDecoratorsLegacy} = require('customize-cra')
        module.exports = override(
          addDecoratorsLegacy()
        )
```
    5、 `npm i @babel/plugin-proposal-decorators -D`

14、 redux 
  ① Flux 架构思想
    * view 视图层 
    * ActionCreator(动作创造者) ： 视图层发出的消息（比如 mouseClick）
    * Dispatcher(派发器)： 用来接收 Actions 、 执行回调函数
    * Store(数据层)： 用来存放应用的状态，一旦发生变动，就提醒 Views 要更新页面
  ② Flux 的流程：
    1. 组件获取到store中保存的数据挂载在自己的状态上
    2、用户产生了操作，调用actions的方法
    3、actions接收到用户的操作，进行一系列的逻辑判断、异步操作
    4、然后actions会创建出对应的action，action带有标识性的属性
    5、actions调用dispatcher的dispatch方法,将action传递给dispatcher
    6、dispatcher接收到action并根据标识信息判断之后调用store的更改数据的方法
    7、store的方法被调用后，更改状态，并触发自己的某一个事件
    8、store更改状态后事件被触发，该事件的处理程序会通知view去获取最新的数据
  ③ Redux： Flux架构思想的一种实现
    Redux 使用的三大原则：
    1、single Source of Truth(唯一的数据源)
    2、State is read-only (状态是只读的)
    3、Changes are made with pure function(数据的改变必须通过纯函数完成)
  ④ redux 原理
```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title> Redux 原理 </title>
    </head>
    <body>
      <div>
        <button onClick="dispatch({type:"DECREASEMENT",n:2})">-</button>
        <span id="countDisplay">10</span>
        <button onClick="dispatch({type:"INCREASEMENT",n:1})">+</button>
      </div>
      <script>
        const countDisplay = document.querySelector('#countDisplay')
        const countState = {
          count: 5
        }
        const renderCount = (state) =>{
          countDisplay.innerHTML = state.count
        }
        renderCount(countState)

        const reducer = (state,action)=>{
          if(!state){
            return countState
          }
          switch(action.type){
            case 'DECREASEMENT':
              return {
                ...state,
                count: state.count - action.n
              }
            case 'INCREASEMENT':
              return {
                ...state,
                count: state.count + action.n
              }
            default:
              break
          }
        }
    
        const createStore = (reducer)=>{
          let state = null
          const getState = ()=> state
          const listeners = []
          const subscribe = (listener)=>listeners.push(listener)
          const dispatch = (action)=>{
            reducer(state,action)
            listeners.forEach(listener =>listener())
          }
          return {
            getState,
            subscribe,
            dispatch
          }
        }
    
        const store = createStore(reducer)
        store.subscribe(renderCount)
    
      </script>
    </body>
    </html>
```



* redux 和react-redux 使用流程： 创建reduers -> 合并reducers -> 创建`store=createStore(reducer)` -> 顶层组件通过Provider使用store，`<Provider store={store}> ` -> 后代组件通过 connect 接收store，`connect(mapStateToProps,{...actionCreators})(YourComponent)` -> 创建 action -> 根据action.type 配置actionCreators
* react-redux 处理流程： actionCreator -> 自动 dispatch(actionCreator()) -> reducer -> store -> view -> 自动 dispatch(actionCreator())...
* 处理异步action 流程： actionCreator -> middleware处理生成新的action -> 修改dispatch(action) -> reducer -> store -> view -> dispatch(actionCreator())

15、react-router

```javascript
import React from 'react'
import { render } from 'react-dom'
import { BrowerRouter as Router, Route } from 'react-router-dom'
import App from './App'

render(
    {/* Router 组件只用在顶层，Route组件用在各个要跳转的后代组件上*/}
    <Router>
        <Route component={App} path='/' />
    </Router>,
    document.querySelector('#root')
)
```

App.js:

```javascript
import React, {Component} from 'react'
import { Home,Article,User,NotFound} from './views'
import {ArticleDetail} from './Article/ArticleDetail'
// NavLink 组件比Link组件多了一个active的class,Redirect组件要搭配Switch使用
import {Route, NavLink as Link, Redirect, Switch } from 'react-router-dom'

export default class App extends Component {
    render(){
        return (
            <div>
                <ul>
                    <li> <Link to='/home'>首页</Link> </li>
                    <li> <Link to='article'>文章</Link> </li>
                    <li> <Link to='/user'>用户</Link></li>
                </ul>
                {/* Switch 组件包含的路由匹配成功一个，便返回不再往下匹配*/}
                <Switch>
                    {/* Route包含的组件默认都有history、props等属性 */}
                    <Route component={Home} path='/home' />
                    {/* 加入exact属性，表示不匹配子路由，默认是匹配该路径和其子路径的 */}
                    <Route component={Article} path='/article' exact />
                    {/* 匹配成功的话，这里的文章详情将覆盖Article */}
                    <Route component={ArticleDetail} path="/article/:id" />
                    {/* 用render渲染组件传递参数 */}
                    <Route render={(routeProps)=>{ 
                        return this.state.isLogin ? <User {...routeProps} /> : <div>请登录</div>}} path='/user' />
                    <Redirect to="/home" from="/" exact />
                    <Route Component={NotFound} path="/404" />
                    <Redirect to="/404" />
                </Switch>
            </div>
        )
    }
}
```

views/articles/index.js:

```javascript
import React,{Component} from 'react'
import { Link, Route } from 'react-dom'
//import ArticleDetail from './Article/ArticleDetail'
import {* as Home} from './backhome'
export default class Article extends Component {
    render(){
        return (
            <div>
            {/* query传参 */}
              <Link to="/article/1?from=article"> 文章1 </Link>
            {/* 隐式传参，比如可以做埋点 */}
              <Link to={{pathname:'artical/2',state:{ from:'article'}}}> 文章2 </Link> 
            
             {/* <Route component={ArticleDetail} path="/article/:id" /> */}

             <Home />
            </div>
        )
    }
}

goHome = ()=> {
    this.props.history.push({
        pathname:'/home',
        state:{
            id: this.props.match.params.id
        }
    })
}
```

backhome.js :

```javascript
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'

class BackHome extends Component {
    handleClick = () => {
        this.props.history.push({
            pathname: '/home',
            state:{
                id: this.props.match.params.id
            }
        })
    }
    render(){
        return (
            <button onClick={this.handleClick}>返回首页</button>
        )
    }
}
export default withRouter(BackHome)
```



16、常用富文本编辑器： KindEditor、   UEditor(百度的)、 wangeditor、 edit.md(支持markdown) 等

* 富文本编辑器原理：

```
    <button onclick="boldFont()">加粗<button> 
    <button onclick="italicFont()">倾斜<button> 
    <button onclick="redFont()">字体红色<button> 

    <div contenteditable style="border:1px solid #dedede; width:400px; min-height:300px;">
        <img src="http：//img5.imgtn.bding.com/it/u=394753335xxxxxxx&gp=0.jpg">
    </div>

    <!-- 老浏览器用<iframe designmode="on"  /> -->

    <script>
        var boldFont = function(){
            document.execCommand('bold')
        }
        var italicFont = function(){
            document.execCommand('italic')
        }
        var redFont = function(){
            document.execCommand('foreColor',null,'#f00')
        }
    </script>
```



17、数据可视化：1、canvas 位图  2、 svg 矢量图  3、 三维 webgl
           √4、echart 5、highcharts 6、d3 dataV antV 
           egret 游戏   rapheal.js等

18、数据深拷贝

```javascript
import {cloneDeep} from 'lodash'
const state = {
    name:'可通过assign方法浅拷贝的基本数据类型的数据，拷贝后的数据改变不影响源数据中该项的数据',
    items:['通过浅拷贝后实际是拷贝过去的该复杂数据的地址','拷贝后的数据中该复杂数据项改变的话，源数据跟着变化']
}
// const newState = JSON.parse(JSON.stringify(state))  //该深拷贝方式不能拷贝方法
const newState = cloneDeep(state)
console.log(newState === state)
```



19、 immutable  实现持久化数据结构    

*   immutable 插件中常用的数据类型有 Map 、List、Set等


```javascript
import {Map} from 'immutable'
const state={
    name:'map',
    value:['对象','方法'，'数组']
}
const imState = Map(state)
//比较两个数据结构的不同
console.log(state,imState)
//改变后必须要接收新的map对象
const newImState = imState.set('name','复杂数据作为键')
//map数据只能通过get获取
console.log(imState.get('name'),newImState.get('name'))

const map1 = Map({a:1,b:2});
const map2 = Map({a:1,b:2});
const map3 = map1.set('b',2);
const mapCopy = map1;
map1.equals(map2); // true
is(map1,map2); // true
map1 === map2; // false
map1 === map3; // true
```

```javascript
import {List} from 'immutable'
const list1 = List([1,2]);
const list2 = list1.push(3,3,4);
console.log(list1.get(4),list2.get(4)) // undefined 3

```

```javascript
import {fromJS,toJS} from 'immutable'
const state = {
    name: 'qf',
    courses:['h5','java','python'],
    obj:{
          x:1,
          y:{
              z:1
          }
        }
}

//复杂的JS数据类型转换为immutable，很常用
const imState = fromJS(state)  
console.log(imState.get('courses').get(0))
console.log(imState.getIn(['courses',0]))
console.log(imState.getIn(['obj','x','y']))
const newImState = imState.setIn(['obj','y','z'],100)
const newImState = imState.updateIn(['obj','y','z'],v=>v+1)
const jsState = newImState.toJS().obj.y.z

```

* 使用 immutable、react-immutable改造redux中reducer的state数据类型：

  ```
  1、 `npm i immutable redux-immutable -S`
  2、reducers文件夹counter.js中修改 
    import {combineReducers} from 'redux'  
   --->  import {combineReducers} from 'redux-immutable'
  3、reducers文件夹counter.js中修改
    const initState = { count:10 }  
   ---> import { fromJS} from 'immutable' 
        const initState = fromJS({ count:10 })
  4、reducers文件夹counter.js中修改 
     case 'INCREAMENT': return { ...state, count:state.count+1 }
    ---> case 'INCREAMENT': return  state.updateIn(['count'],v=>v+1)
     case 'DECREAMENT': return { ...state, count:state.count-1 }
    ---> case 'DECREAMENT': return  state.update('count',v=>v-1)
  5、在调用conncect的组件中修改
    const mapStateToProps = state =>{
        return {
            count:state.counter.count
           ---> count: state.getIn(['counter','count'])
        }
    }
  ```

  

20、mobx 更简单的状态管理，但它是直接修改状态,非纯函数有副作用

​      1、`npm i mobx mobx-react -S`

​      2、store.js:

```
 import {observable,computed,action} from 'mobx'
 class Counter {
   name = 'Counter App'
   @observable count = 100
   @computed get doubleCount(){
     return this.count*2
   }
   @action.bound increment(){
     this.count += 1
   }
 }
 
 const counterState = new Counter()
 export default counterStore
```

index.js:

```javascript
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'mobx-react'
import App from '/App'
import couterStore from './store'

ReactDom.render(
    <Provider counter={counterStore}>
      <App />
    </Provider>,
    document.getElementById('root')
)
```



App.js:

```javascript
import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'

@inject('counter')
@observer
export default class App extends Component{
    render(){
        return (
            <div>
                <CounterDisplay counter={this.props.counter} />
                <button onClick={this.props.counter.increment}>+</button>
            </div>
        )
    }
}

@inject((store)=>{
    return {
        count:store.counter.count,
        doubleCount:store.counter.doubleCount
    }
})
@observer
class CounterDisplay extends Component{
    render(){
        return (
            <span>原值：{this.props.count}</span> 
            <span>二倍值：{this.props.doubleCount}</span>
        )
    }
}
```



21、immutable、react-immutable 和 mobx、mobx-react  完成 redux 改造(没必要，个人感觉redux保存初始数据且可维护性更好)