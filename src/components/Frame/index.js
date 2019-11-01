import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb,Icon, Dropdown,Avatar,Badge} from 'antd';
import logo from './logo.png'
import './frame.less'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {getNotificationsList} from '../../actions/notifications'
import {logout} from '../../actions/user'
//import { adminRoutes } from '../../routes'     // ReferenceError: Cannot access 'adminRoutes' before initialization
const { Header, Content, Sider } = Layout;

const mapStateToProps=(state)=>{
  return {
    notificationsCount: state.notifications.list.filter(item=>item.hasRead===false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName,
  }
  
}

@connect(mapStateToProps,{getNotificationsList,logout})
@withRouter
class Frame extends Component {
  
    componentDidMount(){
      this.props.getNotificationsList()
    }

    handleMenuClick = ({key}) => {
      this.props.history.push(key)
    }
    selectedKeysAddEditArticle=(path)=>{
       const pathToArr = path.split('/')
       pathToArr.length = 3
       return pathToArr.join('/')
    }
    handleDropdownMenuClick = ({key}) => {
      if(key==="/login"){
        this.props.logout()
      }
      this.props.history.push(key)
      
      
    }
    // 定义成方法，动态渲染
    renderDropdown =()=> (
      <Menu onClick={this.handleDropdownMenuClick}>
        <Menu.Item key="/admin/notifications">
          <Badge dot={Boolean(this.props.notificationsCount)}>系统消息</Badge>
        </Menu.Item>
        <Menu.Item key="/admin/settings">
          <Badge>个人中心</Badge>
        </Menu.Item>
        <Menu.Item key="/login" >
          <Badge>退出登录</Badge>
        </Menu.Item>
      </Menu>
    )
    render() {
        return (
            <Layout>
            <Header className="header test-header">
              <div className="test-logo" >
                <img src={logo} alt="React_log" />
              </div>
              <Dropdown overlay={this.renderDropdown}>
                <div style={{display:'flex',alignItems:'center'}}>
                  <Avatar src={this.props.avatar} />&nbsp;
                    <Badge count={this.props.notificationsCount} offset={[10,-10]}>欢迎你！ {this.props.displayName}</Badge> 
                  <Icon type="down" />
                </div>
              </Dropdown>
 
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  selectedKeys={[this.selectedKeysAddEditArticle(this.props.location.pathname)]}
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


