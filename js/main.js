// Define margins
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;

//Create scale functions
var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[0]; })])
    .range([0, width]);
var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([height, 0]);

//Define Axes
var xaxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(10);
var yaxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10);

/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.

This function is passed the variables to initially draw on the x and y axes.
**/
function init(xAxis, yAxis){
    d3.tsv("data/data.csv", type, function(error, data) {
           var svg = d3.select("#vis").append("svg")
                .attr("width", width+margin.left+margin.right)
                .attr("height", height+margin.top+margin.bottom)
                .append("g")
                    .attr("transform", "translate("+margin.left+","+margin.top+")");
           
           x.domain(data.map(function(d){return d.xAxis}));
           y.domain([0,d3.max(data, function(){return d.yAxis;}]);
                
           // Create Axes
           svg.append("g")
                .attr("class", "x axis")
                .attr("tranfrom", "translate(0,"+height+")")
                .call(xaxis);
           svg.append("g")
                .attr("class", "y axis")
                .call(yaxis)
                .append("text")
                     .attr("transform", "rotate(-90)")
                     .attr("y", 6)
                     .attr("dy", ".71em")
                     .style("text-anchor", "end")
                     .text(yAxis);
           
           // Create Points
           svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return xScale(d.xAxis); }) // ?
                .attr("cy", function(d) { return yScale(d.yAxis); }) // ?
                .attr("r", 5; })
                .on("click", function(d){console.log("clicked on" + d.xAxis);}); // ?
    });
}

/**
## onXAxisChange(value)
This function is called whenever the menu for the variable to display on the
x axis changes. It is passed the variable name that has been selected, such as
"compactness". Populate this function to update the scatterplot accordingly.
**/
function onXAxisChange(value){

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
