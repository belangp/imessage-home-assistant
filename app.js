const HomeAssistant = require( 'homeassistant' );
const Pino          = require( 'pino' );

const config   = require( 'config' );
const hass     = new HomeAssistant( config.get( 'home_assistant' ) );
const imessage = require( 'osa-imessage' );
const logger   = Pino();

const logging  = config.get('logging');

// TODO package this better
const bridge = {
  handleMessage: function( sender, text ) {
    if (logging)
       logger.info( `from ${sender}: ${text}` );

    hass.services.call(config.get( 'script' ), 'script', {
        message: text,
        sender: sender 
    }) 
    .catch( err => {
      logger.error( err );
    } );
  }
}

imessage.listen().on( 'message', ( msg ) => {
  if ( msg.fromMe ) {
    return;
  }

  if ( ! config.get( 'allowed_senders' ).includes( msg.handle ) ) {
    logger.warn( `ignoring message from unknown sender: ${msg.handle}: ${msg.text}` );
    return;
  }

  bridge.handleMessage( msg.handle, msg.text );
} );
