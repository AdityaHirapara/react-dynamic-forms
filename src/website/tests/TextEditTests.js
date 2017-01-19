/**
 *  Copyright (c) 2017, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Markdown from "react-markdown";
import { Test1 } from "../../components_test/TextEditExamples";

export default React.createClass({
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h3>TextEdit Tests</h3>
            <Test1 />
          </div>
        </div>
      </div>
    );
  }
})

