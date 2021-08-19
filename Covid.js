(function () {
    var myConnector = tableau.makeConnector();
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "date",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "confirmed",
            alias: "confirmed",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "deaths",
            alias: "deaths",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "recovered",
            dataType: tableau.dataTypeEnum.float
        }];
    
        var tableSchema = {
            id: "covidFeed",
            alias: "Covid Data",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://github.com/pomber/covid19/blob/master/docs/timeseries.json", function(resp) {
            var feat = resp.features,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].date,
                    "confirmed": feat[i].properties.confirmed,
                    "deaths": feat[i].properties.deaths,
                    "recovered": feat[i].properties.recovered
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();
$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Covid Feed";
        tableau.submit();
    });
});
