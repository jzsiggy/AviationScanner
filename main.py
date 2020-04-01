import sys
import json
import time

sys.path.append('/Users/jz/Desktop/Dev/aviation_analysis/assets')
from subplot import plot_subplots

with open('data/data.json') as f:
  data = json.load(f)

image_counter = 1

graph = {
  'time' : [],
  'quant' : [],
  'movingAvg' : [],
}

# 1583843400
for current in data:

  print("[[[[[ Starting image {} ]]]]]".format(str(current['timestamp'])))
  print("[[[[[ {} items in batch ]]]]]".format(str(len(current['flights']))))
  image_counter+=1
  
  lat = []
  lon = []

  for item in current['flights']:
    lat.append(item['lat'])
    lon.append(item['long'])

  graph = plot_subplots(str(current['timestamp']), lat, lon, graph)