const Table = ({ children }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full">
                {children}
            </table>
        </div>
    );
};

Table.Head = ({ children }) => (
    <thead className="bg-card">
        {children}
    </thead>
);

Table.Body = ({ children }) => (
    <tbody>
        {children}
    </tbody>
);

Table.Row = ({ children }) => (
    <tr className="border-b border-border last:border-none">
        {children}
    </tr>
);

Table.Th = ({ children, className = "" }) => (
    <th className={`px-5 py-4 text-right text-sm font-semibold ${className}`}>
        {children}
    </th>
);

Table.Td = ({ children, className = "" }) => (
    <td className={`px-5 py-4 ${className}`}>
        {children}
    </td>
);

export default Table;