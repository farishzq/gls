//user's leave calendar
import React from "react";
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Container } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { Calendar, momentLocalizer } from '@react-next-calendar/core'
import moment from 'moment'
import "@react-next-calendar/core/dist/styles.css"
import { connectToDatabase } from "@/lib/DBconnect";

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    if (session) {
        const client = await connectToDatabase();
        const leaverecord = client.db().collection('users-leave');

        var userLeave = await leaverecord
            .find({
                email: session.user.email
            })
            .toArray();

        userLeave = JSON.parse(JSON.stringify(userLeave));
        console.log(userLeave);

        client.close();

        return {
            props: {
                leaverecord: userLeave,
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

function disabledDate(current) {
    if (!current) {
        // allow empty select
        return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();  // can not select days before today
}

export default function calendar(props) {

    const { data: session, status } = useSession();
    const loading = status === "loading";
    const router = useRouter();
    const localizer = momentLocalizer(moment);

    var activity =
        [{
            id: 0,
            title: "MC sakit",
            allDay: true,
            start: new Date(2022, 6, 8),
            end: new Date(2022, 6, 8),
        }
        ]

    return (
        <Layout session={session}>
            <Container fluid className="px-4 py-2 w-100">

                <div style={{ height: 600 }}>
                    <Calendar
                        localizer={localizer}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        events={activity}
                        disabledDate={disabledDate}
                    />
                </div>

            </Container>
            <Footer />
        </Layout>
    );
};

calendar.auth = true;