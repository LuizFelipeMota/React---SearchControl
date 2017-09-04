/*
*
* Grid
* Author: Luiz Felipe Mota
* Create: 06/06/2017
* Update: 06/06/2017
*
*
* Propertyes: autoGenerate: If "true" generate the grid using the datasource, else the data will be generate through the children;
* Example:
*
* <Grid autoGenerate={false} resource={Resource} dataSource={Resource2}>
    <ColumnButton idResource="alter" onClick={() => {alert("test")}} />
    <ColumnButton idResource="delete" onClick={() => {alert("test2")}} />
    <Column columnName="Code" idResource="codeValue" />
    <Column columnName="Description" idResource="nomCli" />
    <Column columnName="Fone" idResource="foneCli" />
</Grid>

OR

<Grid autoGenerate={true} resource={Resource} dataSource={Resource2}>
    <ColumnButton idResource="alter" onClick={() => {alert("test")}} />
    <ColumnButton idResource="delete" onClick={() => {alert("test2")}} />
</Grid>

OR

<Grid dataSource={Resource2} />
*/
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setDataSource, getDataUrl, setRow } from './gridActions'
import CFILabel from '../../CFILabel/component/CFILabel'

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {
        if (this.props.urlDataSource != undefined) {
            this.props.getDataUrl(this.props.urlDataSource, this.props.namespace)
        }
        else {
            this.props.setDataSource(this.props.dataSource, this.props.namespace)
        }
    }

    handleClick(event) {
        event();
    }

    render() {
        let _count = 0
        if (this.props.grid.data.length > 0) {
            return (
                <table className="tableContainer">
                    <thead className="header">
                        <tr>
                            {/*If autoGenerate == "true", I generate the column header*/}
                            {this.props.autoGenerate == true ? React.Children.map(this.props.children, child =>
                                child.type.name == "ColumnButton" ?
                                    <th key={_count++}><CFILabel resource={this.props.resource} idResource={this.props.idResource} ico={this.props.ico} /></th> : undefined) : undefined}
                            {this.props.autoGenerate == true ? Object.keys(this.props.grid.data[0]).map((col, i) =>
                                <th key={_count++}>{col}</th>
                            ) : React.Children.map(this.props.children, (child, i) =>
                                    <th key={i}>{<CFILabel resource={this.props.resource} idResource={this.props.idResource} ico={this.props.ico} />}</th>)}
                        </tr>
                    </thead>
                    <tbody className="body">
                        {/*Maps all lines of dataSource to generate the grid */}
                        {this.props.grid.data.map((row, y) =>
                            <tr key={y} onClick={() => { this.props.setRow(row, this.props.namespace) }}>
                                {/*If autoGenerate == "true", I map all of childs to know if exist a columnButton, if exist
                                a button is generate. After I search for all of registry in dataSource through Object.keys.
                                If autoGenerate == "false", I map the childs through of types. */}
                                {this.props.autoGenerate == true ? React.Children.map(this.props.children, (child, i) =>
                                    child.type.name == "ColumnButton" ?
                                        <td key={i}><button onClick={() => { this.handleClick(child.props.onClick) }}>{child.props.idResource}</button></td> :
                                        undefined) :
                                    undefined}
                                {this.props.autoGenerate == true ? Object.keys(row).map((field, i) =>
                                    <td key={i + React.Children.count(this.props.children)}>{row[field]}</td>) :
                                    React.Children.map(this.props.children, (child, i) =>
                                        child.type.name == "ColumnButton" ? <td key={i}><button onClick={() => { this.handleClick(child.props.onClick) }}>
                                            {child.props.idResource}</button></td> :
                                            <td key={i}>{row[child.props.columnName]}</td>)}
                            </tr>
                        )}
                    </tbody>
                </table>
            )
        } else { return (null) }
    }
}

Grid.propTypes = {
    autoGenerate: React.PropTypes.bool
}
Grid.defaultProps = {
    autoGenerate: true
}

export class Column extends React.Component {
    render() {
        return (
            {}
        )
    }
}

export class ColumnButton extends React.Component {
    render() {
        return (
            {}
        )
    }
}

const mapStateToProps = (state, ownProps) => ({ grid: state[ownProps.namespace] })
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators({
        setDataSource: (arr) => setDataSource(arr, ownProps.namespace),
        getDataUrl: (url, namespace) => getDataUrl(url, ownProps.namespace),
        setRow: (arr) => setRow(arr, ownProps.namespace)
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Grid)