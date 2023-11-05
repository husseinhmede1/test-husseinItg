import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import './style.css';

export const SearchComponent = ({ institutions, setInstitutions, searchTerm, setSearchTerm }) => {
    const { REACT_APP_API_ENDPOINT } = process.env;
    const user = useSelector((state) => state.userSlice.user);

    // useEffect to fetch active institutions
    useEffect(() => {
        axios
            .get(
                `${REACT_APP_API_ENDPOINT}/v1/config/institutions/active`,
                {
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "instId": 1,
                        "branchId": 1
                    },
                }
            )
            .then((response) => {
                setInstitutions(response.data);
            })
            .catch((err) => {
                alert(err);
            });

    }, []);

    // Filter institutions based on search term
    const filteredInstitutions = institutions.filter(
        institution =>
            institution.instName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-container">
            <h1>Institutions</h1>

            {/* Input field for searching institutions */}
            <input
                type="text"
                list="institution-list"
                placeholder="&#128269; Search for an institution"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Datalist for displaying matching institution options */}
            <datalist id="institution-list">
                {filteredInstitutions.map(institution => (
                    <option key={institution.instId} value={institution.instId}>
                        {institution.instName}
                    </option>
                ))}
            </datalist>
        </div>
    );
};
