var svg;
/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.

This function is passed the variables to initially draw on the x and y axes.
**/
function init(xAxis, yAxis){
   
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var xScale = d3.scale.linear()
    .range([0, width]);
    
    var yScale = d3.scale.linear()
    .range([height, 0]);
    
    var xaxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(10);
    
    var yaxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10);
    
    svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var dataset = [];
    d3.csv("data/data.csv", function(data) {
           dataset = data.map(function(d) { return [ +d[xAxis], +d[yAxis] ]; });
           console.log(dataset[0]);
           xScale.domain(data.map(function(d) { return d.letter; }));
           yScale.domain([0, d3.max(data, function(d) { return d.frequency; })]);
           
           svg.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + height + ")")
           .call(xaxis)
           .append("text")
           .attr("y", -10)
           .attr("dy", ".71em")
           .attr("x", width)
           .attr("dx", "0em")
           .style("text-anchor", "end")
           .text(xAxis);
           
           svg.append("g")
           .attr("class", "y axis")
           .call(yaxis)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text(yAxis);
           
           //Create circles
           svg.selectAll("circle")
           .data(dataset)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                 return xScale(d[0]);
                 })
           .attr("cy", function(d) {
                 return yScale(d[1]);
                 });
           
           //Create X axis
           svg.append("g")
           .attr("class", "axis")
           .attr("transform", "translate(0," + height + ")")
           .call(xaxis);
           
           //Create Y axis
           svg.append("g")
           .attr("class", "axis")
           .attr("transform", "translate(" + 0 + ",0)")
           .call(yaxis);
           
           });
    //Load the dataset from data.csv using xAxis and yAxis variables
}

/**
## onXAxisChange(value)
This function is called whenever the menu for the variable to display on the
x axis changes. It is passed the variable name that has been selected, such as
"compactness". Populate this function to update the scatterplot accordingly.
**/
function onXAxisChange(value){
    console.log("on x axis change");
    init(value, ydata);
}


/**
## onYAxisChange(value)
This function is called whenever the menu for the variable to display on the
y axis changes. It is passed the variable name that has been selected, such as
"Asymmetry Coefficient". Populate this function to update the scatterplot 
accordingly.
**/
function onYAxisChange(value){

}

/**
## showDetails(string)
This function will display details in the "details" box on the page. Pass in 
a string and it will be displayed. For example, 
    showDetails("Variety: " + item.variety);
**/
function showDetails(string){
    d3.select('#details').html(string);
}

function type(d) {
    d.frequency = +d.frequency;
    return d;
}
