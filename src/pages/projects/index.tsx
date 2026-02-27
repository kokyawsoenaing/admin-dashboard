import React, { useState, useEffect, useMemo } from "react";
import { type Project } from "../../types/project";
import { SquareChartGantt, CircleAlert } from "lucide-react";
import { getProjects } from "../../services/services";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToWord } from "../../utils/exportWord";
import ProjectTable from "./ProjectTable";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import ExportButtons from "../../components/ExportButtons";

const ITEMS_PER_PAGE = 5;

const Projects: React.FC = () => {
    // ─── State ───────────────────────────────────────────────────────────────────
    const [allProjects, setAllProjects] = useState<Project[]>([]);
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
                const data = await getProjects();
                setAllProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Failed to load projects. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array → runs once on mount

    // ─── Filtered Data (computed from search) ─────────────────────────────────────
    const filteredProjects = useMemo(() => {
        if (!searchQuery.trim()) return allProjects;
        return allProjects.filter((project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [allProjects, searchQuery]);

    // Reset to page 1 when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // ─── Pagination ───────────────────────────────────────────────────────────────
    const totalPages = Math.max(
        1,
        Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
    );

    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProjects, currentPage]);

    // ─── Export Handlers ──────────────────────────────────────────────────────────
    const handleExportExcel = () => {
        exportToExcel(allProjects);
    };

    const handleExportWord = async () => {
        await exportToWord(allProjects);
    };

    // ─── Render ───────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 to-blue-50 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                {/* ── Page Header ── */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                            <SquareChartGantt className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                Project List
                            </h1>
                            <p className="text-sm text-slate-500">
                                {loading
                                    ? "Loading..."
                                    : `${filteredProjects.length} of ${allProjects.length} projects`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Main Card ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Card Header: Search + Export */}
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1 w-full sm:w-auto">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />
                        </div>
                        <ExportButtons
                            onExportExcel={handleExportExcel}
                            onExportWord={handleExportWord}
                            disabled={loading || allProjects.length === 0}
                        />
                    </div>

                    {/* Card Body: Table */}
                    <div className="p-5">
                        {/* Error State */}
                        {error ? (
                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                <CircleAlert className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                    {error}
                                </span>
                            </div>
                        ) : (
                            <>
                                <ProjectTable
                                    projects={paginatedProjects}
                                    loading={loading}
                                />

                                {/* Pagination (only show when not loading and there are results) */}
                                {!loading && filteredProjects.length > 0 && (
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

export default Projects;
