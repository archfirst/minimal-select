$(document).ready(function() {
    'use strict';

    var phones = [
        { id: 'samsung-s4',    name: 'Samsung Galaxy S4' },
        { id: 'apple-iphone5', name: 'Apple iPhone 5'    },
        { id: 'htc-one',       name: 'HTC One'           },
        { id: 'google-n4',     name: 'Google nexus 4'    }
    ];

    var contracts = [
        { id: 'm2m', name: 'Month-to-Month'  },
        { id: '2yr', name: '2-year contract' },
        { id: '1yr', name: '1-year contract' }
    ];

	$('.phone-selector').minimalselect({
		collection: phones,
		labelPath: 'name',
		valuePath: 'id',
		defaultOption: 'samsung-s4',
        change: function(event, ui) {
            console.log(event.type + ': ' + ui.value);
        }
	});

    $('.contract-selector').minimalselect({
        collection: contracts,
        labelPath: 'name',
        valuePath: 'id',
        defaultOption: '2yr',
        change: function(event, ui) {
            console.log(event.type + ': ' + ui.value);
        }
    });
});