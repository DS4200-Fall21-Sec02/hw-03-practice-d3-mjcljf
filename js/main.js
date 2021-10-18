// write your javascript code here.
// feel free to change the preset attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 2000 - margin.left - margin.right,
  height = 20000 - margin.top - margin.bottom;

let svg = d3.select('#vis1')
.append('svg')
.attr('preserveAspectRatio', 'xMidYMid meet') 
.attr("height", height)
.attr("width", width)
.style('background-color', 'white') 
.attr('viewBox',[100, 100, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '));

d3.csv("data/data.csv").then(function (data) {
  let x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0));
  let y = d3.scaleLinear().domain([0, 12]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  svg
    .append("g")
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d) => `translate(${x(d.year)}, 0)`)
    .selectAll("rect")
    .data(function (d) {
      return map(function (year) {
        return { key: year, value: d.year };
      });
    })
    .join("rect")
    .attr("x", (d) => d.year)
    .attr("y", (d) => d.value)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "blue)
    .append("title")
    .text(function (d) {
      return "" + d.year + ": " + d.year;
    });
});

// second visualization
let svg1 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') 
  .attr('width', '100%') 
  .style('background-color', 'white')
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

  d3.csv("data/crash_catalonia.csv").then( function(data) {
  let xAxis = d3.scaleLinear()
  .domain([0, 100])
  .range([ 0, width ]);
  svg3.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));

  let yAxis = d3.scaleLinear()
  .domain([0, 400])
  .range([ height, 0]);
  svg1.append("g")
  .call(d3.axisLeft(y));

  // Add dots
  svg1.append('g')
  .selectAll("dot")
  .data(data)
  .join("circle")
      .attr("cx", function (d) { return x(d["Day of week"]); } )
      .attr("cy", function (d) { return y(d["Number of Crashes"]); } )
      .attr("r", 5)
      .style("fill", "#ccc")
})
