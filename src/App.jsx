import { useState, useEffect } from "react";
import { bitable } from "@base-open/connector-api";
import "./App.css";
import { API_URL } from "../config.js";

export default function App() {
  const [value, setValue] = useState();
  const [userId, setUserId] = useState();
  const [tenantKey, setTenantKey] = useState();

  useEffect(() => {
    bitable.getConfig().then((config) => {
      setValue(config?.value || "");
    });
    bitable.getUserId().then((id) => {
      setUserId(id);
    });
    bitable.getTenantKey().then((key) => {
      setTenantKey(key);
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = {
      app_token: event.target.APP_TOKEN.value,
      personal_base_token: event.target.PERSONAL_BASE_TOKEN.value,
      table_id: event.target.TABLE_ID.value,
      access_token: event.target.access_token.value,
      list_account: event.target.list_account.value,
      since: event.target.since.value,
      until: event.target.until.value,
      level_ads: event.target.level_ads.value,
      user_id: userId,
      tenant_key: tenantKey,
    };
    console.log(formData);
    // try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Đúng header JSON
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.status === "error") {
      setErrorMessage(result.message);
    } else if (result.status === "success") {
      setSuccessMessage("Success! Operation completed.");
    }
    // } catch (error) {
    //   setErrorMessage("An unexpected error occurred.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="form-header">
          <h1>Facebook Ads Sync Data</h1>
          <img
            src="https://substackcdn.com/image/fetch/w_96,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc15a399-a7af-4af8-8438-86d7579d298b_400x400.png"
            alt="Logo"
            className="form-logo"
          />
        </div>

        <label htmlFor="APP_TOKEN">APP TOKEN:</label>
        <input type="text" id="APP_TOKEN" name="APP_TOKEN" required />

        <label htmlFor="PERSONAL_BASE_TOKEN">
          PERSONAL BASE TOKEN:{" "}
          <span>
            <a
              href="https://transform.larksuite.com/docx/YhHld2ZknosMHuxjtW9ujzaWsTg?from=from_copylink"
              target="_blank"
            >
              guide
            </a>
          </span>
        </label>
        <input
          type="text"
          id="PERSONAL_BASE_TOKEN"
          name="PERSONAL_BASE_TOKEN"
          required
        />

        <label htmlFor="TABLE_ID">TABLE ID:</label>
        <input type="text" id="TABLE_ID" name="TABLE_ID" required />

        <label htmlFor="access_token">
          ACCESS TOKEN FACEBOOK:{" "}
          <span>
            <a
              href="https://transform.larksuite.com/docx/VxLUd4rh6onDb4xbu9IuFxbSs4e"
              target="_blank"
            >
              guide
            </a>
          </span>
        </label>
        <input type="text" id="access_token" name="access_token" required />

        <label htmlFor="list_account">ACCOUNT ID ADS:</label>
        <input type="text" id="list_account" name="list_account" required />

        <label htmlFor="level_ads">LEVELS:</label>
        <select id="level_ads" name="level_ads" required>
          <option value="campaign">Campaign</option>
          <option value="adset">Ads Group</option>
          <option value="ad">Ad</option>
        </select>

        {/* New datetime fields */}
        <label htmlFor="date">
          GET DATA IN RANGE (Do not get more than 2 months)
        </label>
        <div className="date-range">
          <div>
            <label htmlFor="since">Since:</label>
            <input type="date" id="since" name="since" required />
          </div>
          <div>
            <label htmlFor="until">Until:</label>
            <input type="date" id="until" name="until" required />
          </div>
        </div>

        <div style={{ display: "block", textAlign: "center" }}>
          <input type="submit" value="Submit" />
        </div>

        {/* Error and Loading Messages */}
        {errorMessage && (
          <div style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</div>
        )}
        {loading && <div>Processing, please wait...</div>}
        {successMessage && (
          <div style={{ color: "green", fontWeight: "bold" }}>
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );

  // return (
  //   <div>
  //     <div>userId: {userId}</div>
  //     <div>tenantKey: {tenantKey}</div>
  //     <input
  //       value={value}
  //       onChange={(e) => {
  //         setValue(e.target.value);
  //       }}
  //     />
  //     {/* <button
  //       onClick={() => {
  //         makeSignedRequest(); // Gọi hàm gửi request có chữ ký khi nhấn nút
  //       }}
  //     >
  //       Send Request with Signature
  //     </button> */}
  //     <button
  //       onClick={() => {
  //         bitable.saveConfigAndGoNext({ value });
  //       }}
  //     >
  //       Next
  //     </button>
  //   </div>
  // );
}
