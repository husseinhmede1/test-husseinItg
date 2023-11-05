import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { saveAs } from 'file-saver';
import axios from "axios";
import SliderComponent from "./SliderComponent";
import './style.css';

export const GridComponent = ({ searchTerm, setInstitutionForEdit, loader, setLoader }) => {
    const { REACT_APP_API_ENDPOINT } = process.env;
    const [selectedOption, setSelectedOption] = useState(0);
    const [institutionsList, setInstitutionsList] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const user = useSelector((state) => state.userSlice.user);
    const itemsPerPage = 5;

    //Fetch institutions data based on search term
    useEffect(() => {
        // If search term is empty, fetch all institutions
        if (searchTerm === "") {
            axios
                .get(
                    `${REACT_APP_API_ENDPOINT}/v1/config/institutions`,
                    {
                        headers: {
                            "Authorization": `Bearer ${user.token}`,
                            "instId": 1,
                            "branchId": 1
                        },
                    }
                )
                .then((response) => {
                    setInstitutionsList(response.data);
                })
                .catch((err) => {
                    alert(err);
                });
        }
        else {
            // If search term is not empty, perform search
            if (searchTerm != "") {
                const delayDebounceFn = setTimeout(() => {
                    axios
                        .get(
                            `${REACT_APP_API_ENDPOINT}/v1/config/institutions/${searchTerm}`,
                            {
                                headers: {
                                    "Authorization": `Bearer ${user.token}`,
                                    "instId": 1,
                                    "branchId": 1
                                },
                            }
                        )
                        .then((response) => {
                            setInstitutionsList([response.data]);
                        })
                        .catch((err) => {
                            alert("Instition Not Found!");
                        });
                }, 1000);
                return () => clearTimeout(delayDebounceFn);

            }
        }
    }, [loader, searchTerm]);

    //Handle sorting
    const handleSort = (field) => {
        setSortField(field);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    //Sort data
    const sortedData = institutionsList.slice().sort((a, b) => {
        if (sortField) {
            const aValue = a[sortField];
            const bValue = b[sortField];
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    //Paginate data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInstitutions = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //Handle printing
    const handlePrint = () => {
        const tableHtml = `
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Code</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              ${institutionsList.map(institution => `
                <tr>
                    <td>${institution.instId}</td>
                    <td>${institution.instCode}</td>
                    <td>${institution.instName}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;

        // Creating a Blob and triggering download
        const blob = new Blob([tableHtml], { type: 'text/html' });
        saveAs(blob, 'table.html');
    };

    //Handle clicking on an institution
    const handleClicking = (institution) => {
        if (selectedOption === 0) {
            setInstitutionForEdit(institution)
        }
    }

    //Handle changing status after click enter
    const handleChangeStatus = (e, id) => {
        if (e.key === 'Enter') {
            setLoader(true)
            axios
                .post(
                    `${REACT_APP_API_ENDPOINT}/v1/config/institutions/status-change`,
                    {
                        id: id,
                        status: e.target.value,
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${user.token}`,
                            "instId": 1,
                            "branchId": 1
                        },
                    }
                )
                .then((response) => {
                    setLoader(false)
                })
                .catch((error) => {
                    setLoader(false)
                    alert(`Error: ${error.message}`);
                });


        }
    }

    //Handle delete based on instition clicked
    const handleDelete = (id) => {
        setLoader(true)
        axios.delete(`${REACT_APP_API_ENDPOINT}/v1/config/institutions/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "instId": 1,
                    "branchId": 1
                },
            })
            .then((response) => {
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                alert(`Error: ${error.message}`);
            });
    }

    return (
        <div className="save-container">

            <div className="head-container">

                <h2>Institutions List</h2>
                <button type="submit" className="print-button" onClick={handlePrint}>Print</button>
            </div>
            <SliderComponent selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <div className="table-container">

                {/* pagination */}
                <div className="pagination">
                    {currentPage > 1 && (
                        <button onClick={() => { paginate(currentPage - 1); }}>
                            ‹
                        </button>
                    )}

                    {Array.from({ length: Math.ceil(sortedData.length / itemsPerPage) }).map((_, index) => {
                        if (currentPage <= index + 3 && currentPage > index - 3) {
                            return (
                                <button
                                    key={index}
                                    onClick={() => { paginate(index + 1); }}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            );
                        }
                    })}

                    {currentPage < Math.ceil(sortedData.length / itemsPerPage) && (
                        <button onClick={() => { paginate(currentPage + 1); }}>
                            ›
                        </button>
                    )}
                </div>

                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('instCode')}>Code &uarr;&darr;</th>
                            <th onClick={() => handleSort('instName')}>Name &uarr;&darr;</th>
                            {selectedOption === 1 &&
                                <th style={{ color: '#b33c3c' }}>
                                    Delete
                                </th>
                            }
                            {selectedOption === 2 &&
                                <th>
                                    Change Status
                                </th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {currentInstitutions.map((institution, index) => (
                            <tr key={index} onClick={() => { handleClicking(institution) }}>
                                <td>{institution.instCode}</td>
                                <td>{institution.instName}</td>
                                {selectedOption === 1 &&
                                    <td
                                        onClick={() => { handleDelete(institution.instId) }}
                                        style={{ backgroundColor: '#b33c3c' }}>
                                        &#10006;
                                    </td>
                                }
                                {selectedOption === 2 &&
                                    <td>
                                        <input onKeyPress={(e) => { handleChangeStatus(e, institution.instId) }} />
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
