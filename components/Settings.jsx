const { React } = require('powercord/webpack')
const { TextInput } = require('powercord/components/settings');
const { COCA_COLA_ESPUMA } = require('../constants');

module.exports = class CustomBanGifSettings extends React.PureComponent {

    constructor(props) {
        super();
    }

    render() {
        return(
            <div>
                <TextInput
                    defaultValue={this.props.getSetting('videoUrl', COCA_COLA_ESPUMA)}
                    onChange={(value) => this.props.updateSetting('videoUrl', value)}>
                    Video URL
                </TextInput>
            </div>
        )
    }

}