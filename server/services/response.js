
exports.sendError = (res, errors= {}, message="An Error occurred", status=404) => {
    let response = {
        status: false,
        message,
        errors
    }
    return res.status(status).json(response).end();
};

exports.sendSuccess = (res, data={}, message="Resource successfully retrieved", status=200) => {
    let response = {
        status: true,
        message,
        data
    }
    return res.status(status).json(response).end();
};
