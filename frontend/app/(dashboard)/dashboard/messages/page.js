import MessagesTable from "@/components/dashboard/messages/MessagesTable";
import MessagesToolbar from "@/components/dashboard/messages/MessagesToolbar";

export default function MessagesPage() {
    return (
        <div
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            <MessagesToolbar />

            <MessagesTable />
        </div>
    );
}