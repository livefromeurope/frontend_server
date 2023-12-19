import React, { useState, useEffect } from 'react';
import fetchImfData from './fetch_imf_data';
import Graph from './Graph';

const GraphWidget = ({ initialCountry = 'EU' }) => {
  const [topicsData, setTopicsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define your topics

    const topics = { 
      "NGDPD": "GDP, current prices", 
      "LP": "Population",
      "PCPIPCH":"Inflation Rate", 
      "LUR":"Unemployment rate", 
      "GGXWDG_NGDP":"General government gross dept"
    };


  useEffect(() => {
    if (!initialCountry) {
      // If initialCountry is not set, do not fetch data
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const fetchedData = {};
        for (const topicKey of Object.keys(topics)) {
          const data = await fetchImfData(topicKey, initialCountry);
          fetchedData[topicKey] = data;
        }
        setTopicsData(fetchedData);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initialCountry]); // Dependency on initialCountry

  if (!initialCountry) return <p>Please select a country to display data.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!Object.keys(topicsData).length) return <p>No data available</p>;

  return (
    <div className="graph-widget">
      {Object.entries(topicsData).map(([topicKey, topicData]) => (
        <Graph key={topicKey} data={topicData.values[topicKey][initialCountry]} topic={topics[topicKey]} />
      ))}
    </div>
  );
};

export default GraphWidget;
