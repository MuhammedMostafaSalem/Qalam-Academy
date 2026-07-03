import {
    HiOutlinePlay,
} from "react-icons/hi2";

const VideoPlayer = () => {
    return (
        <div
            className="
                relative
                aspect-video
                w-full
                overflow-hidden
                bg-black
            "
        >
            {/* Thumbnail */}
            <div
                className="
                    absolute
                    inset-0
                    bg-[url('/assets/images/course-video-placeholder.jpg')]
                    bg-cover
                    bg-center
                "
            />

            {/* Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    bg-black/40
                "
            />

            {/* Play */}
            <button
                className="
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    h-20
                    w-20
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-white
                    shadow-2xl
                    transition
                    hover:scale-110
                "
            >
                <HiOutlinePlay
                    size={34}
                    className="translate-x-[2px]"
                />
            </button>
        </div>
    );
};

export default VideoPlayer;