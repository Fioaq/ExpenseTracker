import ExpIncMain from "@/components/expenses&income/page";
import { Fragment } from "react";

const Income= () => {
return(
    <Fragment>
        <ExpIncMain transactionType="ingreso" />
    </Fragment>
)
};

export default Income;