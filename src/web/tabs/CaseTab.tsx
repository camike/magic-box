import React from 'react';
import { List, Avatar, Image } from 'antd';
import Layout, { Header, Content } from 'antd/lib/layout/layout';
import { createFromIconfontCN } from '@ant-design/icons';
import { WebPageItem } from '../../interfaces/SiteInfoInterface';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2753363_4zcvncih3s4.js', // icon-baidu, icon-csdn, icon-sina, icon-jiami, icon-back
  ],
});

const shortDescLength = 30;

interface IProps {
  data: WebPageItem;
}

class CaseTab extends React.Component<IProps> {
  state = {
    showingCase: null,
  }

  showCase = (item) => {
    this.setState({ ...this.state, showingCase: item });
  }

  back = () => {
    this.setState({ ...this.state, showingCase: null });
  }

  componentWillReceiveProps() {
    this.back();
  }

  render() {
    return this.state.showingCase == null ? <List
      itemLayout="horizontal"
      dataSource={this.props.data.data.cases}
      split={false}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar style={{ backgroundColor: item.resolved ? 'green' : '#660000' }}>C</Avatar>}
            title={<a href="#" onClick={() => this.showCase(item)}>{item.title}</a>}
            description={item.description.length > shortDescLength ? item.description.substr(0, shortDescLength) + '...' : item.description}
          />
        </List.Item>
      )}
    /> :
      <Layout>
        <Header style={{ color: "black", background: "#85643211" }}>
          <IconFont type="icon-back"></IconFont><a href='#' onClick={this.back} style={{ color: 'black' }}><span>返回上一层</span></a>
        </Header>
        <Content style={{ padding: 20 }}>
          <h2>{this.state.showingCase.title}</h2>
          <div>
            {this.state.showingCase.description}
            <br /><br />
            {
              this.state.showingCase.images.map((src) => {
                return <Image src={src}></Image>
              })
            }
          </div>
        </Content>
      </Layout>
  }
}


export default CaseTab;