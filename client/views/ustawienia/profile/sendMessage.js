Template.sendMessage.rendered=function(){
};
Template.sendMessage.helpers({
   myData:function(){
       return Meteor.user().profile.firstName+" "+Meteor.user().profile.lastName;
   },
    receiverData:function(){
        var user=Users.findOne({_id:this._id});
        return user ? user.profile.firstName+ " "+user.profile.lastName : null;
    }
});

Template.sendMessage.events({
    'submit form': function (e) {
        e.preventDefault();
        var subject=$(e.target).find('[name=topic]').val();
        var content=$(e.target).find('[name=content]').val();
        var idReceiver=this._id;
        var newEmail = [
            {
                idSender: Meteor.userId(),
                idReceiver: this._id,
                createdAt: new Date(),
                subject: subject,
                content: content
            }];

        var text=null;
        if(subject.trim()==null || subject=="") {
            if (content.trim() == null || content == "")
                text = "tematu i treści?";
            else text = "tematu?";
            askToFillSubject(text,newEmail);
        }
        else
            sendMessage(newEmail,idReceiver);

    },
    'reset form': function () {
        Router.go('administracjaUserMain');
    }
});

sendMessage=function(newEmail,idReceiver){
    Meteor.call('sendMessageToUser', newEmail, function (error, ret) {
        if (error) {
            if (typeof Errors === "undefined")
                Log.error('Error: ' + error.reason);
            else
                throwError(error.reason);
        }
        else {
            var from=Meteor.user().profile.firstName+" "+Meteor.user().profile.lastName;
            addPowiadomienieFunction( newEmail[0]);
            Meteor.call("sendDirectMessageToUser",idReceiver,from, newEmail[0].subject, newEmail[0].content, function(error){
                if (error) {

                    var emailError = {
                        idUser: Meteor.userId(),
                        type: NOTIFICATION_TYPE.MESSAGE_FROM_USER
                    };
                    Meteor.call("addEmailError", emailError);
                }
            });
            Router.go('administracjaUserMain');
        }
    });
};
addPowiadomienieFunction=function(content){
    var newPowiadomienie ={
        idOdbiorca: content.idReceiver,
        idNadawca: Meteor.userId(),
        dataWprowadzenia: new Date(),
        tytul: content.subject,
        powiadomienieTyp: NOTIFICATION_TYPE.MESSAGE_FROM_USER,
        tresc: content.content,
        czyAktywny: true,
        czyOdczytany:false
    };
    Meteor.call("addPowiadomienie",newPowiadomienie,function(error){
        if(error)
            throwError(error.reason);
    })
};
askToFillSubject=function(text,newEmail){
    var result=null;
    bootbox.dialog({
        message: "Czy wysłać email bez "+text,
        title: "Uwaga",
        closeButton:false,
        buttons: {
            success: {
                label: "Wyślij",
                className: "btn-success successAttention",
                callback: function() {
                    $('.successAttention').css("visibility", "hidden");
                    sendMessage(newEmail);
                }
            },
            danger: {
                label: "Anuluj",
                className: "btn-danger",
                callback:function(){
                    $('.successAttention').css("visibility", "visible");
                }
            }
        }
    });
};
