Template.activateAccount.rendered=function(){
    var currentRoute=Router.current().params;
    var userD=UsersDraft.findOne({linkAktywacyjny:currentRoute.linkAktywacyjny});
    if(userD){
        var clickedLinkCount=userD.licznikKlikniec+1;
        Meteor.call("updateLicznikKlikniec",userD._id,clickedLinkCount,function(error){
            if(!error){
                var userDraft=UsersDraft.findOne({linkAktywacyjny:currentRoute.linkAktywacyjny,czyAktywny:true});
                if(userDraft) {
                    Meteor.call("serverGenerateLogin",
                        userDraft.profile.firstName,
                        userDraft.profile.lastName,
                        function(err, ret){
                        if(!err){
                            var newUser = [
                                {
                                    email: userDraft.email,
                                    login: "",
                                    firstName: userDraft.profile.firstName,
                                    lastName: userDraft.profile.lastName,
                                    address: userDraft.profile.address,
                                    zip: userDraft.profile.zip,
                                    role: 'user',
                                    userType: userDraft.profile.userType,
                                    uwagi: userDraft.profile.uwagi,
                                    language: userDraft.profile.language,
                                    city:userDraft.profile.city,
                                    pesel:userDraft.profile.pesel,
                                    rADking:0

                                }];
                            newUser[0].login = ret;
                            newUser[0].fullName=newUser[0].firstName+" "+newUser[0].lastName;
                            newUser[0].password=CryptoJS.MD5(newUser[0].login).toString();
                            newUser[0].confirm_password=newUser[0].password;

                            Meteor.call('addUser', newUser, function (error,ret) {
                                if (error) {
                                    throwError(error.reason);
                                }
                                else {
                                    var idUser=ret;
                                    Meteor.call("removeUserDraftAddNewIdUser", userDraft._id,idUser, function (error) {
                                        if (error)
                                            throwError(error.reason);
                                        else{
                                            Meteor.call("sendFirstLoginData",idUser,newUser[0].password,function(error){
                                                if(error){
                                                    bootbox.alert("Z powodu błędu serwera pocztowego link z danymi do logowania " +
                                                        "nie został wysłany. Aby zalogować się do systemu możesz " +
                                                        "skorzystać z opcji przypomnienia hasła");

                                                    var emailError = {
                                                        idUserDraft: userDraft._id,
                                                        type: NOTIFICATION_TYPE.FIRST_LOGIN_DATA
                                                    };
                                                    Meteor.call("addEmailError", emailError);
                                                }

                                            })
                                        }
                                    });
                                }
                            });
                        }else{
                            throwError(err.reason);
                        }
                    });
                }
            }
            else{
                throwError(error.reason);
            }
        });
    }

};
Template.activateAccount.helpers({
    activatedAccountRightNow:function(){
        var currentRoute=Router.current().params;
        var userDraft=UsersDraft.findOne({linkAktywacyjny:currentRoute.linkAktywacyjny});
        if(userDraft)
            return userDraft.licznikKlikniec==1 ? true : false;
        return true;
    },
    notActivatedAccount:function(){
        var currentRoute=Router.current().params;
        var userDraft=UsersDraft.findOne({linkAktywacyjny:currentRoute.linkAktywacyjny});
        if(userDraft)
            return userDraft.czyAktywny==true && userDraft.licznikKlikniec==0 ? true : false;
        return true;
    },
    link:function(){
        return Meteor.absoluteUrl()+'account/login';
    },
    notFound: function(){
        var currentRoute=Router.current().params;
        if(UsersDraft.findOne({linkAktywacyjny:currentRoute.linkAktywacyjny})){
            return false;
        }else {
            return true;
        }
    }
});