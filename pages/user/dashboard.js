//user dashboard
import React, { useState } from "react";
import { getSession, useSession } from 'next-auth/react';
import { Container, Row, Col, Card, CardBody, CardText, CardTitle, CardGroup } from 'reactstrap';
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { connectToDatabase } from "@/lib/DBconnect";

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    //check if session exist
    if (session) {
        const res = await fetch('http://localhost:3000/api/user/profile', {
            method: "GET",
        });
        const profile = await res.json();

        const client = await connectToDatabase();
        const record = client.db().collection('leave-track');

        var leaveTrack = await record
            .find({
                email: session.user.email
            })
            .toArray();

            leaveTrack = JSON.parse(JSON.stringify(leaveTrack));
            console.log(leaveTrack);

        client.close();

        return {
            props: {
                profile: profile.data,
                email: session.user.email,
                ltypes: leaveTrack,
            }
        }
    }
    return {
        props: {
            notlogged: true
        }
    }
}

export default function UserDashboard(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [profile] = useState(props.profile);
    const [leaveTrack] = useState(props.ltypes);

    //filter email
    const filter = [...profile].find((a) => {
        return a.email.includes(session.user.email)
    })

    return (
        <Layout session={session}>
            <Container fluid className="px-4 py-2 w-100">

                <h2>User Dashboard</h2>

                <Row className="g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <Col className="p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary fs-5">{filter.email}</strong>
                        <h3 className="mb-0">{filter.name}</h3>
                        <p className="card-text mb-auto text-muted">{filter.department}</p>
                        <p className="card-text mb-auto text-muted">{filter.role}</p>
                        <p className="card-text mb-auto text-muted">{filter.email}</p>
                        <p className="card-text mb-auto text-muted">{filter.phone}</p>
                    </Col>
                </Row>

                <hr></hr>

                <CardGroup>
                    <Col sm="6">
                        <Card body color="secondary" outline>
                            <CardBody>
                                <CardTitle className="m-1 text-center mb-3" tag="h5">
                                    Annual Leave
                                </CardTitle>
                                <CardText>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center">Eligible</Col>
                                        <Col md={4} className="text-center">Taken</Col>
                                        <Col md={4} className="text-center">Balance</Col>
                                    </Row>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center">{leaveTrack.annualElg}</Col>
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="6">
                        <Card body color="secondary" outline>
                            <CardBody>
                                <CardTitle className="m-1 text-center mb-3" tag="h5">
                                    Medical Leave
                                </CardTitle>
                                <CardText>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center">Eligible</Col>
                                        <Col md={4} className="text-center">Taken</Col>
                                        <Col md={4} className="text-center">Balance</Col>
                                    </Row>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="6">
                        <Card body color="secondary" outline>
                            <CardBody>
                                <CardTitle className="m-1 text-center mb-3" tag="h5">
                                    Paternity Leave
                                </CardTitle>
                                <CardText>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center">Eligible</Col>
                                        <Col md={4} className="text-center">Taken</Col>
                                        <Col md={4} className="text-center">Balance</Col>
                                    </Row>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="6">
                        <Card body color="secondary" outline>
                            <CardBody>
                                <CardTitle className="m-1 text-center mb-3" tag="h5">
                                    Matrimonial Leave
                                </CardTitle>
                                <CardText>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center">Eligible</Col>
                                        <Col md={4} className="text-center">Taken</Col>
                                        <Col md={4} className="text-center">Balance</Col>
                                    </Row>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="6">
                        <Card body color="secondary" outline>
                            <CardBody>
                                <CardTitle className="m-1 text-center mb-3" tag="h5">
                                    Hospitalization Leave
                                </CardTitle>
                                <CardText>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center">Eligible</Col>
                                        <Col md={4} className="text-center">Taken</Col>
                                        <Col md={4} className="text-center">Balance</Col>
                                    </Row>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="6">
                        <Card body color="secondary" outline>
                            <CardBody>
                                <CardTitle className="m-1 text-center mb-3" tag="h5">
                                    Hajj Leave
                                </CardTitle>
                                <CardText>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center">Eligible</Col>
                                        <Col md={4} className="text-center">Taken</Col>
                                        <Col md={4} className="text-center">Balance</Col>
                                    </Row>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="6">
                        <Card body color="secondary" outline>
                            <CardBody>
                                <CardTitle className="m-1 text-center mb-3" tag="h5">
                                    Unrecorded Leave
                                </CardTitle>
                                <CardText>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center">Eligible</Col>
                                        <Col md={4} className="text-center">Taken</Col>
                                        <Col md={4} className="text-center">Balance</Col>
                                    </Row>
                                    <Row className="m-1">
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                        <Col md={4} className="text-center"></Col>
                                    </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </CardGroup>
                
            </Container>
            <Footer />
        </Layout>
    );
};

UserDashboard.auth = true;