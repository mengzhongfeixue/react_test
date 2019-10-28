import React, { Component } from 'react'
import { Card,Table,Tag } from 'antd'
import moment from 'moment'
import truncate from 'truncate'
import { getArticles } from '../../requests'

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
            total: 1

        }
    }

    createColumns = (columnKeys) =>{
        return columnKeys.map(item =>{
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
                        return truncate(content,20)
                    }
                }
            }

            return {
                title: titleDisplayMap[item],
                dataIndex: item,
                key: item
            }
        })
    }

    getData = ()=>{
        getArticles().then(res=>{
            console.log(res)
            const columnKeys = Object.keys(res.data.list[0])
            const columns = this.createColumns(columnKeys)

            this.setState({
                data: res.data.list,
                columns:columns,
                total: res.data.total
            })

        })
    } 
 
    componentDidMount(){
        this.getData()
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
                            hideOnSinglePage: true
                        }}                       
                    />
                </Card>
            </div>
        )
    }
}
