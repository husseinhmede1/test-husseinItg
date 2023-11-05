import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userSlice.js";
import { SearchComponent } from "../../components/SearchComponent.js";
import { SaveComponent } from '../../components/SaveComponent.js';
import { GridComponent } from '../../components/GridComponent.js';
import LoaderComponent from '../../components/LoaderComponent.js';
import "./institutionPage.css";

export default function InstitutionPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const user = useSelector((state) => state.userSlice.user);
    const [institutions, setInstitutions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Using state to manage institution data for editing
    const [institutionForEdit, setInstitutionForEdit] = useState({
        accountNbLength: 0,
        adhocRnNewExp: '',
        adhocRpNewExp: '',
        customerIdLength: 0,
        daysToChangePassword: 0,
        daysToLockUser: 0,
        countryId: 0,
        defaultCurrencyId: '',
        ecomOutputPath: '',
        embossingOutputPath: '',
        encryptionKey: '',
        hostConfigurations: {
            hostId: 0,
            hostName: '',
            hostType: '',
            hostUrl: '',
            requestBody: '',
            responseBody: ''
        },
        hostIntegration: '',
        hsmEncPinLength: 0,
        hsmIp: '',
        hsmMsgHeaderLength: 0,
        hsmPort: '',
        instCode: '',
        instId: 0,
        instName: '',
        instStatus: '',
        nationalIdLength: 0,
        passportNbLength: '',
        renewalOutputPath: '',
        sessionTimeout: '',
        warningChangePassword: ''
    });

    // useEffect hook to redirect to login page if user is not logged in
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user])

    // Function to handle user logout
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }
    return (
        <>
            {/* Loader component that displays a loading indicator */}
            <LoaderComponent loader={loader} />
            <div className="logout-container">
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>

            {/* SearchComponent for filtering institutions */}
            <SearchComponent institutions={institutions}
                setInstitutions={setInstitutions}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} />
            <div className='inner-institution-container'>
                
                {/* GridComponent for displaying institution data */}
                <GridComponent
                    searchTerm={searchTerm}
                    institutionForEdit={institutionForEdit}
                    setInstitutionForEdit={setInstitutionForEdit}
                    loader={loader}
                    setLoader={setLoader}
                />

                {/* SaveComponent for editing and saving institution data */}
                <SaveComponent institutionForEdit={institutionForEdit}
                    setInstitutionForEdit={setInstitutionForEdit}
                    setLoader={setLoader}
                />
            </div>
        </>
    );
}