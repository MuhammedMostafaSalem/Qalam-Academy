import CategorySelect from "./CategorySelect";
import LevelSelect from "./LevelSelect";
import SearchInput from "./SearchInput";
import SortSelect from "./SortSelect";
import ViewSwitcher from "./ViewSwitcher";

const CoursesToolbar = ({ view, toggleSwitcher }) => {
    return (
        <div
            className="
                mb-10
                rounded-fullCard
                glass
                p-5
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >
                {/* Search & Filters */}
                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        gap-3
                        md:flex-row
                        md:items-center
                    "
                >
                    <SearchInput />
                    <CategorySelect />

                    <LevelSelect />
                </div>

                {/* Sort & View */}
                <div
                    className="
                        flex
                        flex-wrap justify-between
                        items-center
                        gap-3
                    "
                >

                    <SortSelect />

                    <ViewSwitcher
                        view={view}
                        toggleSwitcher={toggleSwitcher}
                    />
                </div>
            </div>
        </div>
    );
};

export default CoursesToolbar;