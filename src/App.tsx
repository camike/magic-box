import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, createFromIconfontCN } from '@ant-design/icons';
import Logo from './logo.svg';


const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2753363_suzmujbzvp.js', // icon-baidu, icon-csdn, icon-sina
  ],
});

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {

  state = {
    contentStr: "content",
  }

  switchContent = (info: any) => {
    this.setState({ contentStr: info['keyPath'] });
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
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="page-baidu" icon={<IconFont type="icon-baidu" />} title="baidu">
                <Menu.Item key="1" onClick={this.switchContent}>UserAgent</Menu.Item>
                <Menu.Item key="2" onClick={this.switchContent}>JavaScript</Menu.Item>
                <Menu.Item key="3" onClick={this.switchContent}>CSS</Menu.Item>
                <Menu.Item key="4" onClick={this.switchContent}>Other</Menu.Item>
              </SubMenu>
              <SubMenu key="page-csdn" icon={<IconFont type="icon-csdn" />} title="csdn">
                <Menu.Item key="5" onClick={this.switchContent}>UserAgent</Menu.Item>
                <Menu.Item key="6" onClick={this.switchContent}>JavaScript</Menu.Item>
                <Menu.Item key="7" onClick={this.switchContent}>CSS</Menu.Item>
                <Menu.Item key="8" onClick={this.switchContent}>Other</Menu.Item>
              </SubMenu>
              <SubMenu key="page-sina" icon={<IconFont type="icon-sina" />} title="sina">
                <Menu.Item key="9" onClick={this.switchContent}>UserAgent</Menu.Item>
                <Menu.Item key="10" onClick={this.switchContent}>JavaScript</Menu.Item>
                <Menu.Item key="11" onClick={this.switchContent}>CSS</Menu.Item>
                <Menu.Item key="12" onClick={this.switchContent}>Other</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 680 }}>{this.state.contentStr}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Sogou-MagicBox ©2021 Created by Yangzhichao01.</Footer>
    </Layout>
  }
}


export default App;
