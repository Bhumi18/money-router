import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import MoneyRouterABI from "../artifacts/MoneyRouter.json";
const moneyRouterAddress = "0x3b05Df0482457891d48406736516679EE7B3a88c";

function SendTokenLS() {
  const [indexValue, setIndexValue] = useState("");
  const { address, isConnected } = useAccount();

  const handleChange = (e) => {
    setIndexValue(e.target.value);
  };

  const [loadingAnim, setLoadingAnim] = useState(false);
  const [btnContent, setBtnContent] = useState("Send Token");

  const sendLumpsum = async () => {
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

        const allowence = await daix.allowance({
          owner: "0x217155AF8592b6b8fc6AdE9Dd9304197d8a11d12",
          spender: "0x3b05Df0482457891d48406736516679EE7B3a88c",
          providerOrSigner: signer,
        });
        const amount = document.getElementById("amount").value;
        const convertedAmount = amount * 10 ** 18;
        console.log(allowence);
        if (convertedAmount > allowence) {
          const amountToApprove = convertedAmount - allowence;
          const moneyRouterApproval = daix.approve({
            receiver: moneyRouterAddress,
            amount: ethers.utils.parseEther(String(amountToApprove)),
          });
          await moneyRouterApproval.exec(signer).then(function (tx) {
            console.log(`
                  Congrats! You've just successfully approved the money router contract. 
                  Tx Hash: ${tx.hash}
              `);
          });
        } else {
          const moneyRouter = new ethers.Contract(
            moneyRouterAddress,
            MoneyRouterABI,
            signer
          );
          //call money router send lump sum method from signers[0]
          await moneyRouter
            .connect(signer)
            .sendLumpSumToContract(
              daix.address,
              ethers.utils.parseEther(String(amount))
            )
            .then(function (tx) {
              console.log(`
                Congrats! You just successfully sent funds to the money router contract. 
                Tx Hash: ${tx.hash}
            `);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="db-sub">
      <h1>Send Token Into Contract</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, rerum.
      </p>
      <div className="subscriber-add-box">
        <FormControl required fullWidth>
          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
          <Select
            displayEmpty
            id="demo-simple-select"
            value={indexValue}
            onChange={handleChange}
            sx={{
              margin: "10px 0px",
              color: "rgba(18, 20, 30, 0.87)",
              fontSize: "1rem",
              padding: "0px 5px",
              ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                {
                  minHeight: "auto",
                },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(224, 224, 224)",
                boxShadow: "rgba(204, 204, 204, 0.25) 0px 0px 6px 3px",
                borderRadius: "15px",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(224, 224, 224)",
                boxShadow: "rgba(204, 204, 204, 0.25) 0px 0px 6px 3px",
                borderRadius: "15px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(224, 224, 224)",
                boxShadow: "rgba(204, 204, 204, 0.25) 0px 0px 6px 3px",
                borderRadius: "15px",
              },
              ".MuiSvgIcon-root ": {
                fill: "black",
              },
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <h4 className="index-placeholder">Select Token</h4>
            </MenuItem>
            <MenuItem value={"fDAIx"}>fDAIx</MenuItem>
          </Select>
        </FormControl>
        {/* <h3>Subscriber Address</h3> */}
        <div className="subscriber-input-div">
          <input
            id="amount"
            type="number"
            className="subscriber-input-index"
            placeholder="Amount"
          />
        </div>
        {/* <h3>Unit</h3> */}

        <div className="subscriber-add-btn">
          {isConnected ? (
            <button className="action-btn" onClick={() => sendLumpsum()}>
              {loadingAnim ? <span className="loader"></span> : btnContent}
            </button>
          ) : (
            <div className="connect-wallet ">
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SendTokenLS;
