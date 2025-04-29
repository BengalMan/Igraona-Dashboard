import { Modal } from 'antd'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react';
import { useCreate, useOne, useUpdate } from '@refinedev/core';
import ShowTeams from '../ShowTeams';
import CreateTeamForm from './CreateTeamForm';


type CreateTeamFormValues = {
    name: string
    number: number
}


const CreateTeam = () => {
    const { id } = useParams()
    const { mutate, isLoading: loading } = useUpdate()

    const { data, isLoading, isError } = useOne({
        resource: 'tournaments',
        id: id ?? "",
    })

    const tournament = data?.data

    console.log(tournament)



    const [isModalVisible, setIsModalVisible] = useState(true);
    const navigate = useNavigate();

    const goToListPage = () => {
        setIsModalVisible(false)
        navigate(`/tournaments/${id}`);
    };


    const onFinish = (values: CreateTeamFormValues) => {
        mutate({
            resource: "participants",
            id: tournament?.id,
            values: {
                ...values,
            }
        });
        navigate(`/tournaments/${id}`);
    }

    return (
        <ShowTeams>
            <Modal
                open={isModalVisible}
                mask={true}
                onCancel={goToListPage}
                title="Napravi Tim"
                width={512}
                footer={null}
            >
                <CreateTeamForm onFinish={onFinish} />
            </Modal>
        </ShowTeams>
    )
}

export default CreateTeam