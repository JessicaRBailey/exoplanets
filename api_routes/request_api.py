"""The Endpoints to manage the EXOPLANET_REQUESTS"""
#
# import uuid
#from datetime import datetime, timedelta
from flask import jsonify, abort, request, Blueprint

#from validate_email import validate_email

# api = Blueprint('request_api', __name__)


# def get_blueprint():
#     """Return the blueprint for the main app module"""
#     return api

##Through CSV
# import csv

# with open('data.csv', newline='') as csvfile:
#     exoplanets_list = list(csv.reader(csvfile))
# columns = exoplanets_list[0]
# def get_value_column(column_name):

# @api.route('/request', methods=['GET'])
# def get_records():
#     """Return all exoplanet data
#     @return: 200: an array of all known exoplanets as a \
#     flask/response object with application/json mimetype.
#     """
#     return jsonify(exoplanets_list)


##Through SQL
import sqlite3
import pandas as pd

# Initialize Flask app
api = Blueprint('request_api', __name__)

def get_blueprint():
    """Return the blueprint for the main app module"""
    return api


@api.route('/request', methods=['GET'])
def get_records():
    """Return all exoplanet data
    @return: 200: an array of all known exoplanets as a \
    flask/response object with application/json mimetype.
    """
    conn = sqlite3.connect('exoplanet.sqlite')
    query = "SELECT * FROM exoplanet_table"
    data = pd.read_sql_query(query, conn)
    conn.close()
    return jsonify(data.to_dict(orient='records'))
if __name__ == '__main__':
    api.run(debug=True)
   