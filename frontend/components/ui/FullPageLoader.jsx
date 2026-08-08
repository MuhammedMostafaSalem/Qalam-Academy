const FullPageLoader = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background/80 z-50">
            <div className="flex flex-col items-center gap-4">
                {/* <p className="text-text-secondary font-medium">جاري المعالجة...</p> */}
                <span
                    className="
                        loader
                        inline-block
                        box-border
                        w-[62.4px]
                        h-[62.4px]
                        rounded-full
                        border-t-[3.9px]
                        border-r-[3.9px]
                        border-t-primary
                        border-r-transparent
                        animate-spin
                    "
                ></span>
            </div>
        </div>
    );
};

export default FullPageLoader;