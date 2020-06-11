function normalize(tree, row) {
  if(!tree[row["fiscal_year"]]) {
    tree = {...tree, [row["fiscal_year"]]: {id: "General Fund", approved_amount: 0, children: {}}}
  }
  if(!tree[row["fiscal_year"]]["children"][row["service"]]) {
    tree[row["fiscal_year"]]["children"] = {...tree[row["fiscal_year"]]["children"], [row["service"]]: {id: row["service"], approved_amount: 0, children: {}}}
  }
  if(!tree[row["fiscal_year"]]["children"][row["service"]]["children"][row["department"]]) {
    tree[row["fiscal_year"]]["children"][row["service"]]["children"] = {...tree[row["fiscal_year"]]["children"][row["service"]]["children"],
                                                [row["department"]]: {id: row["department"], approved_amount: 0, children: {}}}
  }
  if(!tree[row["fiscal_year"]]["children"][row["service"]]["children"][row["department"]]["children"][row["program"]]) {
    tree[row["fiscal_year"]]["children"][row["service"]]["children"][row["department"]]["children"] =
    {...tree[row["fiscal_year"]]["children"][row["service"]]["children"][row["department"]]["children"], [row["program"]]: {id: row["program"], approved_amount: 0, children: {}}}
  }
  // Increment amounts
  let approved_amount = (parseInt(row["approved_amount"]) || 0)
  tree[row["fiscal_year"]]["approved_amount"] += approved_amount
  tree[row["fiscal_year"]]["children"][row["service"]]["approved_amount"] += approved_amount
  tree[row["fiscal_year"]]["children"][row["service"]]["children"][row["department"]]["approved_amount"] += approved_amount
  tree[row["fiscal_year"]]["children"][row["service"]]["children"][row["department"]]["children"][row["program"]]["approved_amount"] += approved_amount

  // Add Expense Category
  tree[row["fiscal_year"]]["children"][row["service"]]["children"][row["department"]]["children"][row["program"]]["children"] = 
  {...tree[row["fiscal_year"]]["children"][row["service"]]["children"][row["department"]]["children"][row["program"]]["children"],
   [row["expense_category"]]: {id: row["expense_category"], approved_amount: approved_amount}}
  
  return tree;
}

export const budgetData = fetch("https://data.seattle.gov/resource/8u2j-imqx.json?$limit=50000")
    .then(response => response.json())
    .then(data => data.reduce((tree, row) => {
      return normalize(tree, row)
    }));