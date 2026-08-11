const CoursePrice = ({ course }) => {
    const price = course?.discountPrice || course?.price || 0;
    const oldPrice = course?.discountPrice ? course?.price : null;
    const discountPercent = oldPrice && price 
        ? Math.round(((oldPrice - price) / oldPrice) * 100)
        : null;

    return (
        <div>
            <div className="flex items-end gap-3">
                <h2 className="text-4xl font-bold text-primary">
                    {price} ج.م
                </h2>

                {oldPrice && (
                    <span
                        className="
                            text-xl
                            line-through
                            text-text-secondary
                        "
                    >
                        {oldPrice} ج.م
                    </span>
                )}
            </div>

            {discountPercent && (
                <p className="mt-3 text-sm text-green-500">
                    وفر {discountPercent}%
                </p>
            )}
        </div>
    );
};

export default CoursePrice;