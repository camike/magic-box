import React from 'react';
import { Tabs, Empty, Card, Image, Col, Row } from 'antd';
import HighLightCode from './HighLightCode';
import { WebPageItem } from './interfaces/PageInfo';

const { TabPane } = Tabs;
const { Meta } = Card;

interface IProps {
    data: WebPageItem;
}

class PageInfo extends React.Component<IProps> {
    render() {
        return (
            this.props.data ?
                <div>
                    <Tabs defaultActiveKey="1" centered tabPosition="right">
                        <TabPane tab="useragent" key="1">
                            {this.props.data.data.ua}
                        </TabPane>
                        <TabPane tab="css" key="2">
                            {
                                this.props.data.data.css == "" ?
                                    <Empty /> :
                                    <HighLightCode text={atob(this.props.data.data.css)} language="css" />
                            }
                        </TabPane>
                        <TabPane tab="javascript" key="3">
                            {
                                this.props.data.data.javascript == "" ?
                                    <Empty /> :
                                    <HighLightCode text={atob(this.props.data.data.javascript)} language="javascript" />
                            }
                        </TabPane>
                        <TabPane tab="图片" key="4">
                            <div className="site-card-wrapper">
                                <Row gutter={12}>
                                    {this.props.data.data.infoImgs.map((info, index) => {
                                        return <Col span={6}><Card
                                            className="img-container"
                                            hoverable
                                            title={info.desc}>
                                            <Image style={{height:100}} src={info.src} />
                                            <Meta title={this.props.data.url} description={'' + index} />
                                        </Card></Col>
                                    })}
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane className="tab-container-center" tab="网址" key="5">
                            <a href={this.props.data.url} target="_blank">{this.props.data.url}</a>
                        </TabPane>
                        <TabPane tab="注意事项" key="6">
                            {
                                this.props.data.data.tips == "" ?
                                    <Empty /> :
                                    <div>{this.props.data.data.tips}</div>
                            }
                        </TabPane>
                    </Tabs>
                </div> :
                <Empty />
        )


    }
}

export default PageInfo;