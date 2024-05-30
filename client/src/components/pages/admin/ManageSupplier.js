import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import axios from 'axios'; // Import Axios

// Create new GridExample component
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ]);

  const defaultColDef = {
    flex: 1,
  }

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://api.example.com/cars') // Replace with your API endpoint
      .then(response => {
        setRowData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"ag-theme-quartz"} style={{ width: '100%', height: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
    </div>
  );
}

// Render GridExample
const root = createRoot(document.getElementById("root"));
root.render(<GridExample />);
