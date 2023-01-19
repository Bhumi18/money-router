import React from "react";
import { useAccount, useNetwork } from "wagmi";
import { createClient } from "urql";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { useEffect, useState } from "react";

function ViewAllIntoContract() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getData = async () => {
    const API =
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli";

    const data_ = `
    query {
      flowUpdatedEvents(
        where: {receiver: "0x3b05df0482457891d48406736516679ee7b3a88c", sender: "${address}"}
        orderBy: timestamp
      ) {
        timestamp
        flowRate
      }
    }
  `;
    const c = createClient({
      url: API,
    });
    const result1 = await c.query(data_).toPromise();
    const finalData = (result1.data.flowUpdatedEvents)
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const sf = await Framework.create({
          chainId: 5,
          provider: provider,
        });
        const daix = await sf.loadSuperToken("fDAIx");
        const response = await daix.getFlow({
          sender: address,
          receiver: "0x3b05Df0482457891d48406736516679EE7B3a88c",
          providerOrSigner: signer
        });
        let active
        if (response.deposit === '0' && response.owedDeposit === '0' && response.flowRate === '0') {
          active = "Not Active"
        }
        else {
          active = "Active"
        }
        // loop over query response
        for (let i = 0; i < finalData.length; i++) {
          const converted = new Date(parseInt(finalData[i].timestamp) * 1000);
          const date =
            String(converted.getDate()) +
            "/" +
            String(converted.getMonth()+1) +
            "/" +
            String(converted.getFullYear());
          if (!data.find((item) => finalData[i].timestamp === item[1])) {
            if (i === 0) {
              data.push([finalData[i].flowRate, date, active])
            } else {
              data.push([finalData[i].flowRate, date, "Not Active"])
            }
          }

        }
        setData(data)
        setLoading(true)
      }
    } catch (error) {
      console.log(error);
    }


  }
  useEffect(() => {
    getData();
  });
  if (loading) {
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
              {data.length > 0
                ?
                data.map((item, key) => {
                  return (
                    <tr>
                      <td>{address}</td>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                    </tr>
                  )

                })

                : null}
            </tbody>
          </table>
          {/* <h3>Unit</h3> */}
        </div>
      </div>
    );
  } else {
    return "loading"
  }
}
export default ViewAllIntoContract;
