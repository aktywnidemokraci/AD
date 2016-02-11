Template.editParametrModalInner.rendered=function(){
    $('.successBtn').css("visibility", "visible");
},
Template.editParametrModalInner.helpers({
    parametrInScope: function () {
        return Session.get('chosenParameterSession');
    },
    nazwaOrganizacjiInput:function(parameterName){
        return parameterName=="Nazwa organizacji" ? true :false;
    },
    terytoriumInput:function(parameterName){
        return parameterName=="Terytorium" ? true :false;
    },
    kontaktInput:function(parameterName){
        return parameterName=="Kontakty" ? true :false;
    },
    statutInput:function(parameterName){
        return parameterName=="Statut" ? true :false;
    },
    voteDurationInput:function(parameterName){
        return parameterName=="Czas głosowania(w godzinach)" ? true :false;
    },
    czasWyczekiwaniaKwestiiSpecjalnejInput:function(parameterName){
        return parameterName=="Czas wyczekiwania kwestii i komentarzy specjalnych (w dniach)" ? true :false;
    },
    editVoteQuantityInput:function(parameterName){
        return parameterName=="Maksymalna ilość kwestii w głosowaniu" ? true :false;
    },
    editIssuePauseInput:function(parameterName){
        return parameterName=="Częstotliwość dodania kwestii (w minutach)" ? true :false;
    },
    editCommentPauseInput:function(parameterName){
        return parameterName=="Częstotliwość dodania komentarza (w minutach)" ? true :false;
    },
    editReferencePauseInput:function(parameterName){
        return parameterName=="Częstotliwość dodania odniesienia (w minutach)" ? true :false;
    },
    editRRDurationInput:function(parameterName){
        return parameterName=="Okres składania Raportów Realizacyjnych (w dniach)" ? true :false;
    }
});

Template.editParametrModalInner.events({
    'click .btn-danger': function (e) {
        e.preventDefault();
        Session.setPersistent("chosenParameterSession",null);
        $("#editParametrMod").modal("hide");
    },
    'submit form':function(e){
        e.preventDefault();
        if ($('#parametrFormEditModal').valid()) {
            $('.successBtn').css("visibility", "hidden");
            var odp = checkIssueGlobalParamExists();
            if (odp == true) {
                bootbox.alert("Przepraszamy, istnieje już kwestia dotycząca zmiany parametru globalnego!");
                $("#editParametrMod").modal("hide");
                document.getElementById("parametrFormEditModal").reset();
            }
            else {
                var session = Session.get("chosenParameterSession");

                var val = session.name;
                var newValue = document.getElementById("param").value;
                if (newValue == null || newValue.trim() == "") {
                    GlobalNotification.error({
                        title: 'Przepraszamy',
                        content: "Pole " + session.title + " nie może być puste!",
                        duration: 3 // duration the notification should stay in seconds
                    });
                }
                else {
                    parametrPreview(session.name, session.title, session.value, newValue);
                }
            }
            $('.successBtn').css("visibility", "visible");
        }

    }
});

parametrPreview=function(paramName,title,oldValue,newValue){
    bootbox.dialog({
        message: '<p class="bg-warning padding-15 color-red"><b>' + 'Zamierzasz dokonać następujących zmian:' + '</b></p>' +
        '<p>' + 'Proponuję zmianę zawartości w ' + '<b>' + title.toUpperCase() + '</b>' + ' z wartości' + '</p>' +
        '<p>' + oldValue + '</p>' +
        '<p>' + 'na' + '</p>' +
        '<p>' + newValue + '</p>',
        title: "Uwaga",
        closeButton: false,
        buttons: {
            success: {
                label: "Zgadzam się",
                className: "btn-success successBtn",
                callback: function () {
                    $('.successBtn').css("visibility", "hidden");
                    var odp=checkIssueGlobalParamExists();
                    var params=ParametrDraft.find({czyAktywny:true});
                    if(odp==true || params.count()>0){
                        bootbox.alert("Przepraszamy, istnieje już kwestia dotycząca zmiany parametru globalnego!");
                        $("#editParametrMod").modal("hide");
                    }
                    else
                        createIssueChangeParam(paramName, title, oldValue, newValue);
                    $('.successBtn').css("visibility", "visible");
                }
            },
            danger: {
                label: "Rezygnuję",
                className: "btn-danger",
                callback: function () {
                    $('.btn-success2').css("visibility", "visible");
                }
            }
        }
    });
};

