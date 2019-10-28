import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb,Icon } from 'antd';
import logo from './logo.png'
import './frame.less'
import { withRouter } from 'react-router-dom'
//import { adminRoutes } from '../../routes'     // ReferenceError: Cannot access 'adminRoutes' before initialization
const { Header, Content, Sider } = Layout;


@withRouter
class Frame extends Component {
    handleMenuClick = ({key}) => {
      this.props.history.push(key)
    }
    render() {
        return (
            <Layout>
            <Header className="header test-header">
              <div className="test-logo" >
                <img src={logo} alt="React_log" />
              </div>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  selectedKeys={[this.props.location.pathname]}
                  onClick={this.handleMenuClick}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  {
                    this.props.menus.map(item =>{
                      return (
                        <Menu.Item key={item.pathname}>
                          <Icon type={item.icon} />
                          {item.title}                         
                        </Menu.Item>
                      )
                    })
                  }
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px'}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        
        )
    }
}


export default Frame


