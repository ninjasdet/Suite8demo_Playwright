module.exports = {
    default: {
        require: [
            'features/support/*.js',
            'features/step_definitions/*.js'
        ],
        format: [
            'progress',
            'json:reports/report.json'            
        ],
        publishQuiet: true
    }
};
