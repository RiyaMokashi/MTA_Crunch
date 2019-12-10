import sys 
import json

import analysis

#getting input
try:
	TrainLine = sys.argv[1]
	StartStation = sys.argv[2]
	EndStation = sys.argv[3]
	ArrivalTime = sys.argv[4] 
	ArrivalDate = sys.argv[5] 
except Exception as e:
	print("Error:"+str(e))
	TrainLine = "6"
	StartStation = "Astor Pl"
	EndStation = "103 St"
	ArrivalTime = "0900"
	ArrivalDate = "Weekday"



#analysis
commute_results = analysis.analyze(TrainLine,StartStation,EndStation,ArrivalTime,ArrivalDate)




#formatting output
#test output

outputjson = {
	'train line':TrainLine,
	'starting station':StartStation,
	'ending station':EndStation,
	'arrival time':ArrivalTime,
	'arrival date':ArrivalDate,
	'data':commute_results

}

print(json.dumps(outputjson))
