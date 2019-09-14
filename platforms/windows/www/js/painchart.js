var painscores = [10, 6, 3, 2, 3, 4, 3, 5, 4, 2,3,2,3,5,3,2,3];
var dates = ['one','two','three','four','five','six', 'seven', 'eight', 'nine', 'ten','eleven','twelve'];
var marginwidth = 1; // in percent
function initPainChart(numDays,showHours) {
    if (numDays<1) {
        numDays = 1;
    }
    marginwidth=20/numDays;
    $("#painchart").empty();
    $("#painchart").append('<div id="painbarchart"></div>');
    var barwidth=Math.floor((100/numDays))-(2*marginwidth);
    $("#painbarchart").append('<div id="painchartbars"><div>');
    maxpain = Math.max(...painscores.slice(0,numDays));
    console.log(painscores.slice(0,numDays));
    for (i=0;i<numDays;i++) {
        $("#painchartbars").append('<span class="barchartbar barchartelement"></span>');
        $(".barchartbar:last").height(((100*painscores[i]/maxpain)-(marginwidth*2))+"%");
    }
    $("#painbarchart").append('<div id="painchartbartitles"></div>');
    for (i=0;i<numDays;i++) {
        $("#painchartbartitles").append('<span class="barchartbartitle barchartelement"></span>');
        // skip titles if lots of elements
        if (numDays<10) {
            // every element
            $(".barchartbartitle:last").append(dates[i]);
        } else if (numDays<21) {
            // every third element
            if ((i%3)==0) {
                $(".barchartbartitle:last").append(dates[i]);
            }
        } else {
            // every 5th element
            if ((i%5)==0) {
                $(".barchartbartitle:last").append(dates[i]);
            }
        }
    }
    $(".barchartelement").width(barwidth+"%").css("margin",marginwidth+"%");
    $("#painbarchart").append('<div id="painchartcontrols"></div>');
    $("#painchartcontrols").append("<button>week</button").children().last().click(function() {
        initPainChart(7,showHours);
    });
    $("#painchartcontrols").append("<button>month</button").children().last().click(function() {
        initPainChart(30,showHours);
    });
    $("#painchartcontrols").append("<button>3 months</button").children().last().click(function() {
        initPainChart(90,showHours);
    });
    $("#painchartcontrols").append("<button>+</button").children().last().click(function() {
        initPainChart(numDays+5,showHours);
    });
    $("#painchartcontrols").append("<button>-</button").children().last().click(function() {
        initPainChart(numDays-5,showHours);
    });
}