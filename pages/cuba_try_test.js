//user's dashboard
import React, { useState } from "react";
import { getSession, useSession } from 'next-auth/react';
import { Container, Row, Col, Card, CardGroup, CardBody, CardTitle, CardText } from 'reactstrap';
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    if (session) {       
        const res = await fetch('http://localhost:3000/api/types/types', {
            method: "GET",
        });
        const leavetypes = await res.json()

        return {
            props: {
                leavetypes: leavetypes.data,
                email: session.user.email
            }
        }
    }

    if (session) {       
        const res = await fetch('http://localhost:3000/api/types/types', {
            method: "GET",
        });
        const leavetypes = await res.json()

        return {
            props: {
                leavetypes: leavetypes.data,
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

export default function UserDashboard(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [userData, setuserData] = useState(props.user);
    const [leavetypes, setLeaveTypes] = useState(props.leavetypes);

    //function and formula for leave balance
    function calcBal(eligible, taken) {
        let elg = new Number(eligible);
        let tkn = new Number(taken);

        let balance = Math.ceil(elg - tkn);
        return balance;
    }

    return (
        <Layout session={session}>
            <Container fluid className="px-4 py-2 w-100" data={leavetypes}>

                <h2>User Dashboard</h2>

                <hr></hr>

                {/* Leave Type and Balance Section*/}
                
                        <>
                            <CardGroup>
                                <Col sm="6">
                                    <Card body color="secondary" outline>
                                        <CardBody>
                                            <CardTitle className="m-1 text-center mb-3" tag="h5">
                                                Annual Leave
                                            </CardTitle>
                                            <CardText>
                                                <Row className="m-1">
                                                    <Col md={4} className="text-center">Eligable</Col>
                                                    <Col md={4} className="text-center">Taken</Col>
                                                    <Col md={4} className="text-center">Balance</Col>
                                                </Row>
                                                <Row className="m-1">
                                                    <Col md={4} className="text-center">{leavetypes.annualElg}</Col>
                                                    <Col md={4} className="text-center">{leavetypes.annualTkn}</Col>
                                                    <Col md={4} className="text-center">{calcBal(leavetypes.annualElg, leavetypes.annualTkn)}</Col>
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
                                                    <Col md={4} className="text-center">Eligable</Col>
                                                    <Col md={4} className="text-center">Taken</Col>
                                                    <Col md={4} className="text-center">Balance</Col>
                                                </Row>
                                                <Row className="m-1">
                                                    <Col md={4} className="text-center">{leavetypes.medicalElg}</Col>
                                                    <Col md={4} className="text-center">{leavetypes.medicalTkn}</Col>
                                                    <Col md={4} className="text-center">{calcBal(leavetypes.medicalElg, leavetypes.medicalTkn)}</Col>
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
                                                    <Col md={4} className="text-center">Eligable</Col>
                                                    <Col md={4} className="text-center">Taken</Col>
                                                    <Col md={4} className="text-center">Balance</Col>
                                                </Row>
                                                <Row className="m-1">
                                                    <Col md={4} className="text-center">{leavetypes.hajjElg}</Col>
                                                    <Col md={4} className="text-center">{leavetypes.hajjTkn}</Col>
                                                    <Col md={4} className="text-center">{calcBal(leavetypes.hajjElg, leavetypes.hajjTkn)}</Col>
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
                                                    <Col md={4} className="text-center">Eligable</Col>
                                                    <Col md={4} className="text-center">Taken</Col>
                                                    <Col md={4} className="text-center">Balance</Col>
                                                </Row>
                                                <Row className="m-1">
                                                    <Col md={4} className="text-center">{leavetypes.matrimonialElg}</Col>
                                                    <Col md={4} className="text-center">{leavetypes.matrimonialTkn}</Col>
                                                    <Col md={4} className="text-center">{calcBal(leavetypes.matrimonialElg, leavetypes.matrimonialTkn)}</Col>
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
                                                    <Col md={4} className="text-center">Eligable</Col>
                                                    <Col md={4} className="text-center">Taken</Col>
                                                    <Col md={4} className="text-center">Balance</Col>
                                                </Row>
                                                <Row className="m-1">
                                                    <Col md={4} className="text-center">{leavetypes.paternityElg}</Col>
                                                    <Col md={4} className="text-center">{leavetypes.paternityTkn}</Col>
                                                    <Col md={4} className="text-center">{calcBal(leavetypes.paternityElg, leavetypes.paternityTkn)}</Col>
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
                                                    <Col md={4} className="text-center">Eligable</Col>
                                                    <Col md={4} className="text-center">Taken</Col>
                                                    <Col md={4} className="text-center">Balance</Col>
                                                </Row>
                                                <Row className="m-1">
                                                    <Col md={4} className="text-center">{leavetypes.unrecordedElg}</Col>
                                                    <Col md={4} className="text-center">{leavetypes.unrecordedTkn}</Col>
                                                    <Col md={4} className="text-center">{calcBal(leavetypes.unrecordedElg, leavetypes.unrecordedTkn)}</Col>
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
                                                    <Col md={4} className="text-center">Eligable</Col>
                                                    <Col md={4} className="text-center">Taken</Col>
                                                    <Col md={4} className="text-center">Balance</Col>
                                                </Row>
                                                <Row className="m-1">
                                                    <Col md={4} className="text-center">{leavetypes.hospitalizationElg}</Col>
                                                    <Col md={4} className="text-center">{leavetypes.hospitalizationTkn}</Col>
                                                    <Col md={4} className="text-center">{calcBal(leavetypes.hospitalizationElg, leavetypes.hospitalizationTkn)}</Col>
                                                </Row>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </CardGroup>
                        </>
                    
            </Container>
            <Footer />
        </Layout>
    );
};

UserDashboard.auth = true;