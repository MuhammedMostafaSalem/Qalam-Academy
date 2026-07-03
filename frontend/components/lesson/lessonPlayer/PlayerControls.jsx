"use client";

import {
    HiBackward,
    HiForward,
    HiSpeakerWave,
    HiMiniPlayPause,
    HiOutlineArrowsPointingOut,
} from "react-icons/hi2";

const PlayerControls = () => {
    return (
        <div
            className="
                rounded-2xl
                border
                border-border
                bg-card
                p-5
            "
        >
            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-6
                "
            >
                {/* Left */}
                <div className="flex items-center gap-4">
                    <button>
                        <HiBackward size={24} />
                    </button>

                    <button>
                        <HiMiniPlayPause size={30} />
                    </button>

                    <button>
                        <HiForward size={24} />
                    </button>
                </div>

                {/* Progress */}
                <div
                    className="
                        flex
                        flex-1
                        items-center
                        gap-4
                        min-w-[220px]
                    "
                >
                    <span className="text-sm">
                        05:32
                    </span>

                    <div
                        className="
                            h-2
                            flex-1
                            overflow-hidden
                            rounded-full
                            bg-background-alt
                        "
                    >
                        <div
                            className="
                                h-full
                                w-1/3
                                rounded-full
                                bg-primary
                            "
                        />
                    </div>

                    <span className="text-sm">
                        18:40
                    </span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <button>
                        <HiSpeakerWave size={22} />
                    </button>

                    <button>
                        <HiOutlineArrowsPointingOut size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlayerControls;