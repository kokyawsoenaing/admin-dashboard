import * as XLSX from "xlsx";
import { type Project } from "../types/project";

export function exportToExcel(projects: Project[]): void {
    // Prepare data rows with readable headers
    const worksheetData = projects.map((project) => ({
        ID: project.id,
        Title: project.title,
        Brand: project.brand,
        Category: project.category,
        "Price ($)": project.price,
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();

    // Set column widths
    worksheet["!cols"] = [
        { wch: 6 }, // ID
        { wch: 30 }, // Title
        { wch: 20 }, // Brand
        { wch: 20 }, // Category
        { wch: 12 }, // Price
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
    XLSX.writeFile(workbook, "project-list.xlsx");
}
