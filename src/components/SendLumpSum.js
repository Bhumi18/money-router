import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

function SendLumpSum() {
  const [indexValue, setIndexValue] = useState("");
  const { address, isConnected } = useAccount();

  const handleChange = (e) => {
    setIndexValue(e.target.value);
  };

  const [loadingAnim, setLoadingAnim] = useState(false);
  const [btnContent, setBtnContent] = useState("Send Token");

  return (
    <div className="db-main">
      <div className="db-sub">
        <h1>Send Token Into Contract</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae,
          rerum.
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
              type="text"
              className="subscriber-input-index"
              placeholder="Subscriber Address"
            />
          </div>
          {/* <h3>Unit</h3> */}

          <div className="subscriber-add-btn">
            {isConnected ? (
              <button className="action-btn">
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
    </div>
  );
}

export default SendLumpSum;
