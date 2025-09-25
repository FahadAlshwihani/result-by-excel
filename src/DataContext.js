import React, { createContext, useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExcel() {
      try {
        const res = await fetch('/data.xlsx');
        const arrayBuffer = await res.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        // Normalize keys: make sure we have id, name, result fields (case-insensitive)
        const normalized = json.map((r) => {
          const keys = Object.keys(r);
          const obj = {};
          keys.forEach(k => {
            const lk = k.trim().toLowerCase();
            if (lk === 'id') obj.id = String(r[k]).trim();
            else if (lk === 'name' || lk === 'الاسم') obj.name = String(r[k]).trim();
            else if (lk === 'result' || lk === 'score' || lk === 'النتيجة') obj.result = String(r[k]).trim();
            else obj[k] = r[k];
          });
          // fallback if headers were exactly 'ID','Name','Result' already handled; ensure id exists
          if (!obj.id && r.ID) obj.id = String(r.ID).trim();
          return obj;
        });

        setRows(normalized);
      } catch (err) {
        console.error('Error loading excel', err);
      } finally {
        setLoading(false);
      }
    }

    loadExcel();
  }, []);

  return (
    <DataContext.Provider value={{ rows, loading }}>
      {children}
    </DataContext.Provider>
  );
}

