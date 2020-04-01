import sys
import json
import time

sys.path.append('/Users/jz/Desktop/Dev/aviation_analysis/assets')
from subplot import plot_subplots

with open('data/flights.json') as f:
  flights = json.load(f)

image_counter = 1

graph = {
  'time' : [],
  'quant' : [],
  'movingAvg' : [],
}

# 1583843400
for i in range(1584459000, 1585596601, 3600):

  current = [item for item in flights if item['time'] == str(i)]

  print("[[[[[ Starting image {} ]]]]]".format(str(image_counter)))
  print("[[[[[ {} items in batch ]]]]]".format(str(len(current))))
  image_counter+=1
  
  lat = []
  lon = []

  for item in current:
    lat.append(item['lat'])
    lon.append(item['lon'])

  graph = plot_subplots(str(i), lat, lon, graph, pan=(image_counter*4) % 360)
  # break