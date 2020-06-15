function normalize(tree, row) {
  if(!tree[row["fiscal_year"]]) {
    tree = {...tree, [row["fiscal_year"]]: {id: "General Fund", label: "General Fund", approved_amount: 0, children: {}}}
  }
  if(!tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]) {
    tree[row["fiscal_year"]]["children"] = {...tree[row["fiscal_year"]]["children"], [row["service"] + "|SERVICE"]: {id: row["service"] + "|SERVICE", label: row["service"], approved_amount: 0, children: {}}}
  }
  if(!tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"][row["department"] + "|DEPARTMENT"]) {
    tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"] = {...tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"],
                                                [row["department"] + "|DEPARTMENT"]: {id: row["department"] + "|DEPARTMENT", label: row["department"], approved_amount: 0, children: {}}}
  }
  if(!tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"][row["department"] + "|DEPARTMENT"]["children"][row["program"] + "|PROGRAM"]) {
    tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"][row["department"] + "|DEPARTMENT"]["children"] =
    {...tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"][row["department"] + "|DEPARTMENT"]["children"], [row["program"] + "|PROGRAM"]: {id: row["program"] + "|PROGRAM", label: row["program"], approved_amount: 0, children: {}}}
  }
  // Increment amounts
  let approved_amount = (parseInt(row["approved_amount"]) || 0)
  tree[row["fiscal_year"]]["approved_amount"] += approved_amount
  tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["approved_amount"] += approved_amount
  tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"][row["department"] + "|DEPARTMENT"]["approved_amount"] += approved_amount
  tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"][row["department"] + "|DEPARTMENT"]["children"][row["program"] + "|PROGRAM"]["approved_amount"] += approved_amount

  // Add Expense Category
  tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"][row["department"] + "|DEPARTMENT"]["children"][row["program"] + "|PROGRAM"]["children"] =
  {...tree[row["fiscal_year"]]["children"][row["service"] + "|SERVICE"]["children"][row["department"] + "|DEPARTMENT"]["children"][row["program"] + "|PROGRAM"]["children"],
   [row["expense_category"] + "|EXPENSE"]: {id: row["expense_category"] + "|EXPENSE", label: row["expense_category"], approved_amount: approved_amount}}
  
  return tree;
}

export const budgetDataProvider = fetch("https://data.seattle.gov/resource/8u2j-imqx.json?$limit=50000")
    .then(response => response.json())
    .then(data => data.reduce((tree, row) => {
      return normalize(tree, row)
    }, {}));