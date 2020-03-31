from pymodes_opensky import OpenskyImpalaWrapper

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


opensky = OpenskyImpalaWrapper()

# test a simple and massive query
df = opensky.query(
    type="adsb", start="2018-07-01 13:00:00", end="2018-07-01 13:00:01", limit=100
)

print("**Print first 10 rows:")
print(df.head(10))