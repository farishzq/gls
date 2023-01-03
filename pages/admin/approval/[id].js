//leave approval page by id which allow admin to approve or reject 
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import { Row, Col, Container, Table, Button } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    const id = ctx.query.id;

    if (session) {
        const res = await fetch(`http://localhost:3000/api/leave/${id}`, {
            method: "GET",

        });
        const leaves = await res.json()
        return {
            props: {
                leaves: leaves.data
            }
        }
    }
    return {
        props: {
            notlogged: true
        }
    }
}

export default function AdminApproval(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [leavesData, setleavesData] = useState(props.leaves);
    const router = useRouter();

    function navigateToApproval() {
        router.push('/admin/leaveapproval');
    }

    const approveLeave = async (ev) => {
        ev.preventDefault();

        if (window.confirm(`'Are you sure you want to approve id: ${leavesData._id} ?'`)) {
            const res = await fetch(`http://localhost:3000/api/leave/${leavesData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ leavestatus: "Approved ✅" })
            });
            if (res.ok) {
                toast.success("Leave has been approved", {
                    onClose: () => navigateToApproval()
                })
            }
            else {
                toast.error("Leave request failed to be approved. Please try again");
            }
        }
    }

    const rejectLeave = async (ev) => {
        ev.preventDefault();

        if (window.confirm(`'Are you sure you want to reject id: ${leavesData._id} ?'`)) {
            const res = await fetch(`http://localhost:3000/api/leave/${leavesData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ leavestatus: "Rejected ❌" })
            });
            if (res.ok) {
                toast.success("Leave has been rejected", {
                    onClose: () => navigateToApproval()
                })
            }
            else {
                toast.error("Leave request failed to be rejected. Please try again");
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
                        <h2>Leave Approval</h2>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Table>
                            <tbody>
                                <tr><th>Email</th><td>{leavesData.email}</td></tr>
                                <tr><th>Start Date</th><td>{leavesData.startDate}</td></tr>
                                <tr><th>End Date</th><td>{leavesData.endDate}</td></tr>
                                <tr><th>Number of days</th><td></td></tr>
                                <tr><th>Leave Type</th><td>{leavesData.leaveType}</td></tr>
                                <tr><th>Remarks</th><td>{leavesData.remarks}</td></tr>
                                <tr><th>Emergency Leave</th><td>{leavesData.emergencyLeave == true ? '✅' : '❌'}</td></tr>
                                <tr><th>Status</th><td>{leavesData.leavestatus}</td></tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>              
                <Button color="success" className="mx-1" type="submit" onClick={approveLeave}>Approve</Button>
                <Button color="danger" className="mx-1" type="submit" onClick={rejectLeave}>Reject</Button>
                <hr></hr>
                <Button color="primary"  onClick={() => navigateToApproval()}>&#8592; Back to approval</Button>
            </Container>
        </AdminLayout>
    )
}

AdminApproval.auth = true;