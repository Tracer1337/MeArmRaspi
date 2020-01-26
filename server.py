from flask import Flask, request, abort, send_from_directory
from flask_cors import CORS, cross_origin
from inspect import signature, isclass
import controls
import json
import os

app = Flask(__name__, static_folder="react_build")
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

functions_map = {}
for fn in controls.control_functions:
    functions_map[fn.__name__] = {
        "function": fn,
        "signature": signature(fn)
    }

def extract_matching_params(args, signature):
    function_params = []
    for param_name in signature.parameters:
        param = signature.parameters[param_name]
        url_arg = args.get(param_name)
        if not url_arg:
            if param.default and not isclass(param.default):
                continue
            else:
                print(param_name+" missing")
                print(signature.parameters, args)
                abort(400)
        function_params.append(url_arg)
    return function_params

@app.route("/api/<name>")
@cross_origin()
def run(name):
    function = functions_map[name]["function"]
    signature = functions_map[name]["signature"]

    function_params = extract_matching_params(request.args, signature)

    function(*function_params)
    print(function.__name__, signature, function_params)

    return "Executed "+name

send_values = ("min_angle", "max_angle")

@app.route("/api/devices")
@cross_origin()
def get_devices():
	devices = {}
	for key in controls.servos:
		devices[key] = {}
		for value in send_values:
			devices[key][value] = controls.servos[key][value]
	return json.dumps(devices)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
