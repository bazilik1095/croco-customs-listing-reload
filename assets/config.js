( function ( $ ) {

	$(document).ready(function(){

		let reload = $(".reload-on-interval");

		reload.each(function() {

			let $this = $( this ),
			
			classes   = $this.attr('class').match(/\interval--\S+/g),
			
			classesToString = classes.toString(),
			
			interval =  parseInt(classesToString.match(/\d+/)),

			nav      = $this.find('.jet-listing-grid__items').data( 'nav' ),

			query    = nav.query;

			let args = {
				handler:'get_listing',
				container:$this.find('.elementor-widget-container'),
				masonry:false,
				slider:false,
				append:false,
				query: query,
				widgetSettings: nav.widget_settings,
			};

			setInterval(function() {
			     window.JetEngine.ajaxGetListing(args, function(response){
			     	let $container = $this.children('.elementor-widget-container');
			     	$result = $( response.data.html );
			     	$container.html( $result );
			     	window.JetEngine.widgetListingGrid( $this );
			     	window.JetEngine.initElementsHandlers( $container );
			     });
			}, interval*1000);

		});

	});

} ( jQuery ) );


