import Table from "../../components/Table";
import { type User } from "../../types/user";
import { type Column } from "../../components/Table";

const columns: Column<User>[] = [
    {
        header: "#",
        accessor: "id",
        className: "font-mono text-xs text-slate-400",
    },

    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Role", accessor: "role" },
];

const UserTable = ({ users, loading }: { users: User[]; loading: boolean }) => {
    return (
        <Table
            columns={columns}
            data={users}
            loading={loading}
            emptyMessage="No users found"
        />
    );
};

export default UserTable;
