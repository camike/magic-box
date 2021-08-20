import React from 'react';
import { Tabs, Empty, Card, Image, Col, Row, Badge } from 'antd';
import HighLightCode from './HighLightCode';
import { WebPageItem } from '../interfaces/SiteInfo';

const { TabPane } = Tabs;
const { Meta } = Card;

interface IProps {
    data: WebPageItem;
}

class SitePanel extends React.Component<IProps> {
    isPC: boolean = window.screen.availWidth > 1000;


    highlightUserAgent = (ua:string, tags: string[]): string =>  {
        if (tags.length == 0) return ua;
        return ua.replaceAll(tags[0], '<span style="color: blue;">'+tags[0]+'</span>')
    }

    render() {
        return (
            this.props.data ?
                <div>
                    <Tabs defaultActiveKey="1" centered tabPosition={this.isPC ? "right" : "top"}>
                        <TabPane tab="useragent" key="1">
                            {
                                <div dangerouslySetInnerHTML={{__html: this.highlightUserAgent(this.props.data.data.ua, this.props.data.data.ua_tags)}}></div>
                            }
                        </TabPane>
                        <TabPane tab="css" key="2">
                            {
                                this.props.data.data.css == "" ?
                                    <Empty /> :
                                    <HighLightCode text={decodeURIComponent(this.props.data.data.css)} language="css" />
                            }
                        </TabPane>
                        <TabPane tab="javascript" key="3">
                            {
                                this.props.data.data.javascript == "" ?
                                    <Empty /> :
                                    <HighLightCode text={atob(this.props.data.data.javascript)} language="javascript" />
                            }
                        </TabPane>
                        <TabPane tab={<Badge size="small" offset={[10, 8]}  style={{ backgroundColor: '#00000033' }} count={this.props.data.data.infoImgs.length}>图片</Badge>} key="4">
                            <div className="site-card-wrapper">
                                {
                                    this.isPC ?
                                        <Row gutter={12}> {this.props.data.data.infoImgs.map((info, index) => {
                                            return <Col span={6}><Card
                                                className="img-container"
                                                hoverable
                                                title={info.desc}>
                                                <Image style={{ height: 100 }} src={info.src} />
                                                <Meta title={this.props.data.url} description={'' + index} />
                                            </Card></Col>
                                        })}</Row> :
                                        this.props.data.data.infoImgs.map((info, index) => {
                                            return <Card
                                                className="img-container"
                                                hoverable
                                                title={info.desc}>
                                                <Image style={{ height: 100 }} src={info.src} />
                                                <Meta title={this.props.data.url} description={'' + index} />
                                            </Card>
                                        })
                                }
                            </div>
                        </TabPane>
                        <TabPane className={this.isPC ? "tab-container-center" : ""} tab="网址" key="5">
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

export default SitePanel;