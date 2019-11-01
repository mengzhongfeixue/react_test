import { Form, Icon, Input, Button, Checkbox ,Card,Spin} from 'antd'
import React,{Component} from 'react'

import './login.less'

import { connect } from 'react-redux'
import {login} from '../../actions/user'
import {Redirect} from 'react-router-dom'

const mapStateToProps = state =>({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})
@connect(mapStateToProps,{login})
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin? <Redirect to="/admin" /> :
      <Spin spinning={this.props.isLoading}>
        <Card title="登录"  className="login-form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '用户名不能为空!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码不能为空!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <Button type="primary" htmlType="submit" >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
      
    );
  }
}

export default Login