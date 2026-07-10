import ActionsTable from "@/components/shared/ActionsTable";
import LoadMore from "@/components/shared/LoadMore";
import Table from "@/components/ui/Table";
import {
    HiOutlineArrowDownTray,
    HiOutlineDocument,
    HiOutlineArchiveBox,
    HiOutlineFilm,
    HiOutlineCodeBracket,
} from "react-icons/hi2";

const downloads = [
    {
        id: 1,
        name: "React Cheat Sheet.pdf",
        course: "React Advanced",
        size: "2.4 MB",
        type: "PDF",
        date: "10 يوليو 2026",
    },
    {
        id: 2,
        name: "Source Code.zip",
        course: "Next.js Masterclass",
        size: "18 MB",
        type: "ZIP",
        date: "8 يوليو 2026",
    },
    {
        id: 3,
        name: "Project Files.zip",
        course: "Node.js Backend",
        size: "32 MB",
        type: "ZIP",
        date: "2 يوليو 2026",
    },
    {
        id: 4,
        name: "Landing Page.mp4",
        course: "UI/UX Design",
        size: "185 MB",
        type: "Video",
        date: "30 يونيو 2026",
    },
];

const getIcon = (type) => {
    switch (type) {
        case "PDF":
            return HiOutlineDocument;

        case "ZIP":
            return HiOutlineArchiveBox;

        case "Video":
            return HiOutlineFilm;

        case "Code":
            return HiOutlineCodeBracket;

        default:
            return HiOutlineDocument;
    }
};

const DownloadsTable = () => {
    return (
        <div>
            <Table>
                <Table.Head>
                    <Table.Row
                        className="
                            text-right
                        "
                    >
                        <Table.Th>
                            الملف
                        </Table.Th>

                        <Table.Th>
                            الكورس
                        </Table.Th>

                        <Table.Th>
                            الحجم
                        </Table.Th>

                        <Table.Th>
                            النوع
                        </Table.Th>

                        <Table.Th>
                            تاريخ الإضافة
                        </Table.Th>

                        <Table.Th>
                            تحميل
                        </Table.Th>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {downloads.map((file) => {
                        const Icon = getIcon(file.type);

                        return (
                            <Table.Row
                                key={file.id}
                            >
                                <Table.Td>
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >
                                        <div
                                            className="
                                                text-primary
                                            "
                                        >
                                            <Icon size={22} />
                                        </div>

                                        <span className="font-medium">
                                            {file.name}
                                        </span>
                                    </div>
                                </Table.Td>

                                <Table.Td>
                                    {file.course}
                                </Table.Td>

                                <Table.Td>
                                    {file.size}
                                </Table.Td>

                                <Table.Td>
                                    {file.type}
                                </Table.Td>

                                <Table.Td>
                                    {file.date}
                                </Table.Td>

                                <Table.Td>
                                    <ActionsTable
                                        actions={
                                            <div className="flex gap-3 justify-center items-center text-[20px]">
                                                <HiOutlineArrowDownTray size={18} />
                                            </div>
                                        }
                                    />
                                </Table.Td>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>

            <LoadMore />
        </div>
    );
};

export default DownloadsTable;