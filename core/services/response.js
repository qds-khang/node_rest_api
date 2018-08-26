module.exports = {
    success: function(res, data) {
        return res.status(200).json({
            message: 'Request is successful.',
            data: data
        });
    },

    errorHandle: function(res, error) {
        switch (error.statusCode) {
            case 400:
            return this.badRequest(res, error.data);
                break;
        
            default: return this.serverError(res);
                break;
        }
    },

    badRequest: function(res, data) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The params are invalid.',
            data: data
        });
    },

    notFound: function(res) {
        return res.status(404).json({
            error: 'Not Found',
            message: 'URL endpoint is not found.'
        });
    },

    serverError: function(res) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'This is an error on the server.'
        });
    }
};