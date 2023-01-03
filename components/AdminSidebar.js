import styles from "@/styles/Sidebar.module.css";
import Link from 'next/Link';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
    return (
        <>
            <nav className={styles.sidebar}>
                <div className={styles.sidebartitle}>
                    <h2>GLS</h2>
                </div>
                <hr />
                <ul className="list-unstyled">
                    <li><Link href="/admin/admindashboard/">Dashboard</Link></li>
                    <li><Link href="/admin/profile/">Profiles</Link></li>
                    <li><Link href="/admin/profile/add">Add New Profile</Link></li>
                    <li><Link href="/admin/leaveapproval/">Users Leave Approval</Link></li>
                    <li><Link href="/admin/usersleaverecord">Users Leave Record</Link></li>
                </ul>
                <hr />
                <ul className="list-unstyled">
                    <li><a
                        href={`/api/auth/signout`}
                        onClick={(e) => {
                            e.preventDefault()
                            signOut({
                                callbackUrl: `/`
                            })
                        }}
                    >LOGOUT
                    </a></li>
                </ul>

                <hr />

                <ul className="list-unstyled">
                    <li><Link href="/user/dashboard/">Go to User Dashboard</Link></li>
                </ul>
            </nav>
        </>
    )
}