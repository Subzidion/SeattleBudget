import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import BudgetChart from './BudgetChart';
import { budgetData } from './BudgetDataProvider';

const { Header, Content } = Layout;

function SeattleBudget() {
  const [data, setData] = useState();
  const [graphData, setGraphData] = useState();
  const [node, setNode] = useState();

  useEffect(() => {
      budgetData.then(data => {
        setData(data["2019"]);
        setGraphData(data["2019"]);
      });
  }, [])
  
  useEffect(() => {
    if(node) {
      setGraphData(graphData["children"][node]);
    }
  }, [node]);

  let content;
  if(!graphData) {
    content = "Loading..."
  }
  else if(!graphData["children"]) {
    console.log(graphData);
    content = graphData["id"] + ": " + graphData["approved_amount"]
  } else {
    content = <BudgetChart data={ graphData } onNodeClick={ setNode } />
  }

    return (
      <Layout style={{ height: '100vh' }}>
        <Header className="header">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Seattle Municipal Budget</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Seattle Budget { "2019" }</Breadcrumb.Item>
              <Breadcrumb.Item>General Fund</Breadcrumb.Item>
              <Breadcrumb.Item>{ node }</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="site-layout-background" style={{ margin: 0 }}>
              <div className="site-layout-content">
                { content }
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
}
  
    
export default SeattleBudget;