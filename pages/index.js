//front page
import React, { useState } from 'react';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';
import { Row, Col, Container, Card, CardHeader, CardBody, Button } from 'reactstrap';

export default function Index() {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  function handleUpdate(update) {
    setCredentials({ ...credentials, ...update })
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>GFIS HRIS 0.1</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <p>General Leave System</p>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader tag="h3">
              SSO Login
            </CardHeader>
            <CardBody>
              <div>
                {loginError}
              </div>
              <form>
                <div className="py-1">
                  <input type="text"
                    id="email"
                    onChange={(e) => handleUpdate({ email: e.target.value })}
                    className="form-control"
                    placeholder="Email" />
                </div>
                <div className="py-1">
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => handleUpdate({ password: e.target.value })}
                    className="form-control"
                    placeholder="Password" />
                </div>
                <div className="py-1">
                  <Button
                    color="primary"
                    onClick={async () => {
                      //passing credentials object containing username and password
                      const response = await signIn('credentials', {
                        redirect: false,
                        ...credentials
                      })
                      //seeing the full response here
                      console.log(response);
                      if (response.error) {
                        setLoginError(response.error)
                      }
                      else if (response.ok) {
                        //console.log(response);
                        //need to straightaway push admin to admin, instead of admin to user, then to admin
                        //router.push("/sso/user/dashboard")
                        router.push("/user/dashboard")
                      }
                    }}>
                    Login</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}
