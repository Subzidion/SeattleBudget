import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import BudgetSankeyChart from './BudgetSankeyChart';
import { budgetDataProvider } from './BudgetDataProvider';

const { Header, Content } = Layout;

const cleanNodeLabel = (node) => {
  if(node.indexOf("|") === -1) {
    return node;
  }
  return node.substring(0, node.indexOf("|"));
}

function SeattleBudget() {
  const [budgetData, setBudgetData] = useState();
  const [graphData, setGraphData] = useState();
  const [treePath, setTreePath] = useState(["General Fund"]);
  const [fiscalYear] = useState("2019");

  const handleNodeClick = (clickedNode, offset=0) => {
    setTreePath(currentPath => {
      if(currentPath.indexOf(clickedNode) !== -1) {
        if(currentPath.length === 1) {
          return currentPath
        }
        return currentPath.slice(0, currentPath.indexOf(clickedNode) + offset)
      } else {
        return [...currentPath, clickedNode]
      }
    })
  }

  useEffect(() => {
    budgetDataProvider.then(data => {
      setBudgetData(data);
      setGraphData(data[fiscalYear]);
    });
  }, [])
  
  useEffect(() => {
    if(budgetData) {
      setGraphData(treePath.reduce((data, node) => {
        if(node === "General Fund") return data;
        return data["children"][node];
      }, budgetData["2019"]));
    }
  }, [treePath, budgetData]);

  let graphTreeBreadcrumbs = [];
  treePath.forEach((node, index) => {
    graphTreeBreadcrumbs.push(
      <Breadcrumb.Item key={ index } onClick={() => handleNodeClick(node, 1) }>
        { cleanNodeLabel(node) }
      </Breadcrumb.Item>
    );
  })

  let content;
  if(!graphData) {
    content = "Loading..."
  }
  else if(!graphData["children"]) {
    content = graphData["label"] + ": " + graphData["approved_amount"]
  } else {
    content = <BudgetSankeyChart data={ graphData } onNodeClick={ handleNodeClick } />
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
            <Breadcrumb.Item>Seattle Budget { fiscalYear }</Breadcrumb.Item>
            { graphTreeBreadcrumbs }
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