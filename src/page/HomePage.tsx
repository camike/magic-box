import React from 'react';
import { Layout, Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import SitePanel from '../web/SitePanel';
import { PageListInfo, WebPageItem } from '../interfaces/SiteInfoInterface';
// import PageData from '../data/pageData'

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2753363_4zcvncih3s4.js', // icon-baidu, icon-csdn, icon-sina, icon-jiami, icon-back
  ],
});

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const isPC: boolean = window.screen.availWidth > 1000;

class HomePage extends React.Component {
  state = {
    renderData: null,
    PageData: window['pageItemList'] ? window['pageItemList'] : [],
  }
  groupIndex = -1;
  itemIndex = -1;

  componentWillMount() {
    if (window['pageItemList']) {
      return;
    }
    window['setPageItemList'] = (pageData) => {
      window['pageItemList'] = pageData;
      this.setState({ ...this.state, PageData: window['pageItemList'] });
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/?action=getAllGroupList");
    xhr.onload = () => {
      window['setPageItemList'](JSON.parse(xhr.response));
    }
    xhr.send();
  }

  switchContent = (info) => {
    this.groupIndex = info['keyPath'][1];
    const groupName = this.state.PageData[this.groupIndex].groupName;
    this.itemIndex = info['keyPath'][0].substr(groupName.length);
    this.setState({ renderData: this.getRenderData(this.groupIndex, this.itemIndex) });
  }

  getRenderData = (groupIndex: number, itemIndex: number) => {
    console.log(groupIndex, itemIndex);
    return this.state.PageData[groupIndex].list[itemIndex];
  }

  render() {
    return <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
      <Sider className="site-layout-background" width={200} collapsed={!isPC}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          {
            this.state.PageData.map((pageInfo: PageListInfo, groupIndex) => {
              return (
                <SubMenu key={groupIndex} icon={<IconFont type={"icon-" + pageInfo.groupName} />} title={pageInfo.groupName}>
                  {
                    pageInfo.list.map((pageItem: WebPageItem, itemIndex) => {
                      return (<Menu.Item key={pageInfo.groupName + itemIndex} onClick={this.switchContent}>{pageItem.title}</Menu.Item>)
                    })
                  }
                </SubMenu>
              )
            })
          }
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 700 }}>
        <SitePanel data={this.state.renderData} groupIndex={this.groupIndex} itemIndex={this.itemIndex} />
      </Content>
    </Layout>;
  }

}

export default HomePage;