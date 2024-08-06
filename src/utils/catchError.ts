interface Error {
  message: string;
}
interface Message {
  message?: string;
  error?: Error;
}

interface Response {
  data?: Message;
}

interface ErrorData {
  response?: Response;
  message: string;
}

export const catchError = (error: unknown): string | undefined => {
  let errorMsg: string | undefined = '';
  const errorData = error as ErrorData;

  if (errorData.response) {
    errorMsg = errorData.response?.data?.message;

    if (errorData.response?.data?.error) {
      errorMsg = errorData.response.data.error.message;
    }
  } else {
    //something else happened
    errorMsg = errorData.message;
  }

  console.error("Caught error:", errorMsg); // Log the error message

  return errorMsg;
};
