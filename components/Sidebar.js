import styles from "@/styles/Sidebar.module.css";
import Link from 'next/Link';
import { signOut } from 'next-auth/react';

export default function Sidebar({session}) {
    return (
        <>
            <nav className={styles.sidebar}>
                <div className={styles.sidebartitle}>
                    <h2>GLS</h2>
                </div>

                <hr />

                <ul className="list-unstyled">
                    <li><Link href="/user/dashboard/">Dashboard</Link></li>
                    <li><Link href="/user/applyleave/">Apply Leave</Link></li>
                    <li><Link href="/user/leaverecord/">Leave Record</Link></li>  
                    <li><Link href="/user/calendar/">Calendar</Link></li>
                </ul>

                <hr />

                <ul className="list-unstyled">
                    <li>
                        <a
                            href={`/api/auth/signout`}
                                onClick={(e) => {
                                e.preventDefault()
                                signOut({
                                    callbackUrl: `/`
                                })
                            }} >LOGOUT
                        </a>
                    </li>
                </ul>

                <hr />
                
                {session.user.role=="administrator" && 
                <>
                <ul className="list-unstyled">
                    <li><Link href="/admin/admindashboard/">Go to Admin Dashboard</Link></li>
                </ul>
                </>
                }

            </nav>
        </>
    )
}