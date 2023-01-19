import React from "react";

function ViewAllFromContract() {
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
              <th>From</th>
              <th>Flow Rate</th>
              <th>Start / End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>address</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
        {/* <h3>Unit</h3> */}
      </div>
    </div>
  );
}

export default ViewAllFromContract;
