import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children, session }) {
    return (
        <>
            <div className="d-flex">
                <Sidebar session={session}/>
                <div className="w-100">
                    <Navbar session={session} />
                    {children}
                </div>
            </div>
        </>
    )
}