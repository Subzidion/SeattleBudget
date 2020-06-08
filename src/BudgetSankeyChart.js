import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey'

function BudgetSankeyChart(props) {
  return (
    <ResponsiveSankey
        data={props["data"]}
        margin={{ top: 40, right: 250, bottom: 40, left: 150 }}
        align="justify"
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeThickness={18}
        nodeInnerPadding={3}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="horizontal"
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
        linkTooltip={node => (
        <span>
          {node.source.label} directs {node.value / 1000000} million to {node.target.label} service.
        </span>
        )}
        animate={true}
        motionStiffness={140}
        motionDamping={13}
        onClick={(data, event) => console.log({ data, event })} 
    />
  );
}

export default BudgetSankeyChart;