import React from 'react';
import { Layout, Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import SitePanel from '../web/SitePanel';
import { PageListInfo, WebPageItem } from '../interfaces/SiteInfo';
import PageData from '../data/pageData'

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2753363_0lbabkpnse9p.js', // icon-baidu, icon-csdn, icon-sina, icon-jiami
  ],
});

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const isPC: boolean = window.screen.availWidth > 1000;

class HomePage extends React.Component {
  state = {
    renderData: null,
  }

  switchContent = (info) => {
    const groupName = info['keyPath'][1].substr(5);
    const index = info['keyPath'][0].substr(groupName.length);
    this.setState({ renderData: this.getRenderData(groupName, index) });
  }

  getRenderData = (groupName: string, index: number) => {
    for (let i = 0; i < PageData.length; i++) {
      if (PageData[i].groupName == groupName) {
        return PageData[i].list[index];
      }
    }
  }

  render() {
    return <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
      <Sider className="site-layout-background" width={200}  collapsed={!isPC}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          {
            PageData.map((pageInfo: PageListInfo) => {
              return (
                <SubMenu key={"page-" + pageInfo.groupName} icon={<IconFont type={"icon-" + pageInfo.groupName} />} title={pageInfo.groupName}>
                  {
                    pageInfo.list.map((pageItem: WebPageItem, index) => {
                      return (<Menu.Item key={pageInfo.groupName + index} onClick={this.switchContent}>{pageItem.title}</Menu.Item>)
                    })
                  }
                </SubMenu>
              )
            })
          }
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 700 }}>
        <SitePanel data={this.state.renderData} />
      </Content>
    </Layout>;
  }

}

export default HomePage;