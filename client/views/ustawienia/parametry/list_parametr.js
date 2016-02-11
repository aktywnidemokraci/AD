Template.listParametr.helpers({
    isUserCzlonek:function(){
        return Meteor.user().profile.userType == USERTYPE.CZLONEK ? true : false;
    },
    noKwestiaParameters:function(){
        var kwestie=Kwestia.find({typ:KWESTIA_TYPE.GLOBAL_PARAMETERS_CHANGE, czyAktywny:true,
            status:{$nin:[KWESTIA_STATUS.ZREALIZOWANA,KWESTIA_STATUS.ARCHIWALNA]}});
        //status:{$in:[KWESTIA_STATUS.ADMINISTROWANA,KWESTIA_STATUS.GLOSOWANA]}});
        return kwestie.count()>0 ? false : true;
    }
});
Template.listParametr.events({
   'click #parametersClick':function(e){
       e.preventDefault();
       var kwestia=Kwestia.findOne({typ:KWESTIA_TYPE.GLOBAL_PARAMETERS_CHANGE,
           czyAktywny:true,status:{$nin:[KWESTIA_STATUS.ZREALIZOWANA]}});
       if(kwestia){
           var path=null;
           path="/issue_info/"+kwestia._id;
           Router.go(path);
       }
   },
    'click #editOrganisationName':function(e){
        e.preventDefault();
        editParameter("nazwaOrganizacji","Nazwa organizacji",this.nazwaOrganizacji);
    },
    'click #editTeritory':function(e){
        e.preventDefault();
        editParameter("terytorium","Terytorium",this.terytorium);
    },
    'click #editContacts':function(e){
        e.preventDefault();
        editParameter("kontakty","Kontakty",this.kontakty);
    },
    'click #editStatute':function(e){
        e.preventDefault();
        editParameter("regulamin","Statut",this.regulamin);
    },
    'click #editVoteDuration':function(e){
        e.preventDefault();
        editParameter("voteDuration","Czas głosowania(w godzinach)",this.voteDuration);
    },
    'click #editIssueWaiting':function(e){
        e.preventDefault();
        editParameter("czasWyczekiwaniaKwestiiSpec","Czas wyczekiwania kwestii i komentarzy specjalnych (w dniach)",this.czasWyczekiwaniaKwestiiSpecjalnej);
    },
    'click #editVoteQuantity':function(e){
        e.preventDefault();
        editParameter("voteQuantity","Maksymalna ilość kwestii w głosowaniu",this.voteQuantity);
    },
    'click #editIssuePause':function(e){
        e.preventDefault();
        editParameter("addIssuePause","Częstotliwość dodania kwestii (w minutach)",this.addIssuePause);
    },
    'click #editCommentPause':function(e){
        e.preventDefault();
        editParameter("addCommentPause","Częstotliwość dodania komentarza (w minutach)",this.addCommentPause);
    },
    'click #editReferencePause':function(e){
        e.preventDefault();
        editParameter("addReferencePause","Częstotliwość dodania odniesienia (w minutach)",this.addReferencePause);

    },
    'click #editRRDuration':function(e){
        e.preventDefault();
        editParameter("okresSkladaniaRR","Okres składania Raportów Realizacyjnych (w dniach)",this.addReferencePause);
    }
});
editParameter=function(name,parameterName,value){
    var obj={
        name:name,
        title:parameterName,
        value:value
    };
    Session.setPersistent("chosenParameterSession",obj);
    $("#editParametrMod").modal("show");
};