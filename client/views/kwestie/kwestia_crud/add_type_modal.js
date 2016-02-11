/**
 * Created by Bartłomiej Szewczyk on 2015-11-26.
 */
Template.addTypeModalInner.helpers({
    topicName: function() {
        var topicId = Session.get("choosenTopic");
        if (topicId!=null){
            return topicId;
        }
        else{
            return null
        }
    }
});

Template.addTypeModalInner.events({
    'click #addTypeModalBtn': function(){
        document.getElementById("addTypeModalBtn").disabled = true;
        Meteor.setTimeout(function(){
            document.getElementById("addTypeModalBtn").disabled = false;
        }, 2000);

        var nazwaRodzaj = document.getElementById("typeName").value;
        var temat = Temat.findOne({nazwaTemat: Session.get("choosenTopic")});
        var typesCount = 0;
        if(temat) {
            typesCount = Rodzaj.find({idTemat: temat._id, nazwaRodzaj: nazwaRodzaj}).count();
        }

        if(typesCount>0){
            GlobalNotification.error({
                title: 'Uwaga',
                content: "Podany rodzaj dla tego tematu już istnieje",
                duration: 5 // duration the notification should stay in seconds
            });
        }else{
            if(nazwaRodzaj == "" || nazwaRodzaj == null) {
                GlobalNotification.error({
                    title: 'Uwaga',
                    content: "Pole rodzaj nie może być puste",
                    duration: 5 // duration the notification should stay in seconds
                });
            }else{
                Session.setPersistent("choosenType", document.getElementById("typeName").value);
                $("#addTypeModalId").modal("hide");
            }
        }

        if(temat){
            if(Rodzaj.find({idTemat: temat._id}).count()>0) {
            document.getElementById("chooseTypeBtn").disabled = false;
            }
            else{
                document.getElementById("chooseTypeBtn").disabled = true;
            }
        }
    }
});