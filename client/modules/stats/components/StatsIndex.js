/**
 * Created by root on 16-9-12.
 */
import React, {Component} from "react";
// import Loader from '../../widgets/common/Loader'

export default class StatsIndex extends Component {
    static childContextTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (

            <div className="body row">
                <div className="body col-xs-12 col-md-8 offset-md-2">
                    <div className="card block">
                        <div className="card-row">
                            <h2 className="text color-blue">
                                <i className="fa fa-sitemap"></i> All Projects
                            </h2>
                            <h5 className="text">The list of projects have been scanned, you can create a new task to
                                check all its
                                dependencies.</h5>
                        </div>
                        <div className="card-body">
                            <div>
                                <button className="button blue">
                                    <i className="fa fa-plus-square"></i> Create
                                </button>
                                <button className="button"><i className="fa fa-cog"></i> Settings</button>
                            </div>

                            <div style={{marginTop: '1rem'}} className="row" align="left">

                                <div className="card block">
                                    <div className="card-header bg-color-red">
                                        <div className="row">
                                            <div className="col-xs-8 pull-left"
                                                 style={{paddingTop: 0, paddingBottom: 0}}>
                                                <div className="text color-white">
                                                    <i className="fa fa-star"></i> SDM
                                                </div>
                                            </div>
                                            <div className="col-xs-4 pull-right text color-white"
                                                 style={{paddingTop: 0, paddingBottom: 0}}>
                                                <i className="fa fa-plus-square"></i>
                                                <i className="fa fa-repeat" aria-hidden="true"></i>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-row ">
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


//todo: immutable 如何创建state对象，是整个对象设置成immutable对象，还是依据参数一个个设置
//todo: immutable对象如何进行propTypes校验
//todo:redux   dispatch multiple action
//todo: router 异步加载及打包，hash history