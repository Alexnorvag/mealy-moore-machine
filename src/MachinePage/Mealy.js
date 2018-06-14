import React, {Component} from 'react';
import ReactTable from "react-table";
import update from 'immutability-helper';
import {Table, Button, ListGroup, ListGroupItem} from 'reactstrap';

import './Mealy.scss';

class Mealy extends Component {
    constructor() {
        super();

        this.state = {
            stateSet: 1,
            inputSignals: 1,
            outputSignals: 1,
            data: [
                {
                    inSignal: 'z1'
                }
            ],
            columns: [
                {
                    Header: 'Z/A',
                    accessor: 'inSignal',
                    minWidth: 40
                }, {
                    Header: 'a1',
                    accessor: 'a1',
                    minWidth: 40
                }
            ],
            statesArray: [],
            outputsArray: [],
            tableCells: [],
            triangleData: [],
            equivalentStates: [],
            showTriangle: false
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleChangeSelect = this
            .handleChangeSelect
            .bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        }, () => this.generateData());
    }

    handleChangeSelect(event, i, j) {
        if (event.target.name.indexOf('selectState') !== -1) {
            // eslint-disable-next-line
            this.state.statesArray[i][j] = event.target.value;
            this.generateTable();
        } else {
            // eslint-disable-next-line
            this.state.outputsArray[i][j] = event.target.value;
            this.generateTable();
        }
    }

    generateData() {
        var dataStates = [];
        var dataOutputs = [];

        for (let i = 0; i < this.state.inputSignals; i++) {
            dataStates[i] = [];
            dataOutputs[i] = [];
            for (let j = 0; j < this.state.stateSet; j++) {
                dataStates[i][j] = "selectState00";
                dataOutputs[i][j] = "selectOutput00";
            }
        }
        this.setState({
            statesArray: dataStates,
            outputsArray: dataOutputs
        }, () => this.generateTable());
    }

    generateTable() {
        const testData = [];
        const testCol = [];
        const selectStateArray = [];
        const testCells = [];

        //первая колонка
        testCol.push({Header: 'Z/A', accessor: 'inSignal', minWidth: 40});

        for (let i = 0; i < this.state.inputSignals; i++) {
            var optionListA = this.createOptions(i, 'a');
            var optionListW = this.createOptions(i, 'w');
            selectStateArray[i] = []

            //остальные данные
            for (let j = 0; j < this.state.stateSet; j++) {
                selectStateArray[i][j] = (
                    <div>
                        <select
                            name={"selectState" + i + j}
                            value={this.state.statesArray[i][j]}
                            className="select-style"
                            onChange={(e) => this.handleChangeSelect(e, i, j)}>
                            {optionListA}
                        </select>
                        <select
                            name={"selectOutput" + i + j}
                            value={this.state.outputsArray[i][j]}
                            className="select-style"
                            onChange={(e) => this.handleChangeSelect(e, i, j)}>
                            {optionListW}
                        </select>
                    </div>
                );
            }

            //данные для первой колонки
            testData.push({
                inSignal: 'z' + (i + 1),
                arr: selectStateArray[i]
            });
        }

        //добавление названий для каждой колонки
        for (let i = 0; i < this.state.stateSet; i++) {
            testCol.push({
                Header: 'a' + (i + 1),
                id: i,
                accessor: 'arr.' + i,
                minWidth: 40
            });
            testCells.push(
                <tr key={i + 'a'}>
                    {this.createTableRows(i + 1, testData)}
                </tr>
            );
        }

        this.setState({
            data: update(this.state.data, {$set: testData}),
            columns: update(this.state.columns, {$set: testCol}),
            tableCells: update(this.state.tableCells, {$set: testCells})
        }, () => {
            // console.log("Data: ", this.state.data); console.log("Col: ",
            // this.state.columns); console.log("States: ", this.state.statesArray);
            // console.log("Outputs: ", this.state.outputsArray);
        });
    }

    isColEqual(mainCol, compCol, data) {
        let isEqual = true;

        for (let i = 0; i < this.state.inputSignals; i++) {
            isEqual = isEqual && data[i].arr[mainCol].props.children[1].props.value === data[i].arr[compCol].props.children[1].props.value;
        }

        return isEqual;
    }

    equivalentCells(mainCol, compCol, data) {
        let equivPairs = [];

        for (let i = 0; i < this.state.inputSignals; i++) {
            let main = parseInt(data[i].arr[mainCol].props.children[0].props.value.substr(-1), 10) + 1;
            let comp = parseInt(data[i].arr[compCol].props.children[0].props.value.substr(-1), 10) + 1;
            if (!(this.isColEqual(main - 1, comp - 1, data))) {
                equivPairs = [];
                equivPairs[i] = 'false';
                i++;
            } else if (!(comp === main || (compCol + 1 === comp && mainCol + 1 === main) || (compCol + 1 === main && mainCol + 1 === comp))) {
                equivPairs[i] = comp < main
                    ? '(a' + comp + ', a' + main + ')'
                    : '(a' + main + ', a' + comp + ')';
            }
        }

        equivPairs = [...new Set(equivPairs)];
        if (equivPairs.length === 0) {
            equivPairs.push('\u2205');
        }

        const index = equivPairs.indexOf(undefined);
        if (index !== -1) {
            equivPairs.splice(index, 1);
        }

        return equivPairs;
    }

    createTableRows = (count, data) => {
        let tableRows = [];
        let testTriangleData = [];

        if (count < this.state.stateSet) {
            tableRows.push(
                <td className="font-weight-bold text-monospace p-1 align-middle" key={count}>{'a' + (count + 1)}</td>
            );
            for (let i = 0; i < count; i++) {

                if (this.isColEqual(count, i, data)) {
                    testTriangleData[i] = this.equivalentCells(count, i, data);
                } else {
                    testTriangleData[i] = "false";
                }

                tableRows.push(
                    <td
                        key={'x' + i}
                        className={'p-1 ' + (this.isColEqual(count, i, data)
                        ? "small align-middle"
                        : "crossed")}>
                        {this.isColEqual(count, i, data) && this
                            .equivalentCells(count, i, data)
                            .map((pair, index) => (
                                <h6 key={index} className={'m-1 ' + (pair === 'false' && "crossed")}>
                                    {pair === 'false'
                                        ? '\u00A0'
                                        : pair}
                                </h6>
                            ))}
                    </td>
                );
            }
            // eslint-disable-next-line
            this.state.triangleData[count] = testTriangleData;
        } else {
            tableRows.push(
                <td key={count + 1}>{' '}</td>
            );
            for (let i = 1; i < count; i++) {
                tableRows.push(
                    <td className="font-weight-bold text-monospace" key={'a' + i}>{'a' + i}</td>
                );
            }
        }

        this
            .state
            .triangleData
            .splice(this.state.stateSet);

        return tableRows;
    }

    createOptions = (rowNumber, optionName) => {
        let options = [];
        if (optionName === 'a') {
            for (let i = 1; i <= this.state.stateSet; i++) {
                options.push(
                    <option value={'selectState' + rowNumber + (i - 1)} key={i}>{optionName + i}
                    </option>
                )
            }
        } else {
            for (let i = 1; i <= this.state.outputSignals; i++) {
                options.push(
                    <option value={'selectOutput' + rowNumber + (i - 1)} key={i}>{optionName + i}
                    </option>
                )
            }
        }

        return options;
    }

    showTriangleTable() {

        this.setState({
            showTriangle: !this.state.showTriangle
        });
    }

    areEqual(startPos, array, numF, numS) {
        for (let i = startPos; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j][0] === numF && array[i][j][1] === numS) {
                    return i + ',' + j
                }
            }
        }
    }

    equivalentSystem() {;
        let testStatesA = [];
        let testStates = [];
        let exmplA = [];

        for (let i = 0; i < this.state.triangleData.length; i++) {
            testStates[i] = [];
            exmplA.push("a" + (i + 1));
            for (let j = i + 1; j < this.state.triangleData.length; j++) {
                if (!(this.state.triangleData[j][i] === "false" || this.state.triangleData[j][i].toString() === "false")) {
                    testStates[i].push([
                        'a' + (i + 1),
                        'a' + (j + 1)
                    ]);
                }
            }
        }

        testStates = testStates.filter(element => element.length > 0);

        for (let i = 0; i < testStates.length; i++) {
            testStatesA[i] = testStates[i];
            for (let j = 0; j < testStatesA[i].length; j++) {
                for (let k = j + 1; k < testStatesA[i].length; k++) {
                    if (testStates[i][j][0] === testStates[i][k][0]) {
                        if (!(this.areEqual(i + 1, testStates, testStates[i][j][1], testStates[i][k][1]) === undefined)) {
                            let arr = this.areEqual(i + 1, testStates, testStates[i][j][1], testStates[i][k][1])
                                .split(',')
                                .map(Number);
                            testStates.splice(arr[0], 1);
                            testStates.splice(arr[0], 1);
                        }
                        testStatesA[i][j].push(testStates[i][k][0], testStates[i][k][1]);
                        testStatesA[i].splice(k, 1);
                        testStatesA[i][j] = [...new Set(testStatesA[i][j])];
                    }
                }
            }
        }

        for (let i = 0; i < testStatesA.length; i++) {
            for (let j = 0; j < testStatesA[i].length; j++) {
                for (let k = 0; k < testStatesA[i][j].length; k++) {
                    exmplA.splice(exmplA.indexOf(testStatesA[i][j][k]), 1);
                }
            }
        }

        exmplA.every(el => testStatesA.push([
            [el]
        ]));
        // eslint-disable-next-line
        this.state.equivalentStates = testStatesA;

        return testStatesA;
    }

    minimizedTable() {
        let tableRows = [];
        let headOptions = [];
        let bodyOptions = [];

        for (let i = 0; i < this.state.equivalentStates.length; i++) {
            headOptions.push(
                <th key={"b" + i}>{"b" + (i + 1)}</th>
            );
        }

        for (let i = 0; i < this.state.inputSignals; i++) {
            bodyOptions[i] = [];
            for (let j = 0; j < this.state.equivalentStates.length; j++) {

                bodyOptions[i][j] = (
                    <td key={"el" + i + j}>{"b" + (this.state.equivalentStates.map((el) => el.map((val) => val.indexOf('a' + (parseInt(this.state.statesArray[i][(this.state.equivalentStates[j][0][0].substring(1) - 1)].substring(12), 10) + 1)))).findIndex(c => c >= 0) + 1) + "/w" + (parseInt(this.state.outputsArray[i][(this.state.equivalentStates[j][0][0].substring(1) - 1)].substring(13), 10) + 1)}</td>
                );
            }
        }

        tableRows.push(
            <tr className="font-weight-bold text-monospace p-1 align-middle" key={"head1"}>
                <th>Z\A</th>
                {headOptions.map((el) => el)}
            </tr>
        );

        for (let i = 0, j = 0; i < this.state.inputSignals && j < bodyOptions.length; i++, j++) {
            tableRows.push(
                <tr key={"minBody" + i}>
                    <th scope="row" className="font-weight-bold text-monospace p-1 align-middle">{"z" + (i + 1)}</th>
                    {bodyOptions[j].map((el) => el)}
                </tr>
            );
        }

        return tableRows;
    }

    render() {

        return (
            <div className="mealy-machine mt-3">
                <div className="row mx-0">
                    <div className="col-4">
                        <label htmlFor="stateSet">{"State set: " + this.state.stateSet + ' (A)'}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.stateSet}
                            min={1}
                            max={10}
                            onChange={this.handleChange}
                            id="stateSet"/>
                    </div>
                    <div className="col-4">
                        <label htmlFor="inputSignals">{"Input signals: " + this.state.inputSignals + ' (Z)'}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.inputSignals}
                            min={1}
                            max={10}
                            onChange={this.handleChange}
                            id="inputSignals"/>
                    </div>
                    <div className="col-4">
                        <label htmlFor="outputSignals">{"Output signals: " + this.state.outputSignals + ' (W)'}</label>
                        <input
                            type="range"
                            className="custom-range"
                            value={this.state.outputSignals}
                            min={1}
                            max={10}
                            onChange={this.handleChange}
                            id="outputSignals"/>
                    </div>
                    <div className="col-12 mt-5">
                        <ReactTable
                            data={this.state.data}
                            columns={this.state.columns}
                            pageSize={this.state.data.length}
                            showPagination={false}
                            className="-highlight"/>
                    </div>
                    <div className="col-12 mt-3">
                        <Button color="primary" size="sm" onClick={() => this.showTriangleTable()}>
                            Build
                        </Button>
                    </div>
                    <div className="col-12 mt-3">
                        <Table bordered hover size="sm">
                            <tbody>
                                {this.state.showTriangle && this
                                    .state
                                    .tableCells
                                    .map((list) => list)}
                            </tbody>
                        </Table>
                    </div>
                    {this.state.showTriangle && <div className="col-4 mt-3">
                        <ListGroup>
                            {this
                                .equivalentSystem()
                                .map((state, index) => <ListGroupItem key={index} color="info" className="text-left">{"A" + (index + 1) + " = {" + state + "} = b" + (index + 1)}</ListGroupItem>)}
                        </ListGroup>
                    </div>}
                    {this.state.showTriangle && <div className="col-8 mt-3">
                        <Table bordered hover size="sm">
                            <tbody>
                                {this.minimizedTable()}
                            </tbody>
                        </Table>
                    </div>}
                </div>
            </div>
        );
    }
}

export default Mealy;