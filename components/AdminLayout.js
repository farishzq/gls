import Navbar from "@/components/Navbar";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children, session }) {
    return (
        <>
            <div className="d-flex">
                <AdminSidebar session={session}/>
                <div className="w-100">
                    <Navbar session={session} />
                    {children}
                </div>
            </div>
        </>
    )
}