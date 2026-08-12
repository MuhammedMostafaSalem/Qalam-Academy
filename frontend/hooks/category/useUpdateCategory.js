import { updateCategoryAction } from "@/actions/categoryActions";
import { showToast } from "@/store/slices/toastSlice";
import { useActionState, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const useUpdateCategory = (category, onSuccess, onClose) => {
    const dispatch = useDispatch();

    // Form states
    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [descAr, setDescAr] = useState("");
    const [descEn, setDescEn] = useState("");
    const [type, setType] = useState("course");
    const [isActive, setIsActive] = useState(true);

    // Image states
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);

    // ربط الـ ID بالـ Server Action مسبقاً
    const updateActionWithId = updateCategoryAction.bind(null, category?._id);

    const [state, formAction, isPending] = useActionState(updateActionWithId, {
        success: false,
        error: null,
        category: null,
    });

    // Keep latest callbacks in refs so the success effect only depends on `state`.
    const onSuccessRef = useRef(onSuccess);
    const onCloseRef = useRef(onClose);
    onSuccessRef.current = onSuccess;
    onCloseRef.current = onClose;

    useEffect(() => {
        if (category) {
            setTitleAr(category._translations?.title?.ar || category.title?.ar || category.title || "");
            setTitleEn(category._translations?.title?.en || category.title?.en || "");
            setDescAr(category._translations?.description?.ar || category.description?.ar || category.description || "");
            setDescEn(category._translations?.description?.en || category.description?.en || "");
            setType(category.type || "course");
            setIsActive(category.isActive ?? true);
            setImagePreview(category.image || null);
            setImageFile(null);
            setRemoveImage(false);
        }
    }, [category]);

    // مراقبة الـ state للتعامل مع النجاح أو الفشل وإظهار الـ Toast
    useEffect(() => {
        if (state.success) {
            dispatch(showToast({
                message: state.message || "تم تعديل التصنيف بنجاح",
                type: "success"
            }));

            if (onSuccessRef.current) onSuccessRef.current(state.category);

            onCloseRef.current();
        } else if (state.error) {
            dispatch(showToast({
                message: state.error,
                type: "error"
            }));
        }
    }, [state, dispatch]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setRemoveImage(false);
        }
    }

    // التعامل مع حذف الصورة الحالية
    const handleRemoveCurrentImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setRemoveImage(true);
    }

    return {
        formAction,
        isPending,
        values: {
            titleAr,
            setTitleAr,
            titleEn,
            setTitleEn,
            descAr,
            setDescAr,
            descEn,
            setDescEn,
            type,
            setType,
            isActive,
            setIsActive,
            imagePreview,
            removeImage,
        },
        handlers: {
            handleImageChange,
            handleRemoveCurrentImage,
        },
    }
}

export default useUpdateCategory