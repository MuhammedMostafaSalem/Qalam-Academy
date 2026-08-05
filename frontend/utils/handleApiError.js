import axios from "axios";

const handleApiError = (error) => {
    // Axios Error
    if (axios.isAxiosError(error)) {
        // Server responded
        if (error.response) {
            // return {
            //     status: error.response.status,
            //     message:
            //         error.response.data?.message ||
            //         "Something went wrong",
            // };
            return {
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",

                errors:
                    error.response?.data?.errors || {},
            };
        }

        // Request sent but no response
        if (error.request) {
            return {
                status: 503,
                message:
                    "Unable to connect to the server. Please check your internet connection",
            };
        }
    }

    // Unknown Error
    return {
        status: 500,
        message:
            error?.message || "Unexpected error occurred",
    };
};

export default handleApiError;