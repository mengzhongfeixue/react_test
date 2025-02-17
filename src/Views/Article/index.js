import React, { Component } from 'react'
import { Card,Table,Tag,Button, Modal, Typography, message,Tooltip } from 'antd'
import moment from 'moment'
import truncate from 'truncate'
import { getArticles,deleteArticle } from '../../requests'
import XLSX from 'xlsx'
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
            isLoading: false,
            isShowArticleModal: false,
            deleteArticleModalContent: '',
            isDeleteArticleConfirmLoading: false

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
                        return (
                            <Tooltip title={amount>1000?"热文":"最新"}>
                                <Tag color={amount>1000?'green':'red'}>{record.amount}</Tag>
                            </Tooltip>
                        )
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

        // 添加操作
        columns.push({
            title: '操作',
            key: 'action',
            render: (text,record)=>{
                return (
                    <ButtonGroup>
                        <Button size="small" type="primary" onClick={this.handleEditArticle.bind(this,record)}>编辑</Button>
                        <Button size="small" type="danger" onClick={this.handleShowDeleteArticleModal.bind(this,record)}>删除</Button>
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
        getArticles()
            .then(res=>{
                console.log(res)
                const columnKeys = Object.keys(res.data.list[0])
                const columns = this.createColumns(columnKeys)

                // ajax请求期间，用户切换了页面（请求完成时组件已经销毁），请求到数据后不再 setState ,防止用户快速切换页面时报错
                if(!this.updater.isMounted(this)) return 

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
                // ajax请求期间，用户切换了页面（请求完成时组件已经销毁），请求到数据后不再 setState ,防止快速切换页面时报错
                if(!this.updater.isMounted(this)) return 

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

    handleOutputExcel = ()=>{
        // 在实际的项目中，前端请求后台提供的文件下载地址
        const data = [Object.keys(this.state.data[0])] //[['id','title','author','amount','creatAt','content']]
        for (let i=0; i<this.state.data.length; i++){
            data.push(Object.values(this.state.data[i])) //向数组data中追加‘值数组’
        }

        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(data)  // data格式：[[],[]]
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb,ws,"SheetJS")
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb,"sheetjs.xlsx")

    }


    handleShowDeleteArticleModal = (record) => {
        // Modal.confirm({
        //     title:'此操作不可逆，谨慎操作！！！',
        //     content:<Typography>确定删除<span style={{color:'#00f'}}>{record.title}</span>吗? </Typography>,
        //     okText:'要删赶紧',
        //     cancelText: '跪求别删',
        //     maskClosable: false,
        //     onOk(){
        //         Article.setState({  //有问题
        //             isLoading: true
        //         })
        //     }
        // })

        this.setState({
            isShowArticleModal: true,
            deleteArticleModalContent: record.title,
            deleteArticleId: record.id
        })

    }

    handleDeleteArticleCancle=()=>{
        this.setState({
            isShowArticleModal: false,
            deleteArticleModalContent: '',
            isDeleteArticleConfirmLoading: false
        })       
    }

    handleDeleteArticleConfirm=()=>{
        this.setState({
            isDeleteArticleConfirmLoading: true
        })
        deleteArticle(this.state.deleteArticleId)
            .then(res=>{
                message.success(res.data.msg)
                this.getData()
            })
            
            .finally(()=>{
                this.setState({
                    isDeleteArticleConfirmLoading: false,
                    isShowArticleModal: false
                })
            })
    }

    handleEditArticle=(record)=>{   // 这种方式传值，编辑页刷新后页面将没了，实际开发中不这样传，比如 localStorage
        this.props.history.push({
            pathname: `/admin/article/edit/${record.id}`,
            state: { ...record }
        })
    }
    
    render() {
        return (
            <div>
                <Card 
                    title="文章列表" 
                    bordered={false} 
                    extra={<button onClick={this.handleOutputExcel}>导出excel</button>}
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
      
                    <Modal 
                        title='此操作不可逆，慎重！'  
                        visible={this.state.isShowArticleModal}
                        onCancel={this.handleDeleteArticleCancle}
                        maskClosable= {false}
                        confirmLoading={this.state.isDeleteArticleConfirmLoading}
                        onOk={this.handleDeleteArticleConfirm}
                    >
                        <Typography>确定删除<span style={{color:"#00f"}}>{this.state.deleteArticleModalContent}</span>吗？</Typography>
                    </Modal>

                </Card>
            </div>
        )
    }
}
