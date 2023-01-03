//user apply leave
import React from "react";
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Clock from '@/components/Clock';
import { Container, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    return {
        props: {
            email: session.user.email
        }
    }
}
export default function applyleave(props) {

    const { data: session, status } = useSession();
    const loading = status === "loading";
    const router = useRouter();

    //this is the function to go to leave record page
    function navigateToRecord() {
        router.push('/user/leaverecord');
    }


//handle submit
async function handleSubmit(ev) {
    ev.preventDefault();

        const email = session.user.email;
        const startDate = ev.target.startDate.value;
        const endDate = ev.target.endDate.value;
        const leaveType = ev.target.leaveType.value;
        const remarks = ev.target.remarks.value;
        const emergencyLeave = ev.target.emergencyLeave.checked ? true : false;  
        const leavestatus = ("Pending");
    // console.log(newLeaveRecord);

    const res = await fetch('http://localhost:3000/api/leave/leave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, startDate, endDate, leaveType, remarks, emergencyLeave, leavestatus}),
    });
    // console.log(res);

    if(res.ok) {
        toast.success("Leave successfully requested.",{
            onClose: () => navigateToRecord()
        })
    }
    else {
        toast.error("Leave requested unsuccessful. Please try again.");
    }

    //refresh page
    window.location.reload();
}

    return (
        <Layout session={session}>
            <Container fluid className="px-4 py-2 w-100">

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={true}
                />

                <h2>Leave Request Application Form</h2>

                <br></br>
                <Clock />

                {/* Input Form Section */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input
                            type="date"                            
                            className="form-control"
                            id="startDate"
                            placeholder="Enter date"
                            required
                        />
                        <small id="startDateHelp" className="form-text text-muted">Start date of leave</small>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            placeholder="Enter date"
                            required
                        />
                        <small id="endDateHelp" className="form-text text-muted">End date of leave</small>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="leaveType" className="form-label">Leave Type</label>
                        <select class="form-select" aria-label="Default select example" id="leaveType" required>
                            <option><Input defaultValue="Select leave type" readOnly /></option>
                            <option>Annual Leave</option>
                            <option>Medical Leave</option>
                            <option>Maternity Leave</option>
                            <option>Paternity Leave</option>
                            <option>Hajj Leave</option>
                            <option>Hospitalization Leave</option>
                            <option>Unrecorded Leave</option>
                        </select>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="remarks" className="form-label">Remarks</label>
                        <input
                            type="text"
                            className="form-control"
                            id="remarks"
                            required
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <label className="form-check-label" htmlFfor="emergencyLeave">Emergency Leave</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="emergencyLeave"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={() => navigateToRecord()}>Submit</button>

                </form>

            </Container>
            <Footer />
        </Layout>
    );
};

applyleave.auth = true; 