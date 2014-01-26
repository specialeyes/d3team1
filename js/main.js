<<<<<<< HEAD
var svg;

=======
>>>>>>> 0ddc088fdd5522108104b9880ed92b43449a91f8
/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.

This function is passed the variables to initially draw on the x and y axes.
**/
function init(xAxis, yAxis){
<<<<<<< HEAD
    xdata = xAxis;
    ydata = yAxis;
    
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
    
    var y = d3.scale.linear()
    .range([height, 0]);
    
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");
    
    svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
   /* d3.csv("data/data.csv", type, function(error, data) {
           x.domain(data.map(function(d) { return d.letter; }));
           y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
           
           svg.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + height + ")")
           .call(xAxis);
           
           svg.append("g")
           .attr("class", "y axis")
           .call(yAxis)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("Frequency");
           
           svg.selectAll(".bar")
           .data(data)
           .enter().append("rect")
           .attr("class", "bar")
           .attr("x", function(d) { return x(d.letter); })
           .attr("width", x.rangeBand())
           .attr("y", function(d) { return y(d.frequency); })
           .attr("height", function(d) { return height - y(d.frequency); });
           
           });*/
=======
    
    //Load the dataset from data.csv using xAxis and yAxis variables
    var dataset = [];
    d3.csv("data/data.csv", function(data) {
           dataset = data.map(function(d) { return [ +d[xAxis], +d[yAxis] ]; });
           console.log(dataset);
    });
    
>>>>>>> 0ddc088fdd5522108104b9880ed92b43449a91f8
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
