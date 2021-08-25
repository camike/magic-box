import React from 'react';
import Layout, { Header, Content } from 'antd/lib/layout/layout';
import { createFromIconfontCN } from '@ant-design/icons';
import { WebPageItem } from '../../interfaces/SiteInfoInterface';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2753363_4zcvncih3s4.js', // icon-baidu, icon-csdn, icon-sina, icon-jiami, icon-back
  ],
});

interface IProps {
  data: WebPageItem;
  groupIndex: number;
  itemIndex: number;
}

class CaseTab extends React.Component<IProps> {
  state = {
    editingCase: false,
  }

  editorValue = null;
  setValue = (value) => {
    this.editorValue = value;
  }

  showCase = (item) => {
    this.setState({ ...this.state, showingCase: item });
  }

  back = () => {
    this.setState({ ...this.state, editingCase: false });
  }

  updateToWindow = (itemData) => {
    const pageData = window['pageItemList'];
    pageData[this.props.groupIndex].list[this.props.itemIndex] = itemData;
    window['setPageItemList'](pageData);
  }

  saveToServer = (itemData) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/?action=addOrUpdateItem');
    var bundle = { groupName: window['pageItemList'][this.props.groupIndex].groupName, item: itemData };
    xhr.send(JSON.stringify(bundle));
  }


  saveEditingCase = () => {
    const itemData = this.props.data;
    itemData.data.cases = this.editorValue;
    this.updateToWindow(itemData);
    this.saveToServer(itemData);
    this.back();
  }

  edit = () => {
    this.setState({ ...this.state, editingCase: true });
  }

  componentWillReceiveProps() {
    this.back();
  }


  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['image'],
      ['clean'],
    ]
  };

  formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];

  render() {
    return (
      this.state.editingCase ?
        <>
          <IconFont type="icon-back"></IconFont><a onClick={this.back} style={{ color: 'black' }}><span>返回上一层</span></a>
          <ReactQuill style={{ width: '100%', height: 600 }} theme="snow" value={this.props.data.data.cases} onChange={this.setValue} formats={this.formats} modules={this.modules} />
          <br></br><br></br>
          <a onClick={this.saveEditingCase}>保存</a>
        </>
        :
        <Layout>
          <Header style={{ color: "black", background: "#85643211" }}>
            <a onClick={this.edit}>编辑</a>
          </Header>
          <Content>
            <div dangerouslySetInnerHTML={{ __html: this.props.data.data.cases }}></div>
          </Content>
        </Layout>
    )
  }
}


export default CaseTab;