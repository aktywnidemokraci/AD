Meteor.startup(function () {
    //console.log("ZMIANA_PARAMS");
    var globalParameters = [
        {
            "nazwaOrganizacji": "Aktywna Demokracja",
            "terytorium": "Polska",
            "kontakty": "Warszawa ul. Miła",
            "regulamin": "brak regulaminu",
            //"czasWyczekiwaniaKwestiiSpecjalnej":2,
            //"voteQuantity": 3,
            //"voteDuration":1,
            //"addIssuePause":60,
            //"addCommentPause":2,
            //"addReferencePause":1,
            //"okresSkladaniaRR":1
            "czasWyczekiwaniaKwestiiSpecjalnej":1,
            "voteQuantity": 3,
            "voteDuration":1,
            "addIssuePause":2,
            "addCommentPause":2,
            "addReferencePause":2,
            "okresSkladaniaRR":30
        }
    ];
    if (Parametr.find().count() == 0) {
        Meteor.call('addParametr', globalParameters, function (error, ret) {
            if (error) {
                if (typeof Errors === "undefined")
                    Log.error('Error: ' + error.reason);
                else {
                    throwError(error.reason);
                }
            }
        });
    }
});