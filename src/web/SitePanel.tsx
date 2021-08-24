import React from 'react';
import { Tabs, Empty,  Badge, Button } from 'antd';
import { WebPageItem } from '../interfaces/SiteInfoInterface';
import CaseTab from './tabs/CaseTab';

import { UnControlled as CodeMirror } from 'react-codemirror2'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');

const { TabPane } = Tabs;

interface IProps {
    data: WebPageItem;
    groupIndex: number;
    itemIndex: number;
}

class SitePanel extends React.Component<IProps> {
    isPC: boolean = window.screen.availWidth > 1000;
    jsEditorValue = null;
    cssEditorValue = null;
    tipsEditorValue = null;
    urlEditorValue = null;


    highlightUserAgent = (ua: string, tags: string[]): string => {
        if (tags.length === 0) return ua;
        return ua.replaceAll(tags[0], '<span style="color: blue;">' + tags[0] + '</span>')
    }

    saveCss = ()=>{
        const itemData = this.props.data;
        itemData.data.css = encodeURIComponent(this.cssEditorValue);
        this.updateToWindow(itemData);
        this.saveToServer(itemData);
    }
 
    saveJavascript = ()=>{
        const itemData = this.props.data;
        itemData.data.javascript = encodeURIComponent(this.jsEditorValue);
        this.updateToWindow(itemData);
        this.saveToServer(itemData);
    }

    saveTips = () => {
        const itemData = this.props.data;
        itemData.data.tips = encodeURIComponent(this.tipsEditorValue);
        this.updateToWindow(itemData);
        this.saveToServer(itemData);
    }

    saveUrl = ()=>{
        const itemData = this.props.data;
        itemData.url = this.urlEditorValue;
        this.updateToWindow(itemData);
        this.saveToServer(itemData);
    }

    updateToWindow =(itemData)=> {
        const pageData = window['pageItemList'];
        pageData[this.props.groupIndex].list[this.props.itemIndex] = itemData;
        window['setPageItemList'](pageData);
    }

    saveToServer = (itemData) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/?action=addOrUpdateItem');
        var bundle = {groupName: window['pageItemList'][this.props.groupIndex].groupName, item: itemData};
        xhr.send(JSON.stringify(bundle));
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
                        <TabPane tab={<Badge dot={this.props.data.data.css !== ""} offset={[6, 4]}>css</Badge>} key="2">
                            <CodeMirror
                                value={decodeURIComponent(this.props.data.data.css)}
                                options={{
                                    mode: 'css',
                                    theme: 'material',
                                    lineNumbers: true
                                }}
                                onChange={(editor, data, value) => {
                                    this.cssEditorValue = value;
                                }}
                            />
                            <Button onClick={this.saveCss} >save</Button>
                        </TabPane>
                        <TabPane tab={<Badge dot={this.props.data.data.javascript !== ""} offset={[6, 4]}>javascript</Badge>} key="3">
                            <CodeMirror
                                value={decodeURIComponent(this.props.data.data.javascript)}
                                options={{
                                    mode: 'javascript',
                                    theme: 'material',
                                    lineNumbers: true
                                }}
                                onChange={(editor, data, value) => {
                                    this.jsEditorValue = value;
                                }}
                            />
                            <Button onClick={this.saveJavascript} >save</Button>
                        </TabPane>
                        <TabPane tab="网址" key="4">
                            {/* <a href={this.props.data.url} target="_blank">{this.props.data.url}</a> */}
                            <CodeMirror
                                value={this.props.data.url}
                                options={{
                                    mode: 'text/plain',
                                    theme: 'material',
                                    lineNumbers: false
                                }}
                                onChange={(editor, data, value) => {
                                    this.urlEditorValue = value;
                                }}
                            />
                            <Button onClick={this.saveUrl} >save</Button>
                        </TabPane>
                        <TabPane tab={<Badge dot={this.props.data.data.tips !== ""} offset={[6, 4]}>注意事项</Badge>} key="5">
                            <CodeMirror
                                value={decodeURIComponent(this.props.data.data.tips)}
                                options={{
                                    mode: 'text/plain',
                                    theme: 'material',
                                    lineNumbers: false
                                }}
                                onChange={(editor, data, value) => {
                                    this.tipsEditorValue = value;
                                }}
                            />
                            <Button onClick={this.saveTips} >save</Button>
                        </TabPane>
                    </Tabs>
                </div> :
                <Empty />
        )
    }
}

export default SitePanel;