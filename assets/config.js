( function ( $ ) {

	$(document).ready(function(){

		let reload = $(".reload-on-interval");

		reload.each(function() {

			let classes = $( this ).attr('class').match(/\interval--\S+/g);

			let classesToString = classes.toString(); 

			let interval =  parseInt(classesToString.match(/\d+/));

			setInterval(function() {
			      window.JetEngine.ajaxGetListing();
			}, interval*1000);

		});

	});

} ( jQuery ) );


