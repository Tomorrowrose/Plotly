function init() {
    var menu = d3.select("#selDataset");
    d3.json("./samples.json").then((data)=>{
        var datanames = data.names;
        datanames.forEach((sample)=>{
        menu.append("option")
        .text(sample)
        .property("value", sample);
        });
        var samplenames = datanames[0];
        displaymetadata(samplenames);
        createcharts(samplenames);
    });
}

init()

function displaymetadata(sampleid){
    d3.json("./samples.json").then((data)=>{
    var metadata = data.metadata;
    var filterarray = metadata.filter(sample =>sample.id==sampleid);
    var result = filterarray[0];
    var display = d3.select("#sample-metadata");
    display.html("");
    Object.entries(result).forEach(([key, value])=>{
    display.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
});


}

function optionChanged(sample){
    displaymetadata(sample);
    createcharts(sample)
}

function createcharts(sample){
    d3.json("./samples.json").then((data)=>{
    var samples = data.samples;
    var filterarray = samples.filter(objectsample =>objectsample.id==sample);
    var result = filterarray[0];
    var otuids = result.otu_ids;
    var otulables = result.otu_lables;
    var samplevalues = result.sample_values;
    var bubbledata = [{
        x:otuids,
        y:samplevalues,
        text:otulables,
        mode:"markers",
        marker:{
            size:samplevalues,
            color:otuids,
            colorscale:"Earth"
        }
    }];
    Plotly.newPlot("bubble", bubbledata);
    var bardata = [{
        x:otuids,
        y:samplevalues,
        orientation H to make horizontal 
    }]
    });
}