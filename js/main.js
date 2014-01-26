/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.

This function is passed the variables to initially draw on the x and y axes.
**/
function init(xAxis, yAxis){
    var dataset = [];
    d3.csv("data/data.csv", function(data) {
           dataset = data.map(function(d) { return [ +d[xAxis], +d[yAxis] ]; });
           var xdata = data.map(function(d){ return +d[xAxis];});
           var ydata = data.map(function(d){ return +d[yAxis];});
           console.log(dataset);
           
           // data that you want to plot, I've used separate arrays for x and y values
           //var xdata = [5, 10, 15, 20], ydata = [3, 17, 4, 6];
           
           console.log(xdata);
           console.log(ydata);
           
           // size and margins for the chart
           var margin = {top: 20, right: 15, bottom: 60, left: 60}
           , width = 960 - margin.left - margin.right
           , height = 500 - margin.top - margin.bottom;
           
           // x and y scales, I've used linear here but there are other options
           // the scales translate data values to pixel values for you
           var x = d3.scale.linear()
           .domain([d3.min(xdata), d3.max(xdata)])  // the range of the values to plot
           .range([ 0, width ]);        // the pixel range of the x-axis
           
           var y = d3.scale.linear()
           .domain([d3.min(ydata), d3.max(ydata)])
           .range([ height, 0 ]);
           
           // the chart object, includes all margins
           var chart = d3.select('#vis')
           .append('svg:svg')
           .attr('width', width + margin.right + margin.left)
           .attr('height', height + margin.top + margin.bottom)
           .attr('class', 'chart')
           
           // the main object where the chart and axis will be drawn
           var main = chart.append('g')
           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
           .attr('width', width)
           .attr('height', height)
           .attr('class', 'main')
           
           // draw the x axis
           var xaxis = d3.svg.axis()
           .scale(x)
           .orient('bottom');
           
           main.append('g')
           .attr('transform', 'translate(0,' + height + ')')
           .attr('class', 'main axis date')
           .call(xaxis);
           
           // draw the y axis
           var yaxis = d3.svg.axis()
           .scale(y)
           .orient('left');
           
           main.append('g')
           .attr('transform', 'translate(0,0)')
           .attr('class', 'main axis date')
           .call(yaxis);
           
           // draw the graph object
           var g = main.append("svg:g");
           
           g.selectAll("scatter-dots")
           .data(ydata)  // using the values in the ydata array
           .enter().append("svg:circle")  // create a new circle for each value
           .attr("cy", function (d) { return y(d); } ) // translate y value to a pixel
           .attr("cx", function (d,i) { return x(xdata[i]); } ) // translate x value
           .attr("r", 5) // radius of circle
           .style("opacity", 0.6); // opacity of circle
           //Load the dataset from data.csv using xAxis and yAxis variables
    });
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
    console.log("on x axis change");
    init(xdata, value);
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
