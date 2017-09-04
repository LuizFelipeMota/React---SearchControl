import React from 'react'
//import ImageResource from '../../ImageResource'

class CLabel extends React.Component {
    constructor(props) {
        super(props);
    }
    render()
    {
        let ico;
        if (this.props.ico != undefined && this.props.ico != null)
        {
            if (this.props.ico.indexOf('fa-') > -1) {
                ico = <i className={"fa " + this.props.ico} />;
            }
            else {
                ico = <img src={ImageResource[this.props.ico]} className="icoLabel" />;
            }
        }
        else {
            ico = <img src={ImageResource['transparent']} style={{ height: '30px', width: '0px'  }} />;
        }

        let resultMsg = undefined
        if (this.props.resource === undefined) {
            resultMsg = 'TEXT NOT DEFINED'
        }
        else if (this.props.idResource === '' || this.props.idResource === undefined || this.props.idResource === null) {
            resultMsg = ''
        }
        else if (this.props.resource.resourceModel.filter(e => e.idResource == this.props.idResource)[0] === undefined) {
            resultMsg = 'TEXT NOT DEFINED'
        }
        else {
            resultMsg = this.props.resource.resourceModel.filter(e => e.idResource == this.props.idResource)[0].value
        }

        return (
            <label className={`labelContainer ${this.props.cssClass}`}
                form={this.props.form}
                htmlFor={this.props.htmlFor}>
                {ico}
                {resultMsg}
                </label>
            );
    }   
}

export default CLabel;