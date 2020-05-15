import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const textureLines = [
  {
    id: 'dots',
    type: 'patternDots',
    background: 'inherit',
    color: 'rgba(255, 255, 255, 0.1)',
    size: 4,
    padding: 1,
    stagger: true
  },
  {
    id: 'lines',
    type: 'patternLines',
    background: 'inherit',
    color: 'rgba(255, 255, 255, 0.1)',
    rotation: -45,
    lineWidth: 6,
    spacing: 10
  }
]

const Pie = (props) => (
  <div style={{ height: props.height }}>
    <ResponsivePie
      data={props.data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={[ '#f25c63', '#4dd9ca', '#00b06d', '#5d697088']}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: 'color' }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      defs={textureLines}
      fill={[
        {
          match: { id: 'Recovered' },
          id: 'lines'
        },
        {
          match: { id: 'Critical' },
          id: 'lines'
        },
        {
          match: { id: 'Active' },
          id: 'lines'
        }, 
        {
          match: { id: 'Deaths' },
          id: 'lines'
        },
      ]}
    />
  </div>
)

export default Pie
