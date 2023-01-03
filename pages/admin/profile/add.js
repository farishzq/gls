//add user profile. can only be added by admin
import { getSession, useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
import { Row, Col, Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    if (session) {
        return {
            props: {
                notlogged: true
            }
        }
    }
    return {
        props: {
            notlogged: true
        }
    }
}

export default function AdminProfileAdd(props) {

    const { data: session, status } = useSession();
    const loading = status == "loading";
    const router = useRouter();

    //this is the function to go back to list of profiles
    function navigateToProfile() {
        router.push('/admin/profile');
    }

    //this is the function when we post the form to get api
    const postNewProfile = async(ev) => {
        ev.preventDefault();

        const formdata = JSON.stringify({
            email: ev.target.email.value,
            name: ev.target.name.value,
            myKad: ev.target.myKad.value,
            phone: ev.target.phone.value,
            department: ev.target.department.value,
            role: ev.target.role.value
        });

        const res = await fetch('http://localhost:3000/api/user/profile', {
            method: "POST",
            body: formdata,
            headers: {
                "Content-Type": 'application/json'
            }
        })

        if(res.ok) {
            toast.success("New profile successfully added.",{
                onClose: () => navigateToProfile()
            })
        }
        else {
            toast.error("Profile failed to be added. Please try again.");
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
                    <h2>Add Profile</h2>
                </Col>
            </Row>

            <Row>
                <Form id="resource_form" onSubmit={postNewProfile}>

                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="email" placeholder="Email" required />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="name" sm={2}>Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="name" id="name" placeholder="Name" required />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="myKad" sm={2}>myKad</Label>
                        <Col sm={10}>
                            <Input type="text" name="myKad" id="myKad" placeholder="myKad" required />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="phone" sm={2}>Phone Number</Label>
                        <Col sm={10}>
                            <Input type="text" name="phone" id="phone" placeholder="Phone Number" required />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="department" sm={2}>Department</Label>
                        <Col sm={10}>
                            <Input type="text" name="department" id="department" placeholder="Department" required />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="role" sm={2}>Role</Label>
                        <Col sm={10}>
                            <Input type="text" name="role" id="role" placeholder="Role" required />
                        </Col>
                    </FormGroup>

                    <Button color="primary" onClick={() => navigateToProfile()}>&#8592; Back to Profiles</Button>
                    <Button color="primary" className="mx-1" type="submit">Submit profile</Button>
                    
                </Form>
            </Row>
            </Container>
        </AdminLayout>
    )
}

AdminProfileAdd.auth = true;