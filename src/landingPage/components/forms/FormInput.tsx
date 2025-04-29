import React from "react";
import StarIcon from "@mui/icons-material/Star";
import {Form, Input} from "antd";

interface FormInputProps {
    className?: string;
    type?: string;
    placeholder: string;
    name: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 className,
                                                 type = "text",
                                                 placeholder,
                                                 name,
                                                 required,
                                                 onChange,
                                             }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (name.startsWith("player") && value && !value.includes("faceit.com")) {
            e.target.setCustomValidity("Link mora biti sa https://www.faceit.com/");
        } else if (name === "number" && value && value.length < 9) {
            e.target.setCustomValidity("Kontakt telefon mora imati minimalno 9 brojeva");
        } else {
            e.target.setCustomValidity("");
        }

        if (onChange) {
            onChange(e);
        }
    };

    return (
        <Form.Item name={name} rules={[{required: required}]}>
            <Input
                className={`${className} bg-[#181818] w-[512px] text-white px-4 py-2 rounded focus:ring-2 focus:ring-[#8D151F]`}
                variant="borderless"
                size="large"
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </Form.Item>
    );
};

export default FormInput;
