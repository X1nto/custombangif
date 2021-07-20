const { Plugin } = require('powercord/entities');
const { inject, uninject } =  require('powercord/injector');
const { getModuleByDisplayName } = require('powercord/webpack');
const { findInReactTree } = require('powercord/util');
const { COCA_COLA_ESPUMA } = require('./constants');

const settings = require('./components/Settings');

module.exports = class CustomBanGif extends Plugin {

    injectId = 'customBanGifInject';

    startPlugin() {
        powercord.api.settings.registerSettings(this.entityID, {
            category: this.entityID,
            label: 'Custom Ban Gif',
            render: settings,
        });

        inject(
            this.injectId, 
            getModuleByDisplayName('BanConfirm', false).prototype, 
            'render',
            (_args, res) => {
                const videoUrl = this.settings.get('videoUrl', COCA_COLA_ESPUMA)
                const gifCotainer = findInReactTree(res, e => e && e.autoPlay && e.loop);
                gifCotainer.children[0].props.src = videoUrl;
    
                return res;
         });
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterSettings(this.entityID);
        uninject(this.injectId)
    }

}