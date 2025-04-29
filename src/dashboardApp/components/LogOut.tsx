import { LogoutOutlined } from "@ant-design/icons";
import { useLogout } from "@refinedev/core"
import { Spin } from "antd";

const LogOut = () => {
    const { mutate, isLoading } = useLogout()

    const handleLogout = () => {
        try {
            mutate();
        } catch (error) {
            console.error("Neče", error);
        }
    };


    if (isLoading) {
        return <div style={{ textAlign: "center", paddingTop: "20px" }}><Spin size="large" /></div>;
    }

    return (
        <button
            onClick={handleLogout}
            className="gap-2 w-52 p-2 bg-[#4d1010] hover:bg-[#421313] text-white text-sm rounded-lg shadow-md transition"
        >
            <LogoutOutlined className="text-sm pr-2" />
            Log out
        </button>
    )
}

export default LogOut