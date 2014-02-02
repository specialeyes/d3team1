var x, y;   //Used in changing axis variables
var varities = new Array("Kama", "Rosa", "Canadian");
var cData = [], klData = [], kwData = [], aData = [], gData = [], vData = [];
/**
 THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE
 DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS"
 DIV ON THE PAGE.
 
 This function is passed the variables to initially draw on the x and y axes.
 **/

function init(xAxis, yAxis){
    x = xAxis; y = yAxis;   //Set globals
    
    d3.csv("data/data.csv", function(data) {
           var xData = data.map(function(d){ return +d[xAxis]; });      //Load data from data.csv
           var yData = data.map(function(d){ return +d[yAxis]; });
           cData = data.map(function(d){ return +d["compactness"]});
           klData = data.map(function(d){ return +d["kernelLength"]});
           kwData = data.map(function(d){ return +d["kernelWidth"]});
           aData = data.map(function(d){ return +d["asymmetryCoefficient"]});
           gData = data.map(function(d){ return +d["grooveLength"]});
           vData = data.map(function(d){ return d["variety"]});
           
           var margin = {top:20, right:15, bottom:60, left:60};         //Create Margins
           var width = 960 - margin.left - margin.right;
           var height = 500 - margin.top - margin.bottom;
           
           var xr = d3.max(xData) - d3.min(xData);                      //Create XY Scale Functions
           var yr = d3.max(yData) - d3.min(yData);
           var xScale = d3.scale.linear()
                .domain([d3.min(xData) - xr/15.0, d3.max(xData) + xr/15.0]) //from xData range
                .range([0, width]);                                         //to axis length
           var yScale = d3.scale.linear()
                .domain([d3.min(yData) - yr/15.0, d3.max(yData) + yr/15.0])
                .range([height, 0]);
           
           var xaxis = d3.svg.axis()                                    //Create XY Axes
                .scale(xScale)
                .orient("bottom");
           var yaxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");
           
           d3.select("svg").remove();                                   //Clear previous SVG plot
           
           var svg = d3.select("#vis")                                  //Create SVG
                .append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom);
           
           var plot = svg.append("g")                                   //Append Scatter Plot
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("width", width)
                .attr("height", height)
                .attr("class", "main");
           
           plot.append("g")                                             //Append Axes to Scatter Plot
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "main axis date")
                .call(xaxis)
            .append("text")
                .attr("x", width)
                .attr("dy", "-0.4em")
                .style("text-anchor", "end")
                .text(axisLabel(xAxis));
           plot.append("g")
                .attr("transform", "translate(0,0)")
                .attr("class", "main axis date")
                .call(yaxis)
           .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .text(axisLabel(yAxis));
           
           var legend = plot.append("g")                                //Append Legend
                .attr("class", "legend")
                .attr("height", 100)
                .attr("width", 100)
                .attr("transform", "translate(20,10)");
           legend.selectAll("rect")
                .data(varities)
                .enter()
                .append("rect")
                .attr("x", width - 65)
                .attr("y", function(d, i){ return 20*i;})
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function(d, i) { return chooseColor(varities[i]); });
           legend.selectAll('text')
                .data(varities)
                .enter()
                .append("text")
                .attr("x", width - 52)
                .attr("y", function(d, i){ return 20*i + 9;})
                .text(function(d, i) { return varities[i]; });
           
           plot.append("g")                                             //Plot data
                .selectAll("points")
                .data(xData).enter()
               .append("circle")
                    .attr("cy", function(d,i) { return yScale(yData[i]); })
                    .attr("cx", function(d,i) { return xScale(xData[i]); })
                    .attr("r", 3)
                    .attr("fill", function(d,i) { return chooseColor(vData[i]); })
                    .style("opacity", 0.5)
           .on("mouseover", function(d,i){ displayData(i); });
           });
}

function chooseColor(v) {
    if(v == varities[0]) return "blue";
    else if(v == varities[1]) return "orange";
    else return "green";
}

function displayData(i) {
    d3.select("#details").select("text").remove();
    d3.select("#details")
        .append("text").html("Compactness: " + cData[i] + "</br>")
        .append("text").html("Kernel Length: " + klData[i] + "</br>")
        .append("text").html("Kernel Width: " + kwData[i] + "</br>")
        .append("text").html("Asymmetry Coefficient: " + aData[i] + "</br>")
        .append("text").html("Groove Length: " + gData[i] + "</br>")
        .append("text").html("Variety: " + vData[i] + "</br>") ;
}

function axisLabel(s) {
    if(s == "compactness") return "Compactness";
    else if(s == "kernelLength") return "Kernel Length";
    else if(s == "kernelWidth") return "Kernel Width";
    else if(s == "asymmetryCoefficient") return "Asymmetry Coefficient";
    else return "Groove Length";
}

/**
 ## onXAxisChange(value)
 This function is called whenever the menu for the variable to display on the
 x axis changes. It is passed the variable name that has been selected, such as
 "compactness". Populate this function to update the scatterplot accordingly.
 **/
function onXAxisChange(value){
    init(value, y);
}


/**
 ## onYAxisChange(value)
 This function is called whenever the menu for the variable to display on the
 y axis changes. It is passed the variable name that has been selected, such as
 "Asymmetry Coefficient". Populate this function to update the scatterplot
 accordingly.
 **/
function onYAxisChange(value){
    init(x, value);
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