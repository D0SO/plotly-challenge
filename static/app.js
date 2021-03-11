
// create variable to select our dropdown button
var idSelect = d3.select('#selDataset');
// create variable to select the field that will display our data
var dataTable = d3.select("#sample-metadata");



// ------------------------------------
// Attribute id values to dropdown menu
// ------------------------------------

// Look through the json file
d3.json('samples.json').then((data)=>{
  // Create a variable that locates the data id's from the "names" field
  var ids = data.names;
  // Loop through the id's list
  ids.forEach((id)=>{
    // Append each id value to our dropdown 
    idSelect.append('option').text(id).property('value',id);
    result = ids[0]
    
  });
    // Ensure our table is clear
  dataDisplay(result);   
});

// -------------------------------------
// Set function for overall data display
// -------------------------------------

function dataDisplay(id){

  // Loop though the data
  d3.json('samples.json').then((data)=>{
    
    // -----------------------------
    // Display object data on table
    // ----------------------------- 
    // filter object data according to object id
    var metadata=data.metadata.filter(obj=>obj.id==id)
    // Clear table before inserting new object data
    dataTable.html("")
    // Loop through object data and append it to the display table
    Object.entries(metadata[0]).forEach(([key,value])=>{
      dataTable.append('h6').text(`${key.toUpperCase()}: ${value}`);

    
    // ------------------------------------
    // Assign variables for Visualizations
    // ------------------------------------
    var samples  = data.samples;
    // Colle
    var dataResult = samples.filter(obj=>obj.id == id)[0]
    // console log to confirm that the script is reading the data we wish to display
    console.log(dataResult)

    // Create variables for x values: id's / y-values: sample values / label for each set 
    
    var values = dataResult.sample_values; 
    var ids = dataResult.otu_ids;
    var labels = dataResult.otu_labels;
    
    // -------------------------------------
    //    ------    Bar Chart     -----
    // ------------------------------------

    var bardata=[{
      x: values.slice(0,10).reverse(),
      y: ids.slice(0,10).map(o=>'OTU '+o).reverse(),
      text: labels.slice(0,10).reverse(),
      type: 'bar', 
      orientation: 'h'
      }]

    var barlayout={
  
      title: 'Top Ten Bacteria Cultures',
      margin: { t: 25, l: 90}
  }
    // Insert Bar Chart
    Plotly.newPlot('bar', bardata, barlayout)


    // -------------------------------------
    //  ------    Bubble Plot     -----
    // ------------------------------------
    var bubbledata=[{
      x: ids,
      y: values,
      text: labels,
      mode: 'markers', 
      marker: {
        size: values, 
        color: ids,
        colorscale:'Electric'}
      }]

    var bubblelayout={
      title: 'Bacteria Cultures per Sample'
      
      } 
    // Insert Bubble Chart
  Plotly.newPlot('bubble', bubbledata, bubblelayout)

})
  })      
}
function optionChanged(id){
  // fetch and display new data according to id change on the dropdown menu
dataDisplay(id)
}