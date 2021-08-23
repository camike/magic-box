import React from 'react';
import { Button, Input, Layout, Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';
import { UnControlled as CodeMirror } from 'react-codemirror2'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');


const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2753363_0lbabkpnse9p.js', // icon-baidu, icon-csdn, icon-sina, icon-jiami
  ],
});

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const isPC: boolean = window.screen.availWidth > 1000;

enum ALGORITHM {
  BASE64 = "base64",
  URI_COMPONENT = "URIComponent",
}

class UtilsPage extends React.Component {
  inputTextarea = null;
  outputTextarea = null;

  state = {
    outputTextValue: "",
    currentAlgorthm: ALGORITHM.URI_COMPONENT,
  }

  changeAlgorthm = (info) => {
    this.setState({ ...this.state, currentAlgorthm: info['key'] });
  }

  handleEncrypt = () => {
    let text = this.inputTextarea.resizableTextArea.textArea.value;
    switch (this.state.currentAlgorthm) {
      case ALGORITHM.BASE64:
        text = btoa(text);
        break;
      case ALGORITHM.URI_COMPONENT:
        text = encodeURIComponent(text);
        break;
      default:
        break;
    }
    this.setState({ ...this.state, outputTextValue: (text) })
  }

  handleDecrypt = () => {
    let text = this.inputTextarea.resizableTextArea.textArea.value;
    switch (this.state.currentAlgorthm) {
      case ALGORITHM.BASE64:
        text = atob(text);
        break;
      case ALGORITHM.URI_COMPONENT:
        text = decodeURIComponent(text);
        break;
      default:
        break;
    }
    this.setState({ ...this.state, outputTextValue: (text) })
  }


  render() {
    return <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
      <Sider className="site-layout-background" width={200} collapsed={!isPC}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
        >
          <SubMenu key={"1"} icon={<IconFont type={"icon-jiami"} />} title={"文本加解密"}>
            <Menu.Item key={ALGORITHM.BASE64} onClick={this.changeAlgorthm}>{"base64"}</Menu.Item>
            <Menu.Item key={ALGORITHM.URI_COMPONENT} onClick={this.changeAlgorthm}>{"URI"}</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 700 }}>
        <Layout>
          <Header style={{ color: "black", background: "#85643211" }}>{this.state.currentAlgorthm + " 算法"}</Header>
          <div className="encrypt_tint">输入要加、解密的文本</div>
          <Content>
            <Input.TextArea className="encrypt_textarea" rows={10} ref={(el) => { this.inputTextarea = el }} />
            <div className="encrypt_btn_container">
              <Button onClick={this.handleEncrypt}>加密</Button>
              <Button onClick={this.handleDecrypt}>解密</Button>
            </div>
            <Input.TextArea className="encrypt_textarea" value={this.state.outputTextValue} rows={10} ref={(el) => { this.outputTextarea = el }} />
          </Content>
        </Layout>
        <CodeMirror
          value='<h1>I ♥ react-codemirror2</h1>'
          options={{
            mode: 'xml',
            theme: 'material',
            lineNumbers: true
          }}
          onChange={(editor, data, value) => {
          }}
        />

      </Content>
    </Layout>
  }
}

export default UtilsPage;