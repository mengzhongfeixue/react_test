import React, { Component } from 'react'
import {Card,List, Badge,Button,Spin} from 'antd'
import {connect} from 'react-redux'
import {markNotificationHasReaded,markAllNotificationsReaded} from '../../actions/notifications'

const mapStateToProps = state =>{
  const {list,isLoading} = state.notifications
  return {
    list,isLoading
  }
}

//const mapStateToProps = state => {...state.notifications}

@connect(mapStateToProps,{markNotificationHasReaded,markAllNotificationsReaded})
class Notification extends Component {

    render() {
        return (
          <Spin spinning={this.props.isLoading}>
            <Card 
                title="通知中心" 
                bordered={false} 
                extra={
                  <Button 
                    disabled={this.props.list.every(item=>item.hasRead ===true)}
                    onClick={this.props.markAllNotificationsReaded}
                  >
                    全部标记为已读
                  </Button>
                }
            >
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                      <List.Item extra={item.hasRead?null: <Button onClick={this.props.markNotificationHasReaded.bind(this,item.id)}>标记为已读</Button>}>
                          <List.Item.Meta                        
                            title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                            description={item.desc}
                          />
                      </List.Item>
                    )}
                />
            </Card>
          </Spin>
        )
    }
}

export default Notification
