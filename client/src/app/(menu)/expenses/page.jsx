import TransactionForm from "@/components/forms/TransactionForm";
import { Fragment } from "react";

const Expenses= () => {
return(
    <Fragment>
        <TransactionForm transactionName="gasto" />
    </Fragment>
)
};

export default Expenses;