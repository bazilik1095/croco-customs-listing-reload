( function ( $ ) {

	$(document).ready(function(){

		let reload = $(".reload-on-interval");

		reload.each(function() {

			let $this = $( this ),
			
			classes = $this.attr('class').match(/\interval--\S+/g),
			
			classesToString = classes.toString(),
			
			interval =  parseInt(classesToString.match(/\d+/));

			let args = [
				handler = 'get_listing',
				container = $this,
				masonry = false,
				slider = false,
				append = false,
				items = $this.find( '.jet-listing-grid__items' ),
				nav   = items.data( 'nav' ),
				query = nav.query,
				widget_settings = nav.widget_settings,
				postID    = window.elementorFrontendConfig.post.id,
				elementID = $this.data( 'id' )
			];

			console.log(args);

			setInterval(function() {
			     window.JetEngine.ajaxGetListing(args);
			}, interval*1000);

			console.log(window.JetEngine.ajaxGetListing(args));

		});

	});

} ( jQuery ) );


