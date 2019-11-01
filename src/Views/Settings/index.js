import React, { Component } from 'react'
import { Card, Upload, Spin,Button } from 'antd'
//import { uploadAvatar} from '../../requests'
import axios from 'axios'
import {connect} from 'react-redux'
import {changeAvatar} from '../../actions/user'

const mapStateToProps = (state)=>({
    avatarUrl: state.user.avatar
})

@connect(mapStateToProps,{changeAvatar})
class Setting extends Component {
    state = {
        isUploading: false,
        avatarUrl:''
    }
    handleUploadAvatar = ({file})=>{
        const data = new FormData()
        data.append('Token','c338ee16bfacc20cfd699b90ac7f10252678c67c:gXhsK8aZAKxR_AbXKyoFhCsQJpQ=:eyJkZWFkbGluZSI6MTU3MjYxNjUxMSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzAyODE4IiwiYWlkIjoiMTY0MjEzNyIsImZyb20iOiJmaWxlIn0=')
        data.append('file',file)
        this.setState({
            isUploading:true
        })
        axios.post('http://up.imgapi.com',data)
          .then(resp =>{
              //console.log(resp)
              if(resp.status ===200){
                  this.setState({
                      avatarUrl: resp.data.linkurl,
                      isUploading:false
                  })
              }
          })
    }

    handleSaveUploadAvatar = () =>{
        this.props.changeAvatar(this.state.avatarUrl)
    }

    render() {
        return (
            <Spin spinning={this.state.isUploading}>
                <Card title="个人设置" bordered={false}>
                    <Upload 
                      style={{border:'1px dashed #dedede', width:80,height:80,display:'block'}} 
                      showUploadList={false}
                      customRequest={this.handleUploadAvatar}
                    >
                        {this.state.avatarUrl?<img src={this.state.avatarUrl} alt="头像" style={{width:78,height:78}} /> : <img src={this.props.avatarUrl} alt="头像" style={{width:78,height:78}} />}
                    </Upload>
                </Card>
                <Button onClick={this.handleSaveUploadAvatar}>保存</Button>
            </Spin>

        )
    }
}

export default Setting
