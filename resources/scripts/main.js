var container, camera, scene, renderer, manager, effect, clock, controls, group
var raycaster, mouse, havePointerLock, INTERSECTED
var FILTERED = 0;
var VR = false;
var STEAM;
var HIVE;
var CHART_RATIO;
var startField;
var ignoreFields;
var table;
var grid;
var chart;
var cameraPositions;
var chartTmp;
var isTraining = false;
var LEN;
var ARCH;
var pointer;
var TIMER;
var DV_ORDER = ["3D","2D","3D"];
var CURRENT_DVD = DV_ORDER.length-1;
var Q_TIMER;
var QUESTION = ["Which class was the least populated?",
                "Which class had the most survivors?",
                "Which sex suffered the most deaths?",
                "Which class suffered the most deaths?",
                "Which class had the most children?",
                "Which class had the most adult male survivors?",
                "Did the second class children perished or survived?",
                "Did most adult female perished or survived?",
                "Which class had the most male survivors?",
                "Which class had more female perished than female survivors?",
                "How confident were you in answering the questions for this visualization (1-10)? 10 = most confident"];
var CURRENT_Q = QUESTION.length;
var CSV_FILE = "resources/datasets/titanic.csv";

HIVE = false;
STEAM = false;
ARCH = true;

generateVisualization();

function generateVisualization()
{
    startField = "class";
    ignoreFields = [];

    for(var i=0; i<ignoreFields.length; i++)
        ignoreFields[i] = ignoreFields[i].toLowerCase();

    // var binFields = [ ["sepal_length",4], ["sepal_width",4], ["petal_length",4], ["petal_width",4] ];
    var binFields = [];
    var csv = loadFile(null);
    table = new ProcessedTable( startField, ignoreFields, binFields, csv );

    generate3DGraph();
}

function generate2DGraph()
{
    var chart = d3.parsets().dimensions( ["Class","Age","Sex","Survived"] );
	var vis = d3.select( "#vis" ).append( "svg" ).attr( "width" , chart.width() ).attr( "height", chart.height() );
	d3.csv( CSV_FILE, function(error, csv) { vis.datum( csv ).call( chart ); } );
}

function generate3DGraph()
{
    //console.log(document.getElementById("csvdata").value)

    LEN = 1;
    CHART_RATIO = LEN / table.length;


    init();

    // nextQ(1);

    resetChart(null);

    animate();
}