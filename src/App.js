import React, { Component } from 'react';
import { Button } from 'antd';
import './index.less'

const withHOC = (WrappedComponent) => {
  return class  HOC extends Component {
    render(){
      return (
        <>
          <WrappedComponent />
          <div>这是一个高阶组件里要添加的信息</div>
        </>
      )
    }
  }
}

@withHOC
class App extends Component {
  render() {
    return (
      <div>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}



export default App;
