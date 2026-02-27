import Table from "../../components/Table";
import { type Project } from "../../types/project";
import { type Column } from "../../components/Table";

const columns: Column<Project>[] = [
    { header: "ID", accessor: "id" },
    { header: "Title", accessor: "title" },
    { header: "Brand", accessor: "brand" },
    { header: "Category", accessor: "category" },
    {
        header: "Price",
        accessor: (p: Project) => `$${p.price.toFixed(2)}`,
        className: "text-emerald-600 font-semibold",
    },
];

const ProjectTable = ({
    projects,
    loading,
}: {
    projects: Project[];
    loading: boolean;
}) => {
    return (
        <Table
            columns={columns}
            data={projects}
            loading={loading}
            emptyMessage="No projects found"
        />
    );
};

export default ProjectTable;