createIssueChangeParam=function(paramName,title,oldValue,newValue){
    var params=Parametr.findOne();
    var nazwaOrg=params.nazwaOrganizacji;
    var terytorium=params.terytorium;
    var kontakty=params.kontakty;
    var reg=params.regulamin;
    var voteDur=params.voteDuration;
    var voteQuan=params.voteQuantity;
    var czasWycz=params.czasWyczekiwaniaKwestiiSpecjalnej;
    var issuePause=params.addIssuePause;
    var commPause=params.addCommentPause;
    var refPause=params.addReferencePause;
    var okresSkladaniaRR=params.okresSkladaniaRR;

    switch(paramName){
        case "nazwaOrganizacji":nazwaOrg=newValue;break;
        case "terytorium":terytorium=newValue;break;
        case "kontakty":kontakty=newValue;break;
        case "regulamin":reg=newValue;break;
        case "voteDuration":voteDur=newValue;break;
        case "voteQuantity":voteQuan=newValue;break;
        case "czasWyczekiwaniaKwestiiSpecjalnej":czasWycz=newValue;break;
        case "addIssuePause":issuePause=newValue;break;
        case "addCommentPause":commPause=newValue;break;
        case "addReferencePause":refPause=newValue;break;
        case "okresSkladaniaRR":okresSkladaniaRR=newValue;break;
    }
    var addParamDraft =
    {
        nazwaOrganizacji: nazwaOrg,
        terytorium: terytorium,
        kontakty: kontakty,
        regulamin: reg,
        voteDuration:voteDur,
        voteQuantity:voteQuan,
        czasWyczekiwaniaKwestiiSpecjalnej:czasWycz,
        addIssuePause:issuePause,
        addCommentPause:commPause,
        addReferencePause:refPause,
        okresSkladaniaRR:okresSkladaniaRR
    };
    var odp=checkIssueGlobalParamExists();
    var params=ParametrDraft.find({czyAktywny:true});
    if(odp==false || params.count()==0) {
        Meteor.call('addParametrDraft', addParamDraft, function (error, ret) {
            if (!error) {
                var params=ParametrDraft.find({czyAktywny: true});
                if(params.count()>1){
                    Meteor.call("setActivityParametrDraft",ret,false);
                }
                else {
                    var dataParams = {
                        title: title.toUpperCase(),
                        oldValue: oldValue,
                        newValue: newValue
                    };
                    var newKwestia = [
                        {
                            idUser: Meteor.userId(),
                            dataWprowadzenia: new Date(),
                            kwestiaNazwa: 'Propozycja zmiany parametru globalnego  przez ' + Meteor.user().profile.firstName + "  " + Meteor.user().profile.lastName,
                            wartoscPriorytetu: 0,
                            dataGlosowania: null,
                            krotkaTresc: 'Propozycja zmiany parametrów globalnego',
                            szczegolowaTresc: dataParams,
                            isOption: false,
                            status: KWESTIA_STATUS.ADMINISTROWANA,
                            idParametr: ret,
                            typ: KWESTIA_TYPE.GLOBAL_PARAMETERS_CHANGE
                        }];

                    Meteor.call('addKwestiaADMINISTROWANA', newKwestia, function (error, ret) {
                        if (error)
                            throwError(error.reason);
                        else {
                            addPowiadomienieGlobalneFunction(ret);
                            Meteor.call("sendEmailAddedIssue", ret, function(error) {
                                if(error){
                                    var emailError = {
                                        idIssue: ret,
                                        type: NOTIFICATION_TYPE.NEW_ISSUE
                                    };
                                    Meteor.call("addEmailError", emailError);
                                }
                            } );
                        }
                    });
                }
            }
        });
        Session.setPersistent("chosenParameterSession", null);
        $("#editParametrMod").modal("hide");
    }
};

addPowiadomienieGlobalneFunction=function(idKwestia){
    var users=Users.find({'profile.userType':USERTYPE.CZLONEK});
    var kwestia=Kwestia.findOne({_id:idKwestia});
    users.forEach(function(user){
        var newPowiadomienie ={
            idOdbiorca: user._id,
            idNadawca: null,
            dataWprowadzenia: kwestia.dataWprowadzenia,
            tytul: "",
            powiadomienieTyp: NOTIFICATION_TYPE.NEW_ISSUE,
            tresc: "",
            idKwestia:idKwestia,
            czyAktywny: true,
            czyOdczytany:false
        };
        Meteor.call("addPowiadomienie",newPowiadomienie,function(error){
            if(error)
                throwError(error.reason);
        })
    });

};

checkIssueGlobalParamExists=function(){
    var kwestie=Kwestia.find({typ:KWESTIA_TYPE.GLOBAL_PARAMETERS_CHANGE, czyAktywny:true,
        status:{$nin:[KWESTIA_STATUS.ZREALIZOWANA,KWESTIA_STATUS.ARCHIWALNA]}});
    return kwestie.count()>0? true : false;
};