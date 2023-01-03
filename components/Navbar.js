import { Navbar } from "reactstrap";
import styles from "@/styles/Navbar.module.css";

export default function SystemNavbar({ session }){
    return(
        <Navbar className={styles.navbarstyle}>
            <a></a>
            <div>
                <p>{session.user.email}</p>
                <p>{session.user.role}</p>
            </div>
        </Navbar>
    )
}