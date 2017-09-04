import React from 'react'
//import ImageResource from '../../ImageResource'


class CButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (this.props.onClick != undefined) {
            this.props.onClick(this);
        }
    }

    render() {

        let ico;
        if (this.props.ico != undefined && this.props.ico != null) {
            if (this.props.ico.indexOf('fa-') > -1) {
                ico = <i className={"fa " + this.props.ico} />;
            }
            else {
                ico = <img src={ImageResource[this.props.ico]} className="icoLabel" />;
            }
        }
        else {
            ico = null;//ImageResource['defaultRed'];
        }

        let resultMsg = '';
        if (this.props.resource != undefined && this.props.resource != null)
        {
            if (this.props.resource.resourceModel === undefined || this.props.idResource === '') {
                resultMsg = 'TEXT NOT DEFINED'
            }
            else if (this.props.resource.resourceModel.filter(e => e.idResource == this.props.idResource)[0] === undefined) {
                resultMsg = 'TEXT NOT DEFINED'
            }
            else {
                resultMsg = this.props.resource.resourceModel.filter(e => e.idResource == this.props.idResource)[0].value
            }
        }

    const onlyText = this.props.onlyText || false
    
        return (
            <button className={`buttonContainer ${this.props.cssClass}`} autoFocus={this.props.autoFocus}
                name={this.props.name}
                value={this.props.value}
                onClick={(e) => { this.handleClick(e); }}
            >{ico}
             {resultMsg}</button>
        )
    }
}

export default CButton;