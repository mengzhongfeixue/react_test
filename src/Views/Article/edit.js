import React, { Component,createRef } from 'react'
import {Card, Button,Form,Input, DatePicker, message,Spin } from 'antd'
import Editor from 'wangeditor'
import './editor.less'
import {editArticle,saveArticle} from '../../requests'
import moment from 'moment'

@Form.create()
class EditArticle extends Component {
    constructor(){
        super()
        this.state={
            titleValidateStatus:'',
            titileHelp: '',
            isLoading: false
        }
        this.editorRef = createRef()
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const data=Object.assign({},values,{
                    createAt: values.createAt.valueOf()
                })
                this.setState({
                    isLoading: true
                })
                saveArticle(this.props.match.params.id,data)
                  .then(resp=>{
                      message.success(resp.data.msg)
                      this.props.history.push('/admin/article')
                  })
                  .finally(()=>{
                      this.setState({
                          isLoading: false
                      })
                  })

            }
        })
    }
    initEditor = ()=>{
        this.editor = new Editor(this.editorRef.current)
        this.editor.customConfig.onchange = (html) => {
            this.props.form.setFieldsValue({
                content: html
            })
        }
        this.editor.create()
    }
    componentDidMount(){
        this.initEditor()
        this.setState({
            isLoading:true
        })
        editArticle(this.props.match.params.id)
          .then(resp=>{
              const {id,...data} = resp.data
              
              data.createAt = moment(data.createAt)
              this.props.form.setFieldsValue(data)
              this.editor.txt.html(data.content)
          })
          .finally(()=>{
              this.setState({
                  isLoading: false
              })
          })
    }
    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <Card
              title="编辑文章"
              bordered={false}
              extra={<Button onClick={this.props.history.goBack}>取消</Button>}
            >
                <Spin spinning={this.state.isLoading}>
                    <Form 
                    onSubmit={this.handleSubmit}
                    labelCol = {{
                        span: 4
                    }}
                    wrapperCol={{
                        span: 12
                    }}
                    >
                        <Form.Item 
                        validateStatus={this.state.titleValidateStatus}
                        help={this.state.titileHelp}
                        label="标题"
                        >
                            {getFieldDecorator('title',{
                                rules:[
                                    {
                                        required:true,
                                        message:'标题是必填的'
                                    },{
                                        min: 4,
                                        message: '标题必须大于4位'
                                    },{
                                        //自定义校验规则
                                        validator: (rule,value,callback) =>{
                                            if(value !== "123"){
                                                this.setState({
                                                    titleValidateStatus: 'error',
                                                    titleHelp: 'title不是123'
                                                })
                                            }else{
                                                this.setState({
                                                    titleValidateStatus: '',
                                                    titleHelp: ''
                                                })
                                            }
                                            callback()
                                        }
                                    }
                                ],
                            })(
                                <Input
                                placeholder="标题"
                                />
                            )}
                        </Form.Item>
                        <Form.Item 
                        label="作者"
                        >
                            {getFieldDecorator('author',{
                                rules:[
                                    {
                                        required:true,
                                        message:'作者是必填的'
                                    },{
                                        max: 4,
                                        message: '作者必须小于4位'
                                    }
                                ],
                            })(
                                <Input
                                placeholder="admin"
                                />
                            )}
                        </Form.Item>
                        <Form.Item 
                        label="阅读量"
                        >
                            {getFieldDecorator('amount',{
                                rules:[
                                    {
                                        required:true,
                                        message:'阅读量是必填的'
                                    }
                                ],
                            })(
                                <Input
                                placeholder="0"
                                />
                            )}
                        </Form.Item>
                        <Form.Item 
                        label="创建时间"
                        >
                            {getFieldDecorator('createAt',{
                                rules:[
                                    {
                                        required:true,
                                        message:'创建时间是必选的'
                                    }
                                ],
                            })(
                                <DatePicker showTime placeholder="选择时间" />
                            )}
                        </Form.Item>
                        <Form.Item 
                        label="内容"
                        >
                            {getFieldDecorator('content',{
                                rules:[
                                    {
                                        required:true,
                                        message:'内容是必须的'
                                    },{
                                        min: 4,
                                        message: '内容必须大于4位'
                                    }
                                ],
                            })(
                                <div ref={this.editorRef} className="editor"></div>
                            )}
                        </Form.Item>
                        <Form.Item wrapperCol={{offset:4}}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Login in
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>

            </Card>
        )
    }
}

export default  EditArticle
