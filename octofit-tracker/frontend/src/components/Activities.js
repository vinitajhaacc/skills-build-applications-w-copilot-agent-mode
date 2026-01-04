
import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities data:', results);
      });
  }, [endpoint]);

  const renderTable = () => {
    if (!data.length) return <tr><td colSpan="100%">No activities found.</td></tr>;
    const columns = Object.keys(data[0] || {});
    return (
      <>
        <thead className="table-light">
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id || idx}>
              {columns.map(col => <td key={col}>{String(item[col])}</td>)}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            {renderTable()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activities;
