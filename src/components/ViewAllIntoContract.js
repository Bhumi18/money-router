import React from "react";

function ViewAllIntoContract() {
  return (
    <div className="db-sub">
      <h1>All streams</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, rerum.
      </p>
      <div className="subscriber-add-box view-all">
        {/* <h3>Subscriber Address</h3> */}
        <table>
          <thead>
            <tr>
              <th>To / From</th>
              <th>All Time Flow</th>
              <th>Flow Rate</th>
              <th>Start / End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0xcc920c851327AF767b4bf770e3b2C2ea50B90fde</td>
              <td>0.00005741</td>
              <td>-</td>
              <td>16 Jan. 2023</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
        {/* <h3>Unit</h3> */}
      </div>
    </div>
  );
}

export default ViewAllIntoContract;
