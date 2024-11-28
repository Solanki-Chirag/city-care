import React, { useEffect, useState } from 'react';
import '../Analysis.css'; // Import the CSS file for styling

const Analysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3500/Analysis'); // Adjust URL as needed
        const result = await response.json();
        if (result.success) {
          setData(result);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="analysis-container">
      
      <div className="grid-container">
        {/* First row: Total Complaints */}
        <div className="card">
          <h2>Total Complaints</h2>
          <p>{data.receivedComplaints}</p>
        </div>
        <div className="card">
          <h2>Rejected Complaints</h2>
          <p>{data.Rejected}</p>
        </div>
        
        <div className='box'></div>
        {/* Second row: Road and Street Light Departments */}
        <div className="card">
          <h2>Road Department</h2>
          <p>Accepted: {data.RoadAccepted}</p>
          <p>Resolved: {data.RoadResolved}</p>
        </div>
        <div className="card">
          <h2>Street Light Department</h2>
          <p>Accepted: {data.StreetAccepted}</p>
          <p>Resolved: {data.StreetResolved}</p>
        </div>

        <div className="grid-placeholder"></div>
        {/* Third row: Sewage and Waste Management Departments */}
        <div className="card">
          <h2>Sewage Department</h2>
          <p>Accepted: {data.SewageAccepted}</p>
          <p>Resolved: {data.SewageResolved}</p>
        </div>
        <div className="card">
          <h2>Waste Management Department</h2>
          <p>Accepted: {data.WasteAccepted}</p>
          <p>Resolved: {data.WasteResolved}</p>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
