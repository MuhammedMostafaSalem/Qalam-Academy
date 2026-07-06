import Container from "@/components/ui/Container";
import SearchInput from "../../ui/SearchInput";
import CategoryFilter from "./CategoryFilter";
import TechnologyFilter from "./TechnologyFilter";
import SortFilter from "./SortFilter";
import ViewSwitcher from "./ViewSwitcher";
import Toolbar from "@/components/ui/Toolbar";
import Select from "@/components/ui/Select";
import Section from "@/components/sections/Section";

const PortfolioFilters = () => {
    // <section className="py-10">
    //     <Container>
    //         <div
    //             className="
    //                 flex
    //                 flex-col
    //                 gap-5

    //                 lg:flex-row
    //                 lg:items-center
    //                 lg:justify-between
    //             "
    //         >
    //             {/* Search */}
    //             <div className="w-full lg:max-w-md">
    //                 <SearchInput />
    //             </div>

    //             {/* Filters */}
    //             <div
    //                 className="
    //                     flex
    //                     flex-wrap
    //                     items-center
    //                     gap-4
    //                 "
    //             >
    //                 <CategoryFilter />

    //                 <TechnologyFilter />

    //                 <SortFilter />

    //                 <ViewSwitcher />
    //             </div>
    //         </div>
    //     </Container>
    // </section>
    return (
        <Section className="my-10">
            <Container>
                <Toolbar
                    inputPlaceholder="ابحث عن دورة..."
                    filters={
                        <>
                            {/* <CategoryFilter />

                            <TechnologyFilter />

                            <SortFilter /> */}
                            <Select />
                        </>
                    }
                    actions={
                        <>
                            <ViewSwitcher />
                        </>
                    }
                />
            </Container>
        </Section>
    );
};

export default PortfolioFilters;