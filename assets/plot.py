import os
import plotly.graph_objects as go

if not os.path.exists("images"):
    os.mkdir("images")

mapbox_access_token = 'pk.eyJ1IjoianpzaWciLCJhIjoiY2s4Z2Z1djZpMDE2dDNmbXZiZG1tc3pxeSJ9.BS-k8R4GmSmJAZHgVjeIyw'

def plot(filename, latitude, longitude):
  fig = go.Figure(go.Scattermapbox(
          lat=latitude,
          lon=longitude,
          mode='markers',
          marker=go.scattermapbox.Marker(
              size=3
          ),
          text=['Montreal'],
      ))

  fig.update_layout(
      hovermode='closest',
      mapbox=dict(
          accesstoken=mapbox_access_token,
          bearing=0,
          center=go.layout.mapbox.Center(
              lat=0,
              lon=0
          ),
          pitch=0,
          zoom=0
      )
  )

  fig.write_image('images/{}.png'.format(filename))