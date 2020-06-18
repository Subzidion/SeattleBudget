import React from "react";
import { ResponsiveSankey } from "@nivo/sankey";

const nodeSortByApprovedAmount = (nodeA, nodeB) => {
  if (nodeA.approved_amount > nodeB.approved_amount) return -1;
  if (nodeA.approved_amount < nodeB.approved_amount) return 1;
  return 0;
};

const humanReadableDollars = (number) => {
  let qualifier = "";
  if (number / 1000000000 >= 1) {
    number = (number / 1000000000).toFixed(2);
    qualifier = " billion";
  } else if (number / 1000000 >= 1) {
    number = (number / 1000000).toFixed(2);
    qualifier = " million";
  } else {
    number = number.toLocaleString();
  }
  return "$" + number + qualifier;
};

function BudgetSankeyChart(props) {
  let chartData = Object.keys(props["data"]["children"]).reduce(
    (chart, child) => {
      chart["nodes"].push({
        id: props["data"]["children"][child]["id"],
        label: props["data"]["children"][child]["label"],
        approved_amount: props["data"]["children"][child]["approved_amount"],
      });
      chart["links"].push({
        source: props["data"]["id"],
        target: props["data"]["children"][child]["id"],
        value: props["data"]["children"][child]["approved_amount"],
      });
      return chart;
    },
    {
      nodes: [
        {
          id: props["data"]["id"],
          label: props["data"]["label"],
          approved_amount: props["data"]["approved_amount"],
        },
      ],
      links: [],
    }
  );

  return (
    <ResponsiveSankey
      data={chartData}
      margin={{ top: 40, right: 250, bottom: 40, left: 150 }}
      align="justify"
      colors={{ scheme: "category10" }}
      nodeOpacity={1}
      nodeThickness={18}
      nodeInnerPadding={3}
      nodeSpacing={24}
      nodeBorderWidth={0}
      nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
      enableLinkGradient={true}
      label={(node) => node.label}
      labelPosition="outside"
      labelOrientation="horizontal"
      labelPadding={16}
      labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
      linkTooltip={(node) => (
        <span>
          {node.source.label} directs {humanReadableDollars(node.value)} to{" "}
          {node.target.label}.
        </span>
      )}
      animate={true}
      motionStiffness={140}
      motionDamping={13}
      sort={nodeSortByApprovedAmount}
      onClick={(data, event) => {
        if ("id" in data) {
          props.onNodeClick(data.id);
        } else if ("target" in data) {
          props.onNodeClick(data.target.id);
        }
      }}
    />
  );
}

export default BudgetSankeyChart;
