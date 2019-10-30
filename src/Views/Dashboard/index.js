import React, {Fragment, Component,createRef } from 'react'
import { Card, Col, Row} from 'antd'
import './dashboard.less'
import echarts from 'echarts'
import {getAmount} from '../../requests'

export default class Dashboard extends Component {
    constructor(){
        super()
        this.amountRef = createRef()
    }
    initAmount = ()=>{
        getAmount().then(resp=>{
            // 指定图表的配置项和数据
            const option = {
                title: {
                    text: '半年访问量统计'
                },
                tooltip: {},
                legend: {
                    data:['流量']
                },
                xAxis: {
                    data: resp.data.amount.map(item=>item.month)
                },
                yAxis: {},
                series: [{
                    name: '访问量',
                    type:'bar',
                    //type: 'line',
                    data: resp.data.amount.map(item=>item.value)
                }]
            }
            this.amountChart = echarts.init(this.amountRef.current)
            // 使用刚指定的配置项和数据显示图表。
            this.amountChart.setOption(option)
        })
         



    }
    componentDidMount(){
        this.initAmount()
    }
    render() {
        return (
            <Fragment>
                <Card title="概览" bordered={false}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box" style={{backgroundColor:'#29B6F6'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box" style={{backgroundColor:'#AB47BC'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box" style={{backgroundColor:'#FF7043'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box" style={{backgroundColor:'#43A047'}}>col-6</div>
                        </Col>
                    </Row>
                </Card>
                <Card title="最近浏览量" bordered={false} >
                    <div ref={this.amountRef} style={{height:'400px'}} />
                </Card>
            </Fragment>
        )
    }
}
