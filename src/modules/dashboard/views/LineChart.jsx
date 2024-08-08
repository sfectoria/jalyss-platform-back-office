// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

// Define the main component
const MyResponsiveLine = () => {
  // Initialize state with initial data
  const [data, setData] = useState([
    {
      id: "japan", // Identifier for the data series
      color: "hsl(291, 70%, 50%)", // Color for the line
      data: [{ x: 0, y: 0 }], // Initial data point
    },
  ]);

  // useEffect hook to update data at regular intervals
  useEffect(() => {
    // Set an interval to update the data every second
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData]; // Copy previous data
        const lastPoint = newData[0].data[newData[0].data.length - 1]; // Get the last data point
        const newPoint = { x: lastPoint.x + 1, y: Math.random() * 100 }; // Generate a new data point
        newData[0].data.push(newPoint); // Add the new data point to the series
        return newData; // Update the state with the new data
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Render the chart inside a Box component
  return (
    <Box height={700}>
      <ResponsiveLine
        data={data} // Data for the chart
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }} // Margins for the chart
        xScale={{ type: "linear" }} // X-axis scale type
        yScale={{
          type: "linear", // Y-axis scale type
          min: "auto", // Minimum value for Y-axis
          max: "auto", // Maximum value for Y-axis
          stacked: true, // Stack the data
          reverse: false, // Do not reverse the Y-axis
        }}
        axisTop={null} // No top axis
        axisRight={null} // No right axis
        axisBottom={{
          orient: "bottom", // Position of the bottom axis
          tickSize: 5, // Size of the ticks
          tickPadding: 5, // Padding for the ticks
          tickRotation: 0, // Rotation for the ticks
          legend: "time", // Legend for the bottom axis
          legendOffset: 36, // Offset for the legend
          legendPosition: "middle", // Position of the legend
        }}
        axisLeft={{
          orient: "left", // Position of the left axis
          tickSize: 5, // Size of the ticks
          tickPadding: 5, // Padding for the ticks
          tickRotation: 0, // Rotation for the ticks
          legend: "value", // Legend for the left axis
          legendOffset: -40, // Offset for the legend
          legendPosition: "middle", // Position of the legend
        }}
        enableGridX={false} // Disable grid lines on the X-axis
        enableGridY={false} // Disable grid lines on the Y-axis
        colors={{ scheme: "nivo" }} // Color scheme for the lines
        lineWidth={3} // Width of the line
        pointSize={10} // Size of the points
        pointColor={{ theme: "background" }} // Color of the points
        pointBorderWidth={2} // Border width of the points
        pointBorderColor={{ from: "serieColor" }} // Border color of the points
        pointLabelYOffset={-12} // Y-offset for the point labels
        useMesh={true} // Enable mesh for better interaction
        legends={[
          {
            anchor: "bottom-right", // Position of the legend
            direction: "column", // Direction of the legend items
            justify: false, // Do not justify the legend items
            translateX: 100, // X translation for the legend
            translateY: 0, // Y translation for the legend
            itemsSpacing: 0, // Spacing between legend items
            itemDirection: "left-to-right", // Direction of the legend items
            itemWidth: 80, // Width of the legend items
            itemHeight: 20, // Height of the legend items
            itemOpacity: 0.75, // Opacity of the legend items
            symbolSize: 12, // Size of the legend symbols
            symbolShape: "circle", // Shape of the legend symbols
            symbolBorderColor: "rgba(0, 0, 0, .5)", // Border color of the legend symbols
            effects: [
              {
                on: "hover", // Effect on hover
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)", // Background color on hover
                  itemOpacity: 1, // Opacity on hover
                },
              },
            ],
          },
        ]}
        enableArea={true} // Enable area under the line
        areaOpacity={0.3} // Opacity of the area
        defs={[
          {
            id: "gradientA", // ID for the gradient
            type: "linearGradient", // Type of gradient
            colors: [
              { offset: 0, color: "inherit", opacity: 0.1 }, // Start color of the gradient
              { offset: 100, color: "inherit", opacity: 0.3 }, // End color of the gradient
            ],
          },
        ]}
        fill={[{ match: "*", id: "gradientA" }]} // Apply the gradient to all areas
      />
    </Box>
  );
};

// Export the component as default
export default MyResponsiveLine;
