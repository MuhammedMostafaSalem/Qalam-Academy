import Image from "next/image";
import CardTable from "../../shared/CardTable";
import Table from "../../ui/Table";
import portfolioAdmin from "./portfolioAdmin";
import LoadMore from "../../shared/LoadMore";
import ActionsTable from "../../shared/ActionsTable";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

const PortfolioTable = () => {
    const titleHead = [
        "المشروع",
        "العميل",
        "التصنيف",
        "التقنيات",
        "تاريخ الانشاء",
        "الاجراءات",
    ];

    return (
        <div className="mt-[20px]">
            <Table>
                <Table.Head>
                    <Table.Row>
                        {titleHead.map((title, index) => (
                            <Table.Th key={index}>{title}</Table.Th>
                        ))}
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {portfolioAdmin.map(service => (
                        <Table.Row key={service.id}>
                            <Table.Td>
                                <CardTable data={service} />
                            </Table.Td>

                            <Table.Td>{service.customer}</Table.Td>

                            <Table.Td>{service.category}</Table.Td>
                            <Table.Td>
                                <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                                    {service.technologies.map((tech, index) => (
                                        <Image
                                            key={index}
                                            src={tech.img}
                                            alt=""
                                            width={35}
                                            height={35}
                                        />
                                    ))}
                                </div>
                            </Table.Td>

                            <Table.Td className="">{service.createdAt}</Table.Td>

                            <Table.Td>
                                <ActionsTable
                                    actions={
                                        <div className="flex gap-3 justify-center items-center text-[20px]">
                                            <MdOutlineEdit className="text-primary cursor-pointer" />
                                            <div className="text-error cursor-pointer">
                                                <MdOutlineDelete />
                                            </div>
                                        </div>
                                    }
                                />
                            </Table.Td>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <LoadMore />
        </div>
    )
}

export default PortfolioTable