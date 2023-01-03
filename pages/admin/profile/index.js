//show all available users
import AdminLayout from "@/components/AdminLayout";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { Row, Col, Container, Table, Button } from "reactstrap";
import { useRouter } from "next/router";
import DataTable from 'react-data-table-component';

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    if (session) {
        const res = await fetch('http://localhost:3000/api/user/profile', {
            method: "GET",
        });
        const profiles = await res.json();
        return {
            props: {
                profiles: profiles.data
            }
        }
    }
    return {
        props: {
            notlogged: true
        }
    }
}

export default function AdminProfile(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [profiles, setProfiles] = useState(props.profiles);
    const router = useRouter();

    //this is the function to ADD new profile
    function navigateToAdd() {
        router.push('/admin/profile/add');
    }

    //this is the function to SHOW profile
    function showProfileByID(id) {
        router.push(`/admin/profile/${id}`);
    }

    //this is the function to EDIT profile
    function editProfile(id) {
        router.push(`/admin/profile/edit/${id}`);
    }

    const columns = [
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'myKad',
            selector: row => row.myKad,
            sortable: true,
        },
        {
            name: 'Department',
            selector: row => row.department,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: " ",
            cell: (row) => {
                return (
                    <> 
                    <Button color="primary" size="sm" onClick={
                        () => {
                            showProfileByID(row._id)
                        }
                    }>Show</Button>

                    <Button color="secondary" size="sm" onClick={
                        () => {
                            editProfile(row._id)
                        }
                    }>Edit</Button>
                    </>
                )
            }
        }
    ];

    //pagination
    const paginationComponentOptions = {
        rowsPerPageText: 'records per page: ',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All',
    };

    return (
        <AdminLayout session={session}>
            <Container fluid className="px-4 py-2 w-100">
                <Row>
                    <Col>
                        <h2>Profiles</h2>
                        <br></br>
                        <DataTable
                            columns={columns}
                            data={profiles}
                            pagination paginationComponentOptions={paginationComponentOptions}>
                        </DataTable>
                    </Col>
                </Row>
                <Button color="primary" onClick={() => navigateToAdd()}>Add new profile</Button>
            </Container>
        </AdminLayout>
    )
}

AdminProfile.auth = true;