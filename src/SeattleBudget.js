import React, { useState, useEffect } from 'react';
import BudgetChart from './BudgetChart';
import { budgetData } from './BudgetDataProvider';

function SeattleBudget() {
  const [data, setData] = useState();

  useEffect(() => {
    budgetData.then(data => {
      setData(data);
    })
  }, []);
  if(data) {
    return (
      <BudgetChart data={ data["2019"] }/>
    );
  } else {
    return (<div>
      "Loading..."
    </div>)
  }
}

export default SeattleBudget;
