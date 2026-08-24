import React from "react";

/**
 * Usage:
 * <Table
 *   columns={[{ key: "name", label: "Name" }, { key: "email", label: "Email" }]}
 *   data={[{ name: "Sweta", email: "a@b.com" }]}
 * />
 */
const Table = ({ columns, data, onRowClick }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={styles.th}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={styles.empty}>
              No data available
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr
              key={row._id || i}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col) => (
                <td key={col.key} style={styles.td}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

const styles = {
  table: { width: "100%", borderCollapse: "collapse", background: "#fff" },
  th: {
    textAlign: "left",
    padding: "10px 12px",
    background: "#1a1a2e",
    color: "#fff",
    fontSize: 13,
  },
  td: { padding: "10px 12px", borderBottom: "1px solid #eee", fontSize: 14 },
  empty: { textAlign: "center", padding: 20, color: "#888" },
};

export default Table;
