//playground sample dataset
import React, { useEffect, useState } from "react";
import { getSession, useSession } from 'next-auth/react';
import { Container, Row, Col, Table } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { connectToDatabase } from "@/lib/DBconnect";
import DataTable from 'react-data-table-component';

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    var dset = [];
    
    if (session){
        const client = await connectToDatabase();
        const dataset = client.db().collection('sample-dataset');

        dset = await dataset
        .find({})
        .toArray();

    client.close();

    return{
        props: {
            dataset: JSON.parse(JSON.stringify(dset))
        }
    }

    }
    return {
        props: {
            notlogged: true
        }
    }
}

export default function dataset(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [dset, setDset] = useState([]);
     

    //useEffect for the filters below
    useEffect(() => {
        setDset(props.dataset)
    }, [])
    
    //function for sort by name A-Z
    {/* function SortByName(){
        const sorted = [...dset].sort((a,b) => {
            return a.name > b.name ? 1 : -1
        })
        setDset(sorted);
    }

    //function for sort by name Z-A
    function SortByNameRev(){
        const sorted = [...dset].sort((a,b) => {
            return a.name > b.name ? -1 : 1
        })
        setDset(sorted);
    }

    //function for show single only
    function ShowSingleOnly(){
        const filtered = [...dset].filter((a) => {
            return a.list.includes("Single")
        })
        setDset(filtered);
    }

    //function for show 50+ only
    function Show50Only(){
        const filtered = [...dset].filter((b) => {
            return b.age > 49
        })
        setDset(filtered);
    }

    //function for reset all
    function reset(){
        setDset(props.dataset)
    }
    */}

    //table columns + pagination (sortable: true)
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
        },
        {
            name: 'Country',
            selector: row => row.country,
        },
        {
            name: 'Status',
            selector: row => row.list,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.age,
            sortable: true,
        },
    ];
    
    //pagination
    const paginationComponentOptions = {
        rowsPerPageText: 'records per page: ',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All',
    };

    return (
        <Layout session={session}>       
            <Container fluid className="px-4 py-2 w-100">

                <ToastContainer>
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={true}
                </ToastContainer>

                <Row>
                    <Col>
                        <h2>Dataset</h2>
                        
                        {/* <Button color="primary" onClick={() => SortByName()}>Sort by Name A-Z</Button> <Button color="primary" onClick={() => SortByNameRev()}>Sort by Name Z-A</Button> <Button color="danger" onClick={() => ShowSingleOnly()}>Show Single only</Button> <Button color="info" onClick={() => Show50Only()}>Show 50+ Only</Button> <Button color="warning" onClick={() => reset()}>Reset All</Button> */}
                        <DataTable columns={columns} data={dset} pagination paginationComponentOptions={paginationComponentOptions}>    
                        <Table>
                            <thead>
                                <tr>                                   
                                    <th>Name</th>
                                    <th>Phone</th>      
                                    <th>Email</th>                             
                                    <th>Country</th>
                                    <th>List</th>
                                    <th>Age</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dset.map((dataset) => {
                                    return(
                                <tr key={dataset._id}>  
                                    <td>{dataset.name}</td>    
                                    <td>{dataset.phone}</td>
                                    <td>{dataset.email}</td>                                
                                    <td>{dataset.country}</td>
                                    <td>{dataset.list}</td>
                                    <td>{dataset.age}</td>
                                </tr>
                                )})}
                            </tbody>
                        </Table>
                        </DataTable>   
                    </Col>
                </Row>
            </Container>     
            <Footer />
        </Layout>
    );
};

dataset.auth = true;