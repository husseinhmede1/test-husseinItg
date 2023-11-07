import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { validateFormData } from "../services/Utils";
import './style.css';

export const SaveComponent = ({ institutionForEdit, setInstitutionForEdit, setLoader }) => {
    const { REACT_APP_API_ENDPOINT } = process.env;
    const user = useSelector((state) => state.userSlice.user);

    // Handler for form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstitutionForEdit({ ...institutionForEdit, [name]: value });
    };

    // Handler for HostConfig form input changes
    const handleHostConfigChange = (e) => {
        const { name, value } = e.target;
        setInstitutionForEdit({
            ...institutionForEdit,
            hostConfigurations: {
                ...institutionForEdit.hostConfigurations,
                [name]: value
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //validation here
        if (!validateFormData(institutionForEdit)) {
            return;
        }
        setLoader(true)
        // Sending a POST request to save institution data
        axios
            .post(
                `${REACT_APP_API_ENDPOINT}/v1/config/institutions`,
                institutionForEdit,
                {
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "instId": 1,
                        "branchId": 1
                    },
                }
            )
            .then((response) => {
                alert(response.data);
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                alert(`Error: ${error.message}`);
            });

    };

    return (
        <form className="save-container" onSubmit={handleSubmit}>
            <h2>Save Institution</h2>
            <h5>Basic Information</h5>
            <hr color="#68c6c6" size="2" />
            <div className="inner-container">
                <div className="input-column" >
                    <label>Code:</label>
                    <input
                        type="text"
                        id="instCode"
                        name="instCode"
                        placeholder="Code"
                        defaultValue={institutionForEdit?.instCode}
                        onChange={handleChange}
                    />
                    <label>Country:</label>
                    <input
                        type="number"
                        id="countryId"
                        name="countryId"
                        placeholder="country"
                        defaultValue={institutionForEdit?.countryId}
                        onChange={handleChange}
                    />
                    <label>National ID Length:</label>
                    <input
                        type="number"
                        id="nationalIdLength"
                        name="nationalIdLength"
                        placeholder="National Id Length"
                        defaultValue={institutionForEdit?.nationalIdLength}
                        onChange={handleChange}
                    />
                    <label>Days To Lock User:</label>
                    <input
                        type="number"
                        id="daysToLockUser"
                        name="daysToLockUser"
                        placeholder="Days To Lock User"
                        defaultValue={institutionForEdit?.daysToLockUser}
                        onChange={handleChange}
                    />
                    <label>Default Currency Id:</label>
                    <input
                        type="text"
                        id="defaultCurrencyId"
                        name="defaultCurrencyId"
                        placeholder="Default Currency Id"
                        defaultValue={institutionForEdit?.defaultCurrencyId}
                        onChange={handleChange}
                    />
                    <label>Ecommerce Output Path:</label>
                    <input
                        type="text"
                        id="ecomOutputPath"
                        name="ecomOutputPath"
                        placeholder="Ecommerce Output Path"
                        defaultValue={institutionForEdit?.ecomOutputPath}
                        onChange={handleChange}
                    />
                    <label>Renewal new expirydate:</label>
                    <input
                        type="text"
                        id="adhocRnNewExp"
                        name="adhocRnNewExp"
                        placeholder="Renewal new expirydate"
                        defaultValue={institutionForEdit?.adhocRnNewExp}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-column">
                    <label>Name:</label>
                    <input
                        type="text"
                        id="instName"
                        name="instName"
                        placeholder="Name"
                        defaultValue={institutionForEdit?.instName}
                        onChange={handleChange}
                    />
                    <label>Account Number Length:</label>
                    <input
                        type="number"
                        id="accountNbLength"
                        name="accountNbLength"
                        placeholder="Account Number Length"
                        defaultValue={institutionForEdit?.accountNbLength}
                        onChange={handleChange}
                    />
                    <label>Embossing Output Path:</label>
                    <input
                        type="text"
                        id="embossingOutputPath"
                        name="embossingOutputPath"
                        placeholder="Embossing Output Path"
                        defaultValue={institutionForEdit?.embossingOutputPath}
                        onChange={handleChange}
                    />
                    <label>Session Timeout:</label>
                    <input
                        type="number"
                        id="sessionTimeout"
                        name="sessionTimeout"
                        placeholder="Session Timeout"
                        defaultValue={institutionForEdit?.sessionTimeout}
                        onChange={handleChange}
                    />
                    <label>HSM Ip:</label>
                    <input
                        type="text"
                        id="hsmIp"
                        name="hsmIp"
                        placeholder="HSM Ip"
                        defaultValue={institutionForEdit?.hsmIp}
                        onChange={handleChange}
                    />
                    <label>HSM Encrypted PIN Length:</label>
                    <input
                        type="numbers"
                        id="hsmEncPinLength"
                        name="hsmEncPinLength"
                        placeholder="HSM Encrypted PIN Length"
                        defaultValue={institutionForEdit?.hsmEncPinLength}
                        onChange={handleChange}
                    />
                    <label>Replacement new expirydate:</label>
                    <input
                        type="text"
                        id="adhocRpNewExp"
                        name="adhocRpNewExp"
                        placeholder="Replacement new expirydate"
                        defaultValue={institutionForEdit?.adhocRpNewExp}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-column">
                    <label>Status:</label>
                    <input
                        type="number"
                        id="instStatus"
                        name="instStatus"
                        placeholder="Status"
                        defaultValue={institutionForEdit?.instStatus}
                        onChange={handleChange}
                    />
                    <label>Customer Id Length:</label>
                    <input
                        type="number"
                        id="customerIdLength"
                        name="customerIdLength"
                        placeholder="Customer Id Length"
                        defaultValue={institutionForEdit?.customerIdLength}
                        onChange={handleChange}
                    />
                    <label>HSM Port:</label>
                    <input
                        type="text"
                        id="hsmPort"
                        name="hsmPort"
                        placeholder="HSM Port"
                        defaultValue={institutionForEdit?.hsmPort}
                        onChange={handleChange}
                    />
                    <label>HSM Message Header Length:</label>
                    <input
                        type="number"
                        id="hsmMsgHeaderLength"
                        name="hsmMsgHeaderLength"
                        placeholder="HSM Message Header Length"
                        defaultValue={institutionForEdit?.hsmMsgHeaderLength}
                        onChange={handleChange}
                    />
                    <label>HSM Encrypted PIN Length:</label>
                    <input
                        type="text"
                        id="hsmEncPinLength"
                        name="hsmEncPinLength"
                        placeholder="HSM Encrypted PIN Length"
                        defaultValue={institutionForEdit?.hsmEncPinLength}
                        onChange={handleChange}
                    />
                    <label>Renewal Output Path:</label>
                    <input
                        type="text"
                        id="renewalOutputPath"
                        name="renewalOutputPath"
                        placeholder="Renewal Output Path"
                        defaultValue={institutionForEdit?.renewalOutputPath}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <h5>Host Information</h5>
            <hr color="#68c6c6" size="2" />
            <div className="inner-container">
                <div className="input-column">
                    <label>Host Integration:</label>
                    <input
                        type="text"
                        id="hostIntegration"
                        name="hostIntegration"
                        placeholder="Host Integration"
                        defaultValue={institutionForEdit?.hostIntegration}
                        onChange={handleChange}
                    />
                    <label>Host Name:</label>
                    <input
                        type="text"
                        id="hostName"
                        name="hostName"
                        placeholder="Host Name"
                        defaultValue={institutionForEdit?.hostConfiguration?.hostName}
                        onChange={handleHostConfigChange}
                    />
                    <label>Request Body:</label>
                    <input
                        type="text"
                        id="requestBody"
                        name="requestBody"
                        placeholder="Request Body"
                        defaultValue={institutionForEdit?.hostConfiguration?.requestBody}
                        onChange={handleHostConfigChange}
                    />
                </div>
                <div className="input-column">
                    <label>Response Body Mapping:</label>
                    <input
                        type="text"
                        id="responseBody"
                        name="responseBody"
                        placeholder="Response Body Mapping"
                        defaultValue={institutionForEdit?.hostConfiguration?.responseBody}
                        onChange={handleHostConfigChange}
                    />
                    <label>Host Url:</label>
                    <input
                        type="text"
                        id="hostUrl"
                        name="hostUrl"
                        placeholder="Host Url"
                        defaultValue={institutionForEdit?.hostConfiguration?.hostUrl}
                        onChange={handleHostConfigChange}
                    />
                </div>
            </div>
            <h5>Password Policy Details</h5>
            <hr color="#68c6c6" size="2" />
            <div className="inner-container">
                <div className="input-column">
                    <label>Days To Change Password:</label>
                    <input
                        type="number"
                        id="daysToChangePassword"
                        name="daysToChangePassword"
                        placeholder="Days To Change Password"
                        defaultValue={institutionForEdit?.daysToChangePassword}
                        onChange={handleChange}
                    />
                    <label>Warning Change Password:</label>
                    <input
                        type="number"
                        id="warningChangePassword"
                        name="warningChangePassword"
                        placeholder="Warning Change Password"
                        defaultValue={institutionForEdit?.warningChangePassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-column">
                    <label>Passport Nb Length:</label>
                    <input
                        type="number"
                        id="passportNbLength"
                        name="passportNbLength"
                        placeholder="Passport Nb Length"
                        defaultValue={institutionForEdit?.passportNbLength}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button type="submit">Save</button>

        </form>
    );
};
