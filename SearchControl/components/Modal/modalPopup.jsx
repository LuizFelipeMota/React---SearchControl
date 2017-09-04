import React from 'react'
//import cssStyle from './modalStyle.css'
//style = { this.props.defaultCss ? cssStyle : undefined }

class ModalPopup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="modalPopupContainer" >
                <div className="modalPopup">
                    <div className="modalPainelHeader">
                        <div className="closeModal" onClick={this.props.closeModal}>&times;</div>
                    </div>
                    <div className="modalPainelBody">
                        <div className="modalContent">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// ModalPopup.propTypes = {
//     closeModal: React.PropTypes.func.required
// }

export default ModalPopup