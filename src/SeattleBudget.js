import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import BudgetChart from './BudgetChart';
import { budgetData } from './BudgetDataProvider';

const { Header, Content } = Layout;

function SeattleBudget() {
  const [data, setData] = useState();
  
  useEffect(() => {
    budgetData.then(data => {
      setData(data);
    })
  }, []);

  if(data) {
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
              <Breadcrumb.Item>Seattle Budget</Breadcrumb.Item>
              <Breadcrumb.Item>Overview</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="site-layout-background" style={{ margin: 0 }}>
              <div className="site-layout-content">
                <BudgetChart data={ data["2019"] }/>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  } else {
    return (<div>"Loading..."</div>)
  }
}
  
    
export default SeattleBudget;