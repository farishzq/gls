//user's leave records
import React, { useEffect, useState } from "react";
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { Container, Row, Col, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from "@/components/AdminLayout";
import Footer from "@/components/Footer";
import DataTable from 'react-data-table-component';

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    if (session) {       
        const res = await fetch('http://localhost:3000/api/leave/leave', {
            method: "GET",
        });
        const leaves = await res.json()

        return {
            props: {
                leaves: leaves.data,
                email: session.user.email
            }
        }
    }

    return {
        props: {
            notlogged: true
        }
    }
}

export default function leaveapproval(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [leaves, setleaves] = useState(props.leaves);
    const router = useRouter();

    //function and formula for total days
    function kiraBerapaHari(mula, tamat) {
        let date_1 = new Date(mula);
        let date_2 = new Date(tamat);

        let difference = date_2.getTime() - date_1.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays + 1;
    }

    useEffect(() => {
        setleaves(updateCalc())
    },[])

    function updateCalc() {
        var newLeaves = []
        leaves.forEach((obj) => {
            newLeaves.push({ ...obj, "numdays": kiraBerapaHari(obj.startDate, obj.endDate) })
        })
        return newLeaves
    }
    
    const filtered = [...leaves].filter((a) => {
        return a.leavestatus.includes("Pending")
    })
    

    //function to approve leave
    function ApproveReject(id) {
        router.push(`/admin/approval/${id}`);
    }

    //function to reject leave
    function GoToRecords() {
        router.push('/admin/usersleaverecord');
    }

    //table columns + pagination(sortable: true)
    const columns = [
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Start Date',
            selector: row => row.startDate,
            sortable: true,
        },
        {
            name: 'End Date',
            selector: row => row.endDate,
            sortable: true,
        },
        {
            name: 'Number of days',
            selector: row => row.numdays,
            sortable: true,
        },
        {
            name: 'Leave Type',
            selector: row => row.leaveType,
            sortable: true,
        },
        {
            name: 'Remarks',
            selector: row => row.remarks,
        },
        {
            name: 'Emergency Leave',
            selector: row => row.emergencyLeave == true ? '✅' : '❌',
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.leavestatus,
            sortable: true,
        },
        {
            name: " ",
            cell: (row) => {
                return (
                    <Button color="primary" size="sm" onClick={
                        () => {
                            ApproveReject(row._id)
                        }
                    }>View</Button>
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

                <ToastContainer>
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={true}
                </ToastContainer>

                <Row>
                    <Col>
                        <h2>Leave Approval</h2>
                        <br></br>
                        <DataTable
                            columns={columns}
                            data={filtered}
                            pagination paginationComponentOptions={paginationComponentOptions}>
                        </DataTable>
                    </Col>
                </Row>
                <Button color="primary" onClick={() => GoToRecords()}>Go to Users Leave Record</Button>
            </Container>
            <Footer />
        </AdminLayout>
    );
};

leaveapproval.auth = true;