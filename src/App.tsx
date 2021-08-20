import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import PageInfo from './PageInfo';
import { PageListInfo, WebPageItem } from './interfaces/PageInfo';
import PageData from './data/pageData'


const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2753363_suzmujbzvp.js', // icon-baidu, icon-csdn, icon-sina
  ],
});

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {

  isPC: boolean = window.screen.availWidth > 1000;

  state = {
    renderData: null,
  }

  getRenderData = (groupName: string, index: number) => {
    for (let i = 0; i < PageData.length; i++) {
      if (PageData[i].groupName == groupName) {
        return PageData[i].list[index];
      }
    }
  }

  switchContent = (info) => {
    const groupName = info['keyPath'][1].substr(5);
    const index = info['keyPath'][0].substr(groupName.length);
    this.setState({ renderData: this.getRenderData(groupName, index) });
  }

  render() {
    return <Layout>
      <Header className="header" >
        <div className="title" >Sogou-MagicBox</div>
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu> */}
      </Header>
      <Content >
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200} collapsible collapsed={!this.isPC}>
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
                          return (<Menu.Item key={pageInfo.groupName+index} onClick={this.switchContent}>{pageItem.title}</Menu.Item>)
                        })
                      }
                    </SubMenu>
                  )
                })
              }
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 680 }}>
            <PageInfo data={this.state.renderData} />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Sogou-MagicBox ©2021 Created by Yangzhichao01.</Footer>
    </Layout>
  }
}


export default App;
