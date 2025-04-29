import { useOne } from "@refinedev/core";
import { useParams } from "react-router";


const EditTeam = () => {
    const { id, name } = useParams();

    console.log(name)

    const { data, isLoading } = useOne({
        resource: "tournaments",
        id: id
    })

    const tournament = data?.data

    console.log(tournament?.teams)

    return (
        <div>EditTeam</div>
    )
}

export default EditTeam