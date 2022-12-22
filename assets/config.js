( function ( $ ) {

	$(document).ready(function(){

		let reload = $(".reload-on-interval");

		reload.each(function() {

			let $this = $( this ),
				classes   = $this.attr('class').match(/\interval--\S+/g),
				classesToString = classes.toString(),
				interval =  parseInt(classesToString.match(/\d+/));

			if ( $this.hasClass( 'elementor-widget-jet-listing-grid' ) ) {
				
				let nav   = $this.find('.jet-listing-grid__items').data( 'nav' );
				let query = nav.query;

				let args = {
					handler:'get_listing',
					container:$this.find('.elementor-widget-container'),
					masonry:false,
					slider:false,
					append:false,
					query: query,
					widgetSettings: nav.widget_settings,
				};

				setInterval( function() {
				     window.JetEngine.ajaxGetListing(args, function(response){
				     	let $container = $this.children('.elementor-widget-container');
				     	$result = $( response.data.html );
				     	$container.html( $result );
				     	window.JetEngine.widgetListingGrid( $this );
				     	window.JetEngine.initElementsHandlers( $container );
				     });
				}, interval*1000 );
			}

			if ( $this.hasClass( 'elementor-widget-jet-dynamic-table' ) ) {
				
				let tableID = $this.find( '.jet-dynamic-table' ).data( 'table-id' );

				setInterval( function() {
					$this.css( 'opacity', '0.7' );

					$.ajax({
						url: JetEngineSettings.ajaxlisting,
						type: 'POST',
						dataType: 'json',
						data: {
							action: 'jet_engine_ajax',
							handler: 'reload_table_on_interval',
							table_id: tableID,
						},
					}).done( function( response ) {
						$this.css( 'opacity', '1' );
						if ( response.success ) {
							$this.find( '.jet-dynamic-table__body' ).replaceWith( response.data );
						}

					} ).catch( function() {
						$this.css( 'opacity', '1' );
					} );
				}, interval*1000 );
			}

		});

	});

} ( jQuery ) );


