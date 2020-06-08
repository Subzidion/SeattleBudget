import React from 'react';
import BudgetSankeyChart from './BudgetSankeyChart';

function getApprovedAmountByService(service) {
  return Object.keys(service).reduce((serviceBudget, department) => {
    return serviceBudget + Object.keys(service[department]).reduce((departmentBudget, program) => {
      return departmentBudget + service[department][program].reduce((programBudget, expense) => {
        return programBudget + (parseInt(expense["approved_amount"], 10) || 0);
      }, 0)
    }, 0)
  }, 0)
}

function BudgetChart(props) {
  let result = Object.keys(props["data"]).reduce((obj, service) => {
      obj["nodes"].push({
        "id": service
      });
      obj["links"].push({
        "source": "General Fund",
        "target": service,
        "value": getApprovedAmountByService(props["data"][service])
      });
      return obj;
  }, {"nodes": [{"id": "General Fund"}], "links": []});


  return (
      <BudgetSankeyChart data={ result }/>
  );
}

export default BudgetChart;