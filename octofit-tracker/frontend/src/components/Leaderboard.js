
import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard data:', results);
      });
  }, [endpoint]);

  const renderTable = () => {
    if (!data.length) return <tr><td colSpan="100%">No leaderboard data found.</td></tr>;
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
        <h2 className="card-title mb-4">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            {renderTable()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
