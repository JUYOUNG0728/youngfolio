import { useEffect, useState, type ReactNode } from "react";

export function Guide({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 28, maxWidth: 1080 }}>{children}</div>
  );
}

export function GuideTitle({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <header style={{ display: "grid", gap: 8 }}>
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.22em] text-gray-30">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="h5">{children}</h2>
    </header>
  );
}

export function GuideText({ children }: { children: ReactNode }) {
  return (
    <p className="body4 text-gray-20" style={{ maxWidth: 760 }}>
      {children}
    </p>
  );
}

export function Cluster({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-5">{children}</div>;
}

export function TokenValue({ name }: { name: string }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
        "undefined",
    );
  }, [name]);

  return <code className="body6 text-gray-30">{value}</code>;
}

export function SpecTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="body6 text-gray-30"
                style={{
                  padding: "10px 12px",
                  borderBottom: "1px solid var(--gray-50)",
                  fontWeight: 500,
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${index}`}
                  className="body6"
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid var(--gray-50)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
