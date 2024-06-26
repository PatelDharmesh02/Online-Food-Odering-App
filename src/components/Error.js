import { useRouteError } from "react-router-dom";

const Error = () => {
    const { status, statusText } = useRouteError();
  return (
    <div>
        <h1>Oops!!</h1>
        <h2>Something went wrong..</h2>
        <h1>{status + " : " + statusText}</h1>
    </div>
  )
}

export default Error;