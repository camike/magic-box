import React from 'react';
import { Table, Tag, Space } from 'antd';
import uaData from './data/ua';

const columns = [
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url',
    render: text => <a href={text} target="_blank">{text.substr(0, 50)}</a>,
  },
  {
    title: 'useragent',
    dataIndex: 'ua',
    key: 'ua',
  },
  {
    title: 'keyword',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];



interface IProps  {
  type: string;
};

class UserAgentList extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }
  getData = () => {
    return uaData['data_' + this.props.type]
  }
  render () {
    return <Table columns={columns} dataSource={this.getData()} />;
  }
}


export default UserAgentList;


