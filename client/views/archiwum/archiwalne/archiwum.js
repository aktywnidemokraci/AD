Template.archiwumList.events({
    'click .glyphicon-trash': function (event, template) {
        Session.set('kwestiaInScope', this);
    },
    'click .glyphicon-pencil': function (event, template) {
        Session.set('kwestiaInScope', this);
    },
    'click .glyphicon-repeat': function (event, template) {
        Session.set('kwestiaInScope', this);
    },
    'click .glyphicon-info-sign': function (event, template) {
        Session.set('kwestiaInScope', this);
    }
});
Template.archiwumList.helpers({
    'settings': function () {
        return {
            rowsPerPage: 15,
            showFilter: true,
            showNavigation: 'always',
            showColumnToggles: false,
            enableRegex: false,
            fields: [
                { key: 'dataWprowadzenia', label: "Data wprowadzenia", tmpl: Template.dataUtwKwestia },
                { key: 'kwestiaNazwa', label: "Nazwa", tmpl: Template.nazwaKwestiiArchiwumLink },
                { key: 'wartoscPriorytetu', label: "Priorytet", tmpl: Template.priorytetKwestia ,sortOrder:1,sortDirection:'ascending'},
                { key: '', label: "Temat", tmpl: Template.tematKwestiiArchiwum },
                { key: '', label: "Rodzaj", tmpl: Template.rodzajKwestiiArchiwum },
                { key: 'status', label: "Status" }
            ]
        };
    },
    'isAdminUser': function () {
        return IsAdminUser();
    },
    'tematNazwa': function () {
        return Temat.findOne({_id: this.idTemat});
    },
    'rodzajNazwa': function () {
        return Rodzaj.findOne({_id: this.idRodzaj});
    }
});

Template.archiwum.rendered = function () {
    $('[data-toggle="tooltip"]').tooltip();
}

Template.tematKwestiiArchiwum.helpers({
    'getTemat': function (id) {
        if(this.typ==KWESTIA_TYPE.GLOBAL_PARAMETERS_CHANGE)
            return "techniczna systemowa";
        var item = Temat.findOne({_id: id});
        return !!item && !!item.nazwaTemat ? item.nazwaTemat : id;
    }
});

Template.rodzajKwestiiArchiwum.helpers({
    'getRodzaj': function (id) {
        if(this.typ==KWESTIA_TYPE.GLOBAL_PARAMETERS_CHANGE)
            return "techniczna systemowa";
        var item = Rodzaj.findOne({_id: id});
        return !!item && !!item.nazwaRodzaj ? item.nazwaRodzaj : id;
    }
});