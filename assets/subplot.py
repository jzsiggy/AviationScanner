import time
import os
from datetime import datetime
import statistics
import plotly.graph_objects as go
from plotly.subplots import make_subplots

if not os.path.exists("images_v3"):
    os.mkdir("images_v3")

def get_date_time(ts):
	return datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:--')

def plot_subplots(timestamp , latitude , longitude, prev_graph):

	prev_graph['time'].append(get_date_time(int(timestamp)))
	prev_graph['quant'].append(len(latitude))
	if len(prev_graph['quant']) < 50:
		prev_graph['movingAvg'].append(None)
	else:
		prev_graph['movingAvg'].append(statistics.mean(prev_graph['quant'][-50:]))

	graph = prev_graph

	fig = make_subplots(
			rows=1, cols=2,
			column_widths=[0.5, 0.5],
			row_heights=[1.0],
			specs=[[{"type": "scattergeo"}, {"type" : "scatter"}]])

	fig.add_trace(
			go.Scattergeo(lat=latitude,
										lon=longitude,
										mode="markers",
										hoverinfo="text",
										showlegend=False,
										marker=dict(color="crimson", size=1, opacity=0.7)),
			row=1, col=1
	)

	fig.add_trace(
			go.Scatter(
					x=graph['time'],
					y=graph['quant'],	#Number of Aircrafts
					mode="lines",
					name="Number of Aircrafts"
			),
			row=1, col=2
	)

	fig.add_trace(
			go.Scatter(
					x=graph['time'],
					y=graph['movingAvg'],
					mode="lines",
					name="Number of Aircrafts (moving avg)"
			),
			row=1, col=2
	)

	fig.update_geos(
			# projection_rotation=dict(lon=pan),
			# projection_type="orthographic",
			projection_type="natural earth",
			landcolor="white",
			oceancolor="LightBlue",
			showocean=True,
			lakecolor="LightBlue"
	)

	# Rotate x-axis labels
	fig.update_xaxes(tickangle=45)

	# Set theme, margin, and annotation in layout
	fig.update_layout(
			height=800,
			width=1600,
			template="plotly_white",
			margin=dict(r=10, t=25, b=40, l=60),
			annotations=[
					dict(
							text="Source: OpenSky-Net",
							showarrow=False,
							xref="paper",
							yref="paper",
							x=0,
							y=0)
			]
	)

	if len(graph['quant']) % 20 == 0:
		fig.show()
	# print('Writing Image')
	# time.sleep(2)
	# fig.write_image('images_v3/{}.png'.format(timestamp))
	# print('Done Writing')
	return graph