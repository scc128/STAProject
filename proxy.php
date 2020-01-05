<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") 
{
    // http://api.pugetsound.onebusaway.org/api/where/stop-ids-for-agency/40.json?key=TEST
    
    if($_GET["notAType"] == "getStop")
    {
        $request = "http://52.88.188.196:8080/api/api/where/stops-for-location.json?key=TEST&lat=47.6588&lon=-117.4260";
        $request = $request . "&query=" . $_GET["input"];
        
        //echo $request;
        
        $rt = file_get_contents($request);
        echo $rt;
    }

        
    if($_GET["notAType"] == "getArrsAndDeps")
    {
        //http://52.88.188.196:8080/api/api/where/arrivals-and-departures-for-stop/STA_EWU.json?minutesAfter=500&key=TEST
        //$request = "http://52.88.188.196:8080/api/api/where/arrivals-and-departures-for-stop/" . $_GET["input"] . ".json?minutesAfter=500&key=TEST";
        // ^ testing string due to no buses running when I was testing this. Activate this if no buses are running.
        
        $request = "http://52.88.188.196:8080/api/api/where/arrivals-and-departures-for-stop/" . $_GET["input"] . ".json?minutesAfter=35&key=TEST";
        
        //echo $request;
        
        $rt = file_get_contents($request);
        echo $rt;
    }

}
else
{
    echo "HIT2";
}