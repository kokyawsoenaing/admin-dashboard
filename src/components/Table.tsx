import React from "react";
import { type ReactNode } from "react";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
}

function Table<T extends { id: number | string }>({
    columns,
    data,
    loading = false,
    emptyMessage = "No data found",
}: TableProps<T>) {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                <p className="text-sm font-medium">Loading...</p>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <p className="text-lg font-semibold">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        {columns.map((col) => (
                            <th
                                key={col.header}
                                className={`px-5 py-3.5 font-semibold text-slate-600 uppercase text-xs ${
                                    col.className || ""
                                }`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={row.id}
                            className={`hover:bg-indigo-50/50 transition-colors duration-100 ${
                                rowIndex % 2 === 0
                                    ? "bg-white"
                                    : "bg-slate-50/40"
                            }`}
                        >
                            {columns.map((col, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`px-5 py-3.5 text-slate-600 ${
                                        col.className || ""
                                    }`}
                                >
                                    {typeof col.accessor === "function"
                                        ? col.accessor(row)
                                        : (row[col.accessor] as ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
