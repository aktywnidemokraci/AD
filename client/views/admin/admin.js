Template.adminTemplate.helpers({
    usersCount: function () {
        return Users.find().count();
    },
    rodzajeCount: function () {
        return Rodzaj.find().count();
    },
    parametryCount: function () {
        return Parametr.find().count();
    },
    tematyCount: function () {
        return Temat.find().count();
    },
    raportyCount: function () {
        return Raport.find().count();
    },
    kwestieCount: function () {
        return Kwestia.find({czyAktywny: true}).count();
    }
});

function builtColumn() {
    $('#container-column').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Statystyki systemu'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [
                '',
                'Liczba użytkowników',
                'Liczba parametrów',
                'Liczba rodzajów'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Liczba'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Użytkownicy',
                data: [Users.find().count()]
            },
            {
                name: 'Rodzaje',
                data: [Rodzaj.find().count()]
            },
            {
                name: 'Parametry',
                data: [Parametr.find().count()]
            },
            {
                name: 'Tematy',
                data: [Temat.find().count()]
            },
            {
                name: 'Raporty',
                data: [Raport.find().count()]
            },
            {
                name: 'Kwestie',
                data: [Kwestia.find({czyAktywny: true}).count()]
            }
        ]
    });
}
/*
 * Call the function to built the chart when the template is rendered
 */
Template.columnDemo.rendered = function () {
    builtColumn();
};