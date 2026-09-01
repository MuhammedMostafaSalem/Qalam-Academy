import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openModalDelete } from "@/store/slices/modalDeleteSlice";

const useDeleteModal = () => {
    const dispatch = useDispatch();

    const requestDelete = useCallback(({ itemId, title, message }) => {
        dispatch(openModalDelete({ itemId, title, message }));
    }, [dispatch]);

    return { requestDelete };
};

export default useDeleteModal;
