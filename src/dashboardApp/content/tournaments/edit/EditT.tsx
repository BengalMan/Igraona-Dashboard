import {Edit, useForm, useSelect} from "@refinedev/antd";
import {Button, Checkbox, Form, Input, Layout, Select, Space, theme} from "antd";
import MultiDayEdit from "./MultiDayEdit";
import OneDayEdit from "./OneDayEdit";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";

const {Content} = Layout

const EditTournament = () => {
    const {formProps, saveButtonProps, query, formLoading} = useForm();

    const tournament = query?.data?.data;

    const {selectProps} = useSelect({
        resource: 'games',
        optionLabel: "name",
        optionValue: "name",
    })

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout className="h-screen overflow-hidden" style={{display: 'flex', flexDirection: 'row'}}>
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
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <Form.Item
                            label="Ime turnira"
                            name={'name'}
                            rules={[{required: true}]}
                        >
                            <Input placeholder="Ime turnia"/>
                        </Form.Item>
                        <Form.Item
                            label="Igra"
                            name={'game'}
                            rules={[{required: true}]}
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
                                        <Space key={key} style={{display: 'flex', marginBottom: 8}}
                                               align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={name}
                                                rules={[{required: true}]}
                                            >
                                                <Input placeholder={`${name + 1}`}/>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)}/>
                                        </Space>
                                    ))}
                                    <Form.Item>
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
                                <Input type="date"/>
                            </Form.Item>
                            <div className="flex space-x-2">
                                <Form.Item
                                    label="Traje do"
                                    name={'endingAt'}
                                >
                                    <Input type="date"/>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
};

export default EditTournament