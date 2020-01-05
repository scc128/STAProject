var stopList = [];
var stopCodes = [];

var backgroundColor = "beige";
var tableBackgroundColor = "white";
var textColor = "black";
var tableBorderColor ="black";


$(document).ready(start);

function start()
{
    //console.log("HI");
    $("#tBtn").click(addStop);
    $("#tBtn2").click(getStops);
    $("#tBtn3").click(test);
    $("#done").click(enter);
    jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    //document.getElementsByClassName("leaf").style.color="blue";

    //callBack();
}
function enter(){
    $("#input").toggle();
    // set the intervals
    getStops();
    setTimeout(What, 5000);
    paint();
    setInterval(getStops , 10000);
    setTimeout(What, 5000);
    setInterval(paint , 10000);
}
function What(){
    // intentionally does nothing 
}

function paint(){
    //stopList.sort();
    var now = new Date();
    var fiveFromNow = new Date(now.getTime() + 5*60000);
    
    //hides the input stuff
    //console.log(stopList); 
    
    $("#display").removeAttr("hidden");
    //displays the display div 
    //$(".remove").remove();
    $("#display2").parent().empty();
    $("#display2").remove();
    $("#display2").remove();
    $("#display").empty();
    //console.log(stopList);
    $("#display").append("<div id=\"display2\"> </div>");
    console.log("removing div");
    if(stopList.length == 0)
    {
    $("#display2").append("<p> ERROR: No Valid Station Code Entered </p>");
    }
    var counter =1; 

    $("#display2").append("<table class=\"table\">");

    for(var ix = 0; ix < stopCodes.length; ix++)
    {
        for(tmp of stopList)
            {
                if(stopCodes[ix] == tmp.stopCode)
                {
                $("#display2").append("<tr id=\"stop code\"> <th>" +tmp.stopName+ " </th>  </tr>"); //
                counter++;
                var counter2 = 1;

                
                for(tmp2 of tmp.buses){


            // console.log("THE TIME IA " + tmp2.date);

                if(!(fiveFromNow > tmp2.date && now < tmp2.date )){
                $("#display2").append("<tr class=\"leaf\"> <td><text> "+ tmp2.id+"</text></td><td><text> Arriving: " + tmp2.arrival +"</text></td><td><text> Departing: " + tmp2.departure+ "<text></text></td> </tr>");
                //$("#display2").append("<p>"+ tmp.stopName + " is ariving at " + tmp2.arrival +" and leaving at " + tmp2.departure+ "</p>");
                }else{
                    $("#display2").append("<tr class=\"highLeaf\"> <td><text><mark>"+ tmp2.id+"</mark></text></td><td><text> <mark>Arriving: " + tmp2.arrival +"</mark></text></td><td><text><mark> Departing: " + tmp2.departure+ "</mark><text></text></td> </tr>");
                        //$("#display2").append("<p><mark>"+ tmp.stopName + " is ariving at " + tmp2.arrival +" and leaving at " + tmp2.departure+ "</mark></p>");
                }
                counter2++;
                }
            }
        }

    }


    /*
    for(tmp of stopList){
        // badging will occur here.

        $("#display2").append("<tr id=\"stop code\"> <th>" +tmp.stopName+ " </th>  </tr>"); //
        counter++;
        var counter2 = 1;

        
        for(tmp2 of tmp.buses){


       // console.log("THE TIME IA " + tmp2.date);

            if(!(fiveFromNow > tmp2.date && now < tmp2.date )){
            $("#display2").append("<tr class=\"leaf\"> <td><text> "+ tmp2.id+"</text></td><td><text> Arriving: " + tmp2.arrival +"</text></td><td><text> Departing: " + tmp2.departure+ "<text></text></td> </tr>");
             //$("#display2").append("<p>"+ tmp.stopName + " is ariving at " + tmp2.arrival +" and leaving at " + tmp2.departure+ "</p>");
            }else{
                $("#display2").append("<tr class=\"highLeaf\"> <td><text><mark>"+ tmp2.id+"</mark></text></td><td><text> <mark>Arriving: " + tmp2.arrival +"</mark></text></td><td><text><mark> Departing: " + tmp2.departure+ "</mark><text></text></td> </tr>");
                //$("#display2").append("<p><mark>"+ tmp.stopName + " is ariving at " + tmp2.arrival +" and leaving at " + tmp2.departure+ "</mark></p>");
            }
            counter2++;
        }
        
    }*/
    
    $("#display2").append("</table>");
    
    $("body").css("background-color", backgroundColor);
    $("th").css({"border": "3px solid " + tableBorderColor, "background-color": tableBackgroundColor});
    $("td").css({"border": "3px solid " + tableBorderColor, "background-color": tableBackgroundColor});
    $("text").css("color", textColor);
    //$("text").css("color", "blue"); //THIS CHANGES TEXT COLOR
    
    stopList = [];
}
function test()
{
    console.log(stopList);
}

function addStop()
{
    stopCodes.push($("#stationCode").val());
    $("#stationCode").val("");
}

function getStops()
{
    if($("#backgroundColor").val() != "")
    {
    console.log("BGC");
    backgroundColor = $("#backgroundColor").val();
    }

    if($("#tableBackgroundColor").val() != "")
    {
    console.log("TBGC");
    tableBackgroundColor = $("#tableBackgroundColor").val();
    }
    if($("#textColor").val() != "")
    {
    console.log("TC");
    textColor = $("#textColor").val();
    }

    if($("#tableBorderColor").val() != "")
    {
    console.log("TBC");
    tableBorderColor = $("#tableBorderColor").val();
    }
    
    for(ix = 0; ix < stopCodes.length; ix++)
    {
        let reqs =
            {
            input: stopCodes[ix],
            notAType: "getStop"
            }
        
        //$.get("proxy.php", reqs, fillStop);
        //$.get("http://52.88.188.196:8080/api/api/where/stops-for-location.json?key=TEST&lat=47.6588&lon=-117.4260&query=" + stopCodes[ix] , fillStop) ;
    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://52.88.188.196:8080/api/api/where/stops-for-location.json?key=TEST&lat=47.6588&lon=-117.4260&query="+stopCodes[ix],
  "method": "GET",
}

$.ajax(settings).done(fillStop);

    }
}
function fillStop(data)
{
    console.log(data);
     let tStop = data;
   
        var stop = 
        {
            stopID: "",
            stopName: "",
            stopCode: "",
            buses: [],
        }
       // console.log(data);
        stop.stopID = tStop.data.list[0].id;
        stop.stopName = tStop.data.list[0].name;
        stop.stopCode = tStop.data.list[0].code;
        stopList.push(stop);
        getArrDept(stop);
    
    

    //console.log(stopList);
}

function getArrDept(stop)
{
    let reqs =
    {
    input: stop.stopID,
    notAType: "getArrsAndDeps"
    }

    //$.get("proxy.php", reqs, ArrDeptCallback);
    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://52.88.188.196:8080/api/api/where/arrivals-and-departures-for-stop/"+stop.stopID+".json?minutesAfter=35&key=TEST",
  "method": "GET",
}

$.ajax(settings).done(ArrDeptCallback);
    
}

function ArrDeptCallback(data)
{
    //console.log(data);
    data = data;
    var thisStop
    for(ix = 0; ix < stopList.length; ix++)
    {
        if(stopList[ix].stopID == data.data.entry.stopId)
        {
             thisStop= stopList[ix];  
        }
    }

    arrivals = data.data.entry.arrivalsAndDepartures;
    //console.log(arrivals);

    for(ix = 0; ix < arrivals.length; ix++)
    {
        var bus = 
        {
            id: arrivals[ix].routeId,
            shortName: arrivals[ix].routeShortName,
            longName: arrivals[ix].routeLongName,
            arrival: convertTime(new Date(arrivals[ix].scheduledArrivalTime)),
            departure: convertTime(new Date(arrivals[ix].scheduledDepartureTime)),
            date: new Date(arrivals[ix].scheduledDepartureTime)
        }
        //console.log(bus);
        thisStop.buses.push(bus);
    }

    function convertTime(date)
    {
        hour = date.getHours();
        min = date.getMinutes();

        if(min < 10) { min = "0" + min;}
        time = hour + ":" + min;
        return time;
    }
    //console.log(thisStop);

    /*times = times.data.entry.arrivalsAndDepartures;
    curTime = new Date();

    console.log(new Date(times[0].scheduledArrivalTime));
    console.log(new Date(times[0].scheduledDepartureTime));
    */
}