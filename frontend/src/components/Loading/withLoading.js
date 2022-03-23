import { Spinner } from "./Spinner";

export function withLoading(WrappedComponent, LoadingComponent = () => <Spinner style={{ fontSize: "20rem", color: "red" }} />) {
    return ({ loading, ...props }) => {
        return loading ? <LoadingComponent /> : <WrappedComponent {...props} />
    }
}