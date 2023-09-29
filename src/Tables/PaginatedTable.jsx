
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function PaginatedTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, sortColumn, sortOrder, searchQuery]);

  const fetchData = () => {
    setLoading(true);

    axios
      .get(
        `http://192.168.10.163:10000/listPage?page=${currentPage - 1}&size=${itemsPerPage}&search=${searchQuery.trim()}`
      )
      .then((response) => {
        setData(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching KYC data:', error);
        setLoading(false);
      });
  };

  const handlePageChange = (page) => {
    if (page >= 1) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleSortChange = (column) => {
    if (column === sortColumn) {
      // Toggle sorting order if clicking on the same column
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the new column for sorting
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedData = () => {
    if (sortColumn) {
      return [...data].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortColumn] < b[sortColumn] ? -1 : 1;
        } else {
          return a[sortColumn] > b[sortColumn] ? -1 : 1;
        }
      });
    }
    return data;
  };

  const navigate = useNavigate();

  const handleEditClick = (email) => {
    navigate(`/app/Kycform3/${email}`); // Assuming "Kycform3" is your update page URL
  };


  const showTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (data.length === 0) {
      return <p>No data available</p>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>
              ID
              <button onClick={() => handleSortChange('kycid')}>
                Sort {sortColumn === 'kycid' ? sortOrder : ''}
              </button>
            </th>
            <th>
              First Name
              <button onClick={() => handleSortChange('firstName')}>
                Sort {sortColumn === 'firstName' ? sortOrder : ''}
              </button>
            </th>
            <th>
              Last Name
              <button onClick={() => handleSortChange('lastName')}>
                Sort {sortColumn === 'lastName' ? sortOrder : ''}
              </button>
            </th>
            <th>
              Edit
            </th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {sortedData().map((item, index) => (
            <tr key={index}>
              <td>{item.kycid}</td>
              <td>{item.firstName} {item.lastName}</td>
              {/* Render additional fields here */}
              <td>
                <button onClick={() => handleEditClick(item.email)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={() => handleItemsPerPageChange(10)}>Show 10 rows</button>
        <button onClick={() => handleItemsPerPageChange(20)}>Show 20 rows</button>
        <button onClick={() => handleItemsPerPageChange(30)}>Show 30 rows</button>
      </div>
      {showTable()}
      <div>
        {/* Pagination controls */}
        <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default PaginatedTable;
