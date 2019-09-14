//var painscores = [10, 6, 3, 2, 3, 4, 3, 5, 4, 2,3,2,3,5,3,2,3];
//var dates = ['one','two','three','four','five','six', 'seven', 'eight', 'nine', 'ten','eleven','twelve'];
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth()+1;
var date = today.getDate();
var todaystring = year + '.' + month + '.' + date;
var last60days = [];
var painscores = [];
last60days.push(todaystring);
function formatdate(datestring) {
    splitdate=datestring.split('.');
    return(splitdate[2]+'/'+splitdate[1]+'/'+splitdate[0]);
}

var marginwidth = 1; // in percent
function initPainChart(numDays,showHours) {
    // generate the dates
    
    for (i=0;i<60;i++) {
        thisday = year + '.' + month + '.' + date;
        last60days.push(thisday);
        // check for pain data for this date
        var foundpaindata = false;
        for (j=0;j<paindiary.length;j++) {
            if (paindiary[j].date == thisday) {
                painscores.push(paindiary[j].painscore);
                console.log(thisday + ' - found data ' + painscores);
                foundpaindata = true;
                break;
            }
        }
        if (!foundpaindata) {
            painscores.push(-1);
        }
        // go back a day
        if (date>1) {
            date--;
        } else {
            if (month>1) {
                month--;
                if (month==1 || month==3 || month==5 || month==6 || month==8 || month==10) {
                    date = 31;
                } else if (month==2) {
                    if (year%4==0) {
                        date = 29; // leap year
                    } else {
                        date = 28;
                    }
                } else {
                    date = 30;
                }
            } else {
                date=31;
                month=12;
                year--;
            }
        }
        
    }
    dates = last60days;
    // generate the GUI
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
        console.log('plotting ' + dates[i] + ' - ' + painscores[i]); 
        if (painscores[i]>-1) {
            $(".barchartbar:last").height(((100*painscores[i]/maxpain)-(marginwidth*2))+"%").hide().fadeIn();
        } else { // no data
            $(".barchartbar:last").height("100%").addClass('nodata').hide().fadeIn();
        }
    }
    $("#painbarchart").append('<div id="painchartbartitles"></div>');
    for (i=0;i<numDays;i++) {
        $("#painchartbartitles").append('<span class="barchartbartitle barchartelement"></span>');
        // skip titles if lots of elements
        if (numDays<10) {
            // every element
            $(".barchartbartitle:last").append(formatdate(dates[i]));
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