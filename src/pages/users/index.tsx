import React, { useState, useEffect, useMemo } from "react";
import { type User } from "../../types/user";
import { getUsers } from "../../services/services";
import UserTable from "./UserTable";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import { UsersRound, CircleAlert } from "lucide-react";

const ITEMS_PER_PAGE = 5;

const Users: React.FC = () => {
    // ─── State ───────────────────────────────────────────────────────────────────
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    // ─── Fetch Data (once on mount) ───────────────────────────────────────────────
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getUsers();
                setAllUsers(data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Failed to load users. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs once on mount

    // ─── Filter by name (firstName + lastName) ────────────────────────────────────
    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) return allUsers;
        const query = searchQuery.toLowerCase();
        return allUsers.filter((user) =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(query),
        );
    }, [allUsers, searchQuery]);

    // Reset to page 1 when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // ─── Pagination ───────────────────────────────────────────────────────────────
    const totalPages = Math.max(
        1,
        Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
    );

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    // ─── Render ───────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 to-indigo-50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* ── Page Header ── */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                            <UsersRound className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                User List
                            </h1>
                            <p className="text-sm text-slate-500">
                                {loading
                                    ? "Loading..."
                                    : `${filteredUsers.length} of ${allUsers.length} users`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Main Card ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Card Header: Search */}
                    <div className="p-5 border-b border-slate-100">
                        <div className="max-w-sm">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />
                        </div>
                    </div>

                    {/* Card Body: Table */}
                    <div className="p-5">
                        {error ? (
                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                <CircleAlert className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                    {error}
                                </span>
                            </div>
                        ) : (
                            <>
                                <UserTable
                                    users={paginatedUsers}
                                    loading={loading}
                                />

                                {!loading && filteredUsers.length > 0 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
