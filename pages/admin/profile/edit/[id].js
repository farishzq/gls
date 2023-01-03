//edit page for user profile by id. can only be edited by admin
import AdminLayout from "@/components/AdminLayout";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { Row, Col, Container, Table, Button, Input, Form } from "reactstrap";
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

    export default function AdminProfileEdit(props) {

        const { data: session, status } = useSession();
        const loading = status === "loading";
        const [profile, setProfile] = useState(props.profile);
        const router = useRouter();

        //this is the function to go back to list of profiles
        function navigateToProfile() {
            router.push('/admin/profile');
        }

        //this is the function when we post the form to get api
        const editedProfile = async (ev) => {
            ev.preventDefault();

            const formdata = JSON.stringify({
                email: profile.email,
                name: ev.target.name.value,
                myKad: ev.target.myKad.value,
                phone: ev.target.phone.value,
                department: ev.target.department.value,
                role: ev.target.role.value
            });

            const res = await fetch(`http://localhost:3000/api/user/profile/${profile._id}`, {
                method: "PUT",
                body: formdata,
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if (res.ok) {
                toast.success("Profile has been edited successfully.", {
                    onClose: () => navigateToProfile()
                })
            }
            else {
                toast.error("Profile failed to be edited. Please try again.");
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
                            <h2>Users Profile</h2>
                        </Col>
                    </Row>
                    <Form id="resource_form" onSubmit={editedProfile}>
                    <Row className="mb-3">
                        <Col>
                            <Table>
                                <tbody>
                                    <tr><th>Email</th><td><Input type="email" name="email" id="email" defaultValue={profile.email} readOnly /></td></tr>
                                    <tr><th>Name</th><td><Input type="text" name="name" id="name" defaultValue={profile.name} /></td></tr>
                                    <tr><th>myKad</th><td><Input type="text" name="myKad" id="myKad" defaultValue={profile.myKad} /></td></tr>
                                    <tr><th>Phone Number</th><td><Input type="text" name="phone" id="phone" defaultValue={profile.phone} /></td></tr>
                                    <tr><th>Department</th><td><Input type="text" name="department" id="department" defaultValue={profile.department} /></td></tr>
                                    <tr><th>Role</th><td><Input type="text" name="role" id="role" defaultValue={profile.role} /></td></tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Button color="secondary" onClick={() => navigateToProfile()}>&#8592; Back to Profiles</Button>
                    <Button color="success" className="mx-1" type="submit">Update profile</Button>
                    </Form>
                </Container>
            </AdminLayout>
        )
    }

    AdminProfileEdit.auth = true;