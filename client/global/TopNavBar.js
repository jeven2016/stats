/**
 * Created by zjtech on 16-7-29.
 */
import React, {Component} from "react";

export default class TopNavBar extends Component {
    render() {
        return (<ul className="primary navbar fixed top bg-color-red">
            <li className="title">
                <a className="link"> <i className="fa fa-life-ring"></i> &nbsp;License Checker Tool</a>
            </li>
        </ul>);
    }

}