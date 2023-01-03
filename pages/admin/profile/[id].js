//show a user's profile by id, able to delete by admin
import AdminLayout from "@/components/AdminLayout";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { Row, Col, Container, Table, Button } from "reactstrap";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    const id = ctx.query.id;
    if (session) {

        const res = await fetch(`http://localhost:3000/api/user/profile/${id}`, {
            method: "GET",
        });
        const profile = await res.json();
        return {
            props: {
                profile: profile.data
            }
        }
    }
    return {
        props: {
            notlogged: true
        }
    }
}

export default function AdminProfileOne(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [profile, setProfile] = useState(props.profile);
    const router = useRouter();

    //this is the function to go back to list of profiles
    function navigateToProfile() {
        router.push('/admin/profile');
    }

    //delete profile
    const deleteProfile = async (ev) => {
        if (window.confirm(`'Are you sure you want to delete id: ${profile._id} ?'`)) {
            const res = await fetch(`http://localhost:3000/api/user/profile/${profile._id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("Profile has been deleted.", {
                    onClose: () => navigateToProfile()
                })
            }
            else {
                toast.error("Profile failed to be deleted. Please try again.");
            }
        }
    }

    return (
        <AdminLayout session={session}>
            <Container fluid className="px-4 py-2 w-100">

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={true}
                />

                <Row>
                    <Col>
                        <h2>Admin Profile</h2>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Table>
                            <tbody>
                                <tr><th>Email</th><td>{profile.email}</td></tr>
                                <tr><th>Name</th><td>{profile.name}</td></tr>
                                <tr><th>myKad</th><td>{profile.myKad}</td></tr>
                                <tr><th>Phone Number</th><td>{profile.phone}</td></tr>
                                <tr><th>Department</th><td>{profile.department}</td></tr>
                                <tr><th>Role</th><td>{profile.role}</td></tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Button color="secondary" onClick={() => navigateToProfile()}>&#8592; Back to Profiles</Button>
                <Button color="danger" className="mx-1" onClick={() => deleteProfile()}>Delete profile</Button>
            </Container>
        </AdminLayout>
    )
}

AdminProfileOne.auth = true;
