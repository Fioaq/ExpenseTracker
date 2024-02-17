import { findUser } from "@/app/api/route";
import { selectUser } from "@/lib/features/users/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { Fragment, useEffect } from "react";

const TransactionList = () => {
    const user = useAppSelector(selectUser);
    const getTransactions = async () => {
        try {
            const result = await findUser(user._id);
            console.log(result.transactions)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <Fragment>

        </Fragment>
    )
};

export default TransactionList;