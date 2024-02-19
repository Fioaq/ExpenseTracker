import ExpIncMain from "@/components/expenses&income/page";
import { Fragment } from "react";


const Expenses = () => {
    return (
        <Fragment>
            <ExpIncMain transactionType="gasto" />
        </Fragment>
    )
};

export default Expenses;