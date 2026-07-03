"use client";

import { useState } from "react";
import {
    HiOutlineSquares2X2,
    HiOutlineBars3,
} from "react-icons/hi2";

const ViewSwitcher = () => {
    const [view, setView] = useState("grid");

    return (
        <div
            className="
                flex
                rounded-xl
                border
                border-border
                bg-card
                p-1
            "
        >
            <button
                onClick={() => setView("grid")}
                className={`
                    rounded-lg
                    p-2
                    transition

                    ${view === "grid"
                        ? "bg-primary text-white"
                        : "text-text-secondary"
                    }
                `}
            >
                <HiOutlineSquares2X2 size={20} />
            </button>

            <button
                onClick={() => setView("list")}
                className={`
                    rounded-lg
                    p-2
                    transition

                    ${view === "list"
                        ? "bg-primary text-white"
                        : "text-text-secondary"
                    }
                `}
            >
                <HiOutlineBars3 size={20} />
            </button>
        </div>
    );
};

export default ViewSwitcher;