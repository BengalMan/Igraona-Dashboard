import {CreateButton, useForm, useSelect} from "@refinedev/antd";
import {Button, Checkbox, DatePicker, Form, Input, Layout, Select, Space, theme} from "antd";
import {ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined, PlusSquareOutlined} from "@ant-design/icons";
import React from "react";
import {useNavigate} from "react-router";
import dayjs from "dayjs";

const {Content} = Layout

const EditTournament = () => {
    const {formProps, saveButtonProps, query, formLoading} = useForm();
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState<boolean>(false);

    const tournament = query?.data?.data;

    console.log(tournament);


    const {selectProps} = useSelect({
        resource: 'games',
        optionLabel: "name",
        optionValue: "name",
    })

    const toggleChecked = () => {
        setChecked(!checked);
    };


    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout className="h-screen" style={{display: 'flex', flexDirection: 'row'}}>
            <Layout style={{flex: 1, backgroundColor: '#f0f2f5'}}>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Form layout="vertical" {...formProps}>
                        <Form.Item>
                            <div className="flex justify-between w-full">
                                <CreateButton
                                    type="primary"
                                    className="antbutton"
                                    onClick={() => navigate('/tournaments')}
                                    icon={<ArrowLeftOutlined/>}
                                >
                                    Back
                                </CreateButton>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="antbutton"
                                    icon={<PlusSquareOutlined/>}
                                >
                                    Submit
                                </Button>

                            </div>
                        </Form.Item>
                        <Form.Item
                            label="Ime turnira"
                            name={'name'}
                            rules={[{required: true}]}
                        >
                            <Input placeholder="Ime turnira"/>
                        </Form.Item>
                        <Form.Item
                            label="Igra"
                            name={'game'}
                            rules={[{required: true}]}
                            className='flex flex-col'
                        >
                            <Select
                                placeholder="Igra"
                                {...selectProps}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            />
                        </Form.Item>
                        <Form.List name="prizes" rules={[{
                            validator: async (_, prizes) => {
                                if (!prizes || prizes.length === 0) {
                                    return Promise.reject(new Error('At least one prize is required'));
                                }
                            }
                        }]}>
                            {(fields, {add, remove}) => (
                                <>
                                    {fields.map(({key, name, ...restField}) => (
                                        <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={name}
                                                rules={[{required: true}]}
                                                label={`${name + 1}. Mjesto`}
                                            >
                                                <Input placeholder={`${name + 1}`}/>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)}/>
                                        </Space>
                                    ))}
                                    <Form.Item label={"Nagrade"}>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                            Add field
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <div className={'flex justify-evenly'}>
                            <Form.Item
                                label="Broj ljudi u timu"
                                name={'teamSizeRequired'}
                                rules={[{required: true}]}
                            >
                                <Input placeholder="Broj ljudi u timu" type="number"/>
                            </Form.Item>
                            <Form.Item
                                label="Broj ljudi u timu"
                                name={'teamSizeOptional'}
                            >
                                <Input placeholder="Broj ljudi u timu" type="number"/>
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Broj timova"
                            name={'maxNumberOfParticipants'}
                            rules={[{required: true}]}
                        >
                            <Input placeholder="Broj timova" type="number"/>
                        </Form.Item>
                        <div className="flex justify-evenly">
                            <Form.Item
                                label="Traje od"
                                name={'startingAt'}
                                rules={[{required: true}]}
                            >
                                <Input type={'date'}/>
                            </Form.Item>

                            {
                                tournament?.startingAt != tournament?.endingAt ?
                                    <Form.Item
                                        label="Traje do"
                                        name={'endingAt'}
                                    >
                                        <Input type={'date'}/>
                                    </Form.Item>
                                    :
                                    <></>
                            }
                        </div>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
};

export default EditTournament