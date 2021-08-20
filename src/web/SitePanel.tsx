import React from 'react';
import { Tabs, Empty, Card, Image, Col, Row, Badge } from 'antd';
import HighLightCode from './HighLightCode';
import { WebPageItem } from '../interfaces/SiteInfoInterface';
import CaseTab from './tabs/CaseTab';

const { TabPane } = Tabs;
const { Meta } = Card;

interface IProps {
    data: WebPageItem;
}

class SitePanel extends React.Component<IProps> {
    isPC: boolean = window.screen.availWidth > 1000;


    highlightUserAgent = (ua: string, tags: string[]): string => {
        if (tags.length == 0) return ua;
        return ua.replaceAll(tags[0], '<span style="color: blue;">' + tags[0] + '</span>')
    }

    render() {
        return (
            this.props.data ?
                <div>
                    <Tabs defaultActiveKey="10" centered tabPosition={this.isPC ? "right" : "top"}>
                        <TabPane tab="问题列表" key="0">
                            <CaseTab data={this.props.data} />
                        </TabPane>
                        <TabPane tab="useragent" key="1">
                            {
                                <div dangerouslySetInnerHTML={{ __html: this.highlightUserAgent(this.props.data.data.ua, this.props.data.data.ua_tags) }}></div>
                            }
                        </TabPane>
                        <TabPane tab={<Badge dot={this.props.data.data.css != ""} offset={[6, 4]}>css</Badge>} key="2">
                            {
                                this.props.data.data.css == "" ?
                                    <Empty /> :
                                    <HighLightCode text={decodeURIComponent(this.props.data.data.css)} language="css" />
                            }
                        </TabPane>
                        <TabPane tab={<Badge dot={this.props.data.data.javascript != ""} offset={[6, 4]}>javascript</Badge>} key="3">
                            {
                                this.props.data.data.javascript == "" ?
                                    <Empty /> :
                                    <HighLightCode text={atob(this.props.data.data.javascript)} language="javascript" />
                            }
                        </TabPane>
                        <TabPane className={this.isPC ? "tab-container-center" : ""} tab="网址" key="4">
                            <a href={this.props.data.url} target="_blank">{this.props.data.url}</a>
                        </TabPane>
                        <TabPane tab={<Badge dot={this.props.data.data.tips != ""} offset={[6, 4]}>注意事项</Badge>} key="5">
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