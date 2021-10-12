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

let svg = d3.select("body").append("svg")
    .attr("width", 20000)
    .attr("height", 20000)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// first visualization
let svg1 = d3.select('#vis1')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

// visual1 code
let parseDays = d3.time.format("%D").parse;
d3.csv("crash_catalonia.csv", function(error, data) {
  data.forEach(function(d) {
    d["Day of Week"] = parseDays(d["Day of Week"]);
    d["Number of Crashes"] = + d["Number of Crashes"];
    }
});

let xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%D"));

let yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(1000);
let yScale = d3.scale.linear().range([20000, 0])
let xScale = d3.scale.ordinal().rangeRoundBands([0, 20000], .1)
  
    
  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Crashes");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d["Day of Week"]); })
         .attr("y", function(d) { return yScale(d["Number of Crashes"]); })
         .attr("width", xScale.rangeBand())
         .attr("height", function(d) { return height - yScale(d["Number of Crashes"]); });
    });
// code for scatterplot
let dot = stroke: #000;


// second visualization

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

// gets the date from that data
let parseMonths = d3.time.format("%M").parse;
d3.csv("crash_catalonia.csv", function(error, data) {
  data.forEach(function(d) {
    d.Month = parseMonth(d.Month)
    d["1958"] = + d["1958"];
    }
});

  let svg2 = d3.select("body").append("svg") 
      .attr("width", width)
      .attr("height", height);
  
   // x scale for months
  let xScale = d3.scaleLinear()
  .domain([1,12])
  .range([0 , width])

  // y scale for data
  let yScale = d3.scaleLinear()
  .domain([0, 500])
  .range([200, 700])
  
  // selects all from the dot class(which is nothing at the start)
  let circle = svg.selectAll(dot)
  .data(data)
  .enter().append('circle') 
  .attr('class', 'dot') // declares the data as a dot in class
  .attr('r', 10) //radius
  .attr("cx", function(d) { return xScale(d.Month); }) // to put in scale
  .attr("cy", function(d) { return yScale(d["1958"]); }); // to put in scale
    
   //text for the number of flights in each month of 1958
  let text = svg.selectAll("text")
  .data(data)
  .enter().append("text")
  .attr("x", function(d) { return xScale(d.Month); })
  .attr("y", function(d) { return yScale(d["1958"]); })
  .attr('dy', -10); // so the text wont be on the dot
    

let xAxis = d3.axisBottom(xScale); // creates the x axis on the bottom

let yAxis = d3.axisLeft(yScale); // creates the y axis on the left side

    
let xAxisGroup = svg2.append("g") // appends the axises
    .attr("class", "x axis")
    .call(xAxis);
let yAxisGroup = svg2.append("g")
    .attr("class", "y axis") 
    .call(yAxis);
    
let dotGroup = svg2.selectAll('dot') // creates a grouping and appends the circle and text
  .data(data).enter().append('g') 
  .attr('class', 'dot')
  .attr('transform', function(d) { return 'translate(' + xScale(d.Month) + ',' + yScale(d["1958"]) + ')'})

dotGroup.append('circle')
  .attr('class', 'dot')
  .attr('r', 10)

dotGroup.append('text')
  .attr('class', 'dot')
  .attr('dy', -10)
  .text(function(d) { return d["1958"]})
}
      
