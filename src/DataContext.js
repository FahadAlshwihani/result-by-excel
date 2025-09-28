import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGoogleSheet() {
      try {
        const sheetURL =
          "https://docs.google.com/spreadsheets/d/1KBdPDI4BvCFw1gWW4_4c2uX4c7ax8SMQgQ5rBzlcjdA/gviz/tq?tqx=out:json";

        const res = await fetch(sheetURL);
        const text = await res.text();

        // قص JSON من النص
        const json = JSON.parse(text.substr(47).slice(0, -2));

        // تحويل الصفوف لكائنات
        const data = json.table.rows.map(row => ({
          id: row.c[0]?.v || "",     // العمود الأول = ID
          name: row.c[1]?.v || "",   // العمود الثاني = Name
          result: row.c[2]?.v || "", // العمود الثالث = 0
          // العمود الرابع (80) متجاهلينه
        }));

        setRows(data);
      } catch (err) {
        console.error("Error loading Google Sheet", err);
      } finally {
        setLoading(false);
      }
    }

    loadGoogleSheet();
  }, []);

  return (
    <DataContext.Provider value={{ rows, loading }}>
      {children}
    </DataContext.Provider>
  );
}
