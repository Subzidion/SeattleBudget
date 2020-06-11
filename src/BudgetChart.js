import React from 'react';
import BudgetSankeyChart from './BudgetSankeyChart';

function BudgetChart(props) {
  let result = Object.keys(props["data"]["children"]).reduce((chart, child) => {
      chart["nodes"].push({
        "id": props["data"]["children"][child]["id"]
      });
      chart["links"].push({
        "source": props["data"]["id"],
        "target": props["data"]["children"][child]["id"],
        "value": props["data"]["children"][child]["total"]
      });
      return chart;
  }, {"nodes": [{"id": props["data"]["id"]}], "links": []});

  return (
    <BudgetSankeyChart data={ result } onNodeClick={ props.onNodeClick } />
  );
}

export default BudgetChart;