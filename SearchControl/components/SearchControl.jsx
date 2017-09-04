/*
*
* SearchControl
* Author: Luiz Felipe Mota
* Create: 29/06/2017
* Update: 29/06/2017
*
*
* Propertyes: resource: Array passed from the Parent Component containing all the labels of form. 
*             dataSource: Array with relevant data,
*             dataValue: "dataSource" field that will be used as "Code",
*             dataText: "dataSource" field used as Description,
*             nameSpace: Reference to the store namespace at Redux,
*             onChange: Return a callback when a "Code" change,
*             ico: Pass a icon image to the button,
*             textButton: Pass a text to the button;
*
* Example:
*
* <SearchControl resource={Resource} dataSource={Resource2} dataValue="Code" dataText="Description" namespace="search" textButton='OK' onChange={() => {alert('test')}} />
*/
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { handleChange, handleChangeDesc, handleBlur, handleBlurDesc, handleClick, setModalData, setValue, setData } from './searchControlActions'

import Grid, { Column, ColumnButton } from './Grid/Grid'
import Modal from './Modal/modalPopup'
import CFILabel from './Label/CLabel'
import CFIButton from './Button/CButton'

class SearchControl extends React.Component {
    constructor(props) {
        super(props)
        this.renderModal = this.renderModal.bind(this)
    }

    //Render popup with Grid
    renderModal() {
        return this.props.search.modal ?
            <Modal closeModal={() => this.props.handleClick(this.props.id)}>
                <Grid resource={this.props.resource} dataSource={this.props.search.data} namespace={this.props.id} />
            </Modal> : ''
    }

    //If the grid selected line is different than the last selected line, the component is filled with the new data.
    componentDidUpdate(prevProps) {
        if ((prevProps.search.row != this.props.search.row) && this.props.search.row.length != 0) {
            this.props.setModalData(this.props.dataValue, this.props.dataText, this.props.search.row, this.props.id)
            this.props.handleClick(this.props.id)
        }
        if (this.props.search.isBlur) {
            if ((prevProps.search.description != this.props.search.description) ||
                (prevProps.search.description == "" && this.props.search.description == "")) {
                this.props.onChange({
                    id: this.props.id,
                    value: this.props.search.value,
                    text: this.props.search.desc,
                    new: this.props.search.desc == '' ? true : false,
                    type: 'searchControl'
                })
            }

        }
        if (this.props.search.firstLoad == true && this.props.search.data.length > 0) {
            this.props.setValue(this.props.value, this.props.search.data, this.props.dataValue, this.props.dataText, this.props.id);
        }
    }

    //Set component dataSource
    componentWillMount() {
        if (this.props.dataSource != undefined) {
            this.props.setData(this.props.dataSource, this.props.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.props.value) {
            this.props.setValue(nextProps.value, this.props.search.data, this.props.dataValue, this.props.dataText, this.props.id);
        }
    }

    render() {
        let ico = undefined
        let textButton = undefined

        ico = this.props.ico
        if (this.props.textButton != undefined) {
            textButton = this.props.textButton
        }
        if (textButton == '' || textButton == undefined) {
            textButton = 'Busca'
        }

        return (
            <div className={`searchContainer ${this.props.cssClass}`}>
                <CFILabel resource={this.props.resource} idResource={this.props.idResource} ico={this.props.ico} />
                <input type="text" placeholder="Codigo" onChange={(e) => this.props.handleChange(e, this.props.id)}
                    onBlur={e => { this.props.handleBlur(e, this.props.search.data, this.props.dataValue, this.props.dataText, this.props.id) }}
                    value={this.props.search.value} id={this.props.id} maxLength={this.props.maxLengthCode} />
                <input type="text" onChange={(e) => this.props.handleChangeDesc(e, this.props.id)} placeholder="Descrição"
                    onBlur={e => { this.props.handleBlurDesc(e,this.props.id) }}
                    value={this.props.search.desc} id={this.props.id + 'text'} maxLength={this.props.maxLengthDesc}/>
                <CFIButton onClick={() => this.props.handleClick(this.props.id)} ico="browserWhite"/>
                {this.renderModal()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    search: state[ownProps.id] ,
    value: ownProps.hasOwnProperty("dataStore") ? state[ownProps.nameSpace][ownProps.dataStore][ownProps.id] : state[ownProps.nameSpace][ownProps.id]
})

const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators({
        handleChange: (e, namespace) => handleChange(e, ownProps.id),
        handleBlurDesc: (e,namespace) => handleBlurDesc(e,ownProps.id),
        handleChangeDesc: (e, namespace) => handleChangeDesc(e, ownProps.id),
        handleBlur: (e, arr, dataValue, dataText, namespace) => handleBlur(e, arr, dataValue, dataText, ownProps.id),
        handleClick: namespace => handleClick(ownProps.id),
        setModalData: (val, text, row) => setModalData(val, text, row, ownProps.id),
        setValue: (val, arr, dataValue, dataText, namespace) => setValue(val, arr, dataValue, dataText, ownProps.id),
        setData: (arr, namespace) => setData(arr, ownProps.id)
    }, dispatch)

SearchControl.propTypes = {
    onChange: React.PropTypes.func
}

SearchControl.defaultProps = {
    onChange: () => { }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchControl)