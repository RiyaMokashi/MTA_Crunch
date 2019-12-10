import pandas as pd
import numpy as np
import statistics

import os
import glob
dirname = os.path.dirname(__file__)
foldername = os.path.join(dirname, '/data/*.txt')
# print(foldername)


def getname(id,stopsDict):
	if id in stopsDict:
		return stopsDict[id]
	else:
		return "Error"

def analyze(TrainLine,StartStation,EndStation,ArrivalTime,ArrivalDate):

	colnames=['DATE', 'TRIP_ID', 'Year', 'ROUTE', 'X', 'Y', 'STOP_ID', 'TIME', 'Z'] 

	all_dfs = []
	files = [f for f in os.listdir('./data') if os.path.isfile(os.path.join('./data', f))]
	for file in files:
		all_dfs.append(pd.read_csv("data/"+file, names=colnames, header=None))
	DF = pd.concat(all_dfs).reset_index(drop=True)



	DF = pd.concat(all_dfs).reset_index(drop=True)

	DF = DF[['DATE','TRIP_ID', 'ROUTE', 'STOP_ID', 'TIME']]

	Hours = DF['DATE'].str[11:13]

	DF['HOURS'] = Hours

	Route = TrainLine
	Arrival_Station = EndStation
	Departure_Station = StartStation
	Week = ("1")
	Time = ArrivalTime[:2]+":"+ArrivalTime[2:]

	Time = Time[:2]

	Time = str(Time)

	DF['STOP_ID']=DF['STOP_ID'].str[:3]
	DF['DAY'] = DF['DATE'].str[:10]
	DF['HOURS'].unique()


	stopsDF = pd.read_csv("./gtfs/stops.txt")
	stopsDF = stopsDF[['stop_id','stop_name']]
	stopsDict = dict(zip(stopsDF.stop_id, stopsDF.stop_name))


	DF['STOP_NAME']=DF['STOP_ID'].apply(lambda x: getname(x,stopsDict))


	weekends = ('2019-12-01', '2019-12-07', '2019-12-08')
	weekdays = ('2019-12-04', '2019-12-05', '2019-12-06')
	DF.loc[DF['DAY'].isin(weekends), 'DATE'] = '0'
	DF.loc[DF['DAY'].isin(weekdays), 'DATE'] = '1'

	DF1 = DF.query('DATE == @Week and ROUTE == @Route and STOP_NAME == @Arrival_Station and HOURS == @Time')

	DF2 = DF.query('DATE == @Week and ROUTE == @Route and STOP_NAME == @Departure_Station')

	Final_Df = DF1.merge(DF2, on='TRIP_ID')

	vals = Final_Df.TIME_x.sub(Final_Df.TIME_y).abs().values.tolist()

	percentile_arr=[0]*101
	if len(vals)==0:
		return {"status":"failure",
			"mean-commute":0,
			"confidence-commute":percentile_arr
	}

	min_vals = min(vals)
	vals = [x for x in vals if x < min_vals+6000]


	med = statistics.median(vals)
	vals2 = [x / 60 for x in vals]
	med2 = int(round(statistics.median(vals2),0))

	
	for i in range (len(percentile_arr)):
		percentile_arr[i]=int(round(np.percentile(vals2, i),0))

	return {"status":"success",
			"mean-commute":med2,
			"confidence-commute":percentile_arr
	}


# print(analyze("R","Canal St","23 St","0800","Weekday"))
# print(analyze("6","Astor Pl","103 St","0800","Weekday"))