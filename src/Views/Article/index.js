import React, { Component } from 'react'
import { Card,Table,Tag,Button } from 'antd'
import moment from 'moment'
import truncate from 'truncate'
import { getArticles } from '../../requests'
const ButtonGroup = Button.Group

const titleDisplayMap = {
    id:'id',
    title:'标题',
    author:'作者',
    amount:'阅读量',
    createAt:'创建时间',
    content:'文章内容'
}



export default class Article extends Component {
    constructor(){
        super()
        this.state={
            data: [],
            columns: [
                {
                    title: 'id',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: 'title',
                    dataIndex: 'title',
                    key: 'title',
                  },
            ],
            total: 0,
            isLoading: false

        }
    }

    createColumns = (columnKeys) =>{
        const columns= columnKeys.map(item =>{
            if(item==='amount'){
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    // render属性用于对请求过来的数据做修饰处理
                    render: (text,record) =>{
                        const {amount} = record
                        return <Tag color={amount>1000?'green':'red'}>{record.amount}</Tag>
                    }
                }
            }
            if(item==='createAt'){
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    // render属性用于对请求过来的数据做修饰处理
                    render: (text,record) =>{
                        const {createAt} = record
                        return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
                    }
                }
            }
            if(item==='content'){
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    // render属性用于对请求过来的数据做修饰处理
                    render: (text,record) =>{
                        const {content} = record
                        return <div>{truncate(content,20)}&emsp;<a href="www.baidu.com">查看详文</a></div>
                    }
                }
            }

            return {
                title: titleDisplayMap[item],
                dataIndex: item,
                key: item
            }
        })

        columns.push({
            title: '操作',
            key: 'action',
            render: ()=>{
                return (
                    <ButtonGroup>
                        <Button size="small" type="primary">编辑</Button>
                        <Button size="small" type="danger">删除</Button>
                    </ButtonGroup>
                )
            }
        })

        return columns
    }

    getData = ()=>{
        this.setState({
            isLoading: true
        })
        getArticles().then(res=>{
            console.log(res)
            const columnKeys = Object.keys(res.data.list[0])
            const columns = this.createColumns(columnKeys)

            this.setState({
                data: res.data.list,
                columns:columns,
                total: res.data.total,
            })
        })
        .catch(err =>{
            // 处理错误，虽然有全局处理
        })
        .finally(()=>{
            this.setState({
                isLoading: false
            })
        })
    } 
 
    componentDidMount(){
        this.getData()
    } 
    
    handlePageChange=(page,pageSize) =>{
        this.setState({
            offset: pageSize*(page-1),
            limited: pageSize
        },()=>{
            this.getData()
        })
    }

    handleShowSizeChange = (current,size) => {
        this.setState({
            offset: 0,
            limited: size
        },()=>{
            this.getData()
        })
    }
    
    render() {
        return (
            <div>
                <Card 
                    title="文章列表" 
                    bordered={false} 
                    extra={<button>导出excel</button>}
                >
                     {/*rowkey表格行绑定唯一键值 */} 
                    <Table 
                        rowKey={record =>record.id}
                        dataSource={this.state.data} 
                        columns={this.state.columns}
                        pagination={{
                            total: this.state.total,
                            hideOnSinglePage: true,
                            onChange: this.handlePageChange, 
                            showQuickJumper: true,

                            showSizeChanger: true, 
                            onShowSizeChange: this.handleShowSizeChange,
                            current: this.state.offset / this.state.limited +1 ,
                            pageSizeOptions: ['10',"18","30","40"]
                        }} 
                        loading={this.state.isLoading}
                    
                    />
                </Card>
            </div>
        )
    }
}
