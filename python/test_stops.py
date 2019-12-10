from stops import table
import pandas as pd


stopsDF = pd.read_csv("../gtfs/stops.txt")[['stop_id','stop_name']]
stopsDict = dict(zip( stopsDF.stop_name,stopsDF.stop_id))

for line,stops in table.items():
	print("checking line "+line)
	for s in stops:
		if s not in stopsDict.keys():
			print("Format error on line "+line+": "+s)
			