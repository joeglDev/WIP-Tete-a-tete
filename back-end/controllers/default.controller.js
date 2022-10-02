exports.handleInvalidPaths = (req, res) => {
res.status(404).send({status: 404, msg: "invalid path"});
};

//add all endpoints
exports.getRoute = (req, res) => {
res.status(200).send({status: 404, msg: "Route"});
};