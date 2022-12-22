<?php
/**
 * Plugin Name: Croco Customs Listing Reload
 * Plugin URI:
 * Description: Listing reload 
 * Version:     1.0.0
 * Author:
 * Author URI:
 * Text Domain: croco-clr
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Croco_Customs_Listing_Reload{

    /**
     * Plugin constructor.
    */
    public function __construct() {
        add_action( 'wp_enqueue_scripts', array( $this, 'assets' ));
        add_action( 'jet-engine/ajax-handlers/before-do-ajax', array( $this, 'table_reload' ) );
    }

    public function table_reload() {
        if ( ! empty( $_REQUEST['handler'] ) && 'reload_table_on_interval' === $_REQUEST['handler'] ) {

            $table_id = absint( $_REQUEST['table_id'] );
            $settings = [ 'table_id' => $table_id ];
            
            $render = jet_engine()->listings->get_render_instance( 'dynamic-table', $settings );

            ob_start();
            $render->setup_table( $table_id, array(), $render->get_settings() );
            $render->table_body();
            $content = ob_get_clean();

            wp_send_json_success( $content );

        }
    }

   /**
    * Enqueue assets
    *
    * @return [type] [description]
    */
    public function assets() {
        wp_enqueue_script(
            'config-clr',
            plugins_url( 'assets/config.js', __FILE__ ),
            array('jquery'),
            '1.0.0',
            true
        );
    }
}


new Croco_Customs_Listing_Reload();