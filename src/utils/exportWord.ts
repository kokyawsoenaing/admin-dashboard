import {
    Document,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    TextRun,
    WidthType,
    AlignmentType,
    HeadingLevel,
    BorderStyle,
} from "docx";
import { saveAs } from "file-saver";
import { type Project } from "../types/project";

export async function exportToWord(projects: Project[]): Promise<void> {
    const headers = ["ID", "Title", "Brand", "Category", "Price ($)"];

    // Create header row
    const headerRow = new TableRow({
        children: headers.map(
            (header) =>
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: header,
                                    bold: true,
                                    color: "FFFFFF",
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                        }),
                    ],
                    shading: { fill: "2563EB" },
                    width: { size: 20, type: WidthType.PERCENTAGE },
                    borders: {
                        top: {
                            style: BorderStyle.SINGLE,
                            size: 1,
                            color: "2563EB",
                        },
                        bottom: {
                            style: BorderStyle.SINGLE,
                            size: 1,
                            color: "2563EB",
                        },
                        left: {
                            style: BorderStyle.SINGLE,
                            size: 1,
                            color: "2563EB",
                        },
                        right: {
                            style: BorderStyle.SINGLE,
                            size: 1,
                            color: "2563EB",
                        },
                    },
                }),
        ),
    });

    // Create data rows
    const dataRows = projects.map(
        (project, index) =>
            new TableRow({
                children: [
                    String(project.id),
                    project.title,
                    project.brand,
                    project.category,
                    `$${project.price}`,
                ].map(
                    (value) =>
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [new TextRun({ text: value })],
                                    alignment: AlignmentType.LEFT,
                                }),
                            ],
                            shading: {
                                fill: index % 2 === 0 ? "F1F5F9" : "FFFFFF",
                            },
                            width: { size: 20, type: WidthType.PERCENTAGE },
                            borders: {
                                top: {
                                    style: BorderStyle.SINGLE,
                                    size: 1,
                                    color: "CBD5E1",
                                },
                                bottom: {
                                    style: BorderStyle.SINGLE,
                                    size: 1,
                                    color: "CBD5E1",
                                },
                                left: {
                                    style: BorderStyle.SINGLE,
                                    size: 1,
                                    color: "CBD5E1",
                                },
                                right: {
                                    style: BorderStyle.SINGLE,
                                    size: 1,
                                    color: "CBD5E1",
                                },
                            },
                        }),
                ),
            }),
    );

    const table = new Table({
        rows: [headerRow, ...dataRows],
        width: { size: 100, type: WidthType.PERCENTAGE },
    });

    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        text: "Project List",
                        heading: HeadingLevel.HEADING_1,
                        spacing: { after: 300 },
                    }),
                    new Paragraph({
                        text: `Total Projects: ${projects.length}`,
                        spacing: { after: 200 },
                    }),
                    table,
                ],
            },
        ],
    });

    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, "project-list.docx");
}
