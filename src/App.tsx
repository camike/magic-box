import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import HomePage from './page/HomePage';
import UtilsPage from './page/UtilsPage';

enum PAGE {
  HOME = "home",
  UTILS = "utils",
}
const { Header, Content, Footer } = Layout;

class App extends React.Component {

  state = {
    page: PAGE.HOME
  }

  switchPage = (info) => {
    this.setState({ ...this.state, page: info['key'] })
  }

  getPage = () => {
    switch (this.state.page) {
      case PAGE.HOME:
        return <HomePage />;
      case PAGE.UTILS:
        return <UtilsPage />;
      default:
        break;
    }
    return null;
  }

  render() {
    return <Layout>
      <Header className="header" >
        <div className="title" >Sogou-MagicBox</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key={PAGE.HOME} onClick={this.switchPage}>首页</Menu.Item>
          <Menu.Item key={PAGE.UTILS} onClick={this.switchPage}>工具</Menu.Item>
        </Menu>
      </Header>
      <Content >{this.getPage()}</Content>
      <Footer style={{ textAlign: 'center' }}>Sogou-MagicBox ©2021 Created by Yangzhichao01.</Footer>
    </Layout>
  }
}


export default App;
