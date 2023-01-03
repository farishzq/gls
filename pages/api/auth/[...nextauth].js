import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/DBconnect";
import { verifyPassword } from "@/lib/Auth";

//import axios from 'axios';
//import {NEXT_PUBLIC_API_URL, NEXT_PUBLIC_DATABASE_URL} from "@/config/index";

const options = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            //NextAuth already knows how to get the credentials of your user but, 
            //how is it going to get the JWT token from Strapi to be able to make a request to the API? 
            //With the function authorize; This function is in charge of sending a request to the Strapi API (auth/local) through axios, 
            //and receive the JWT token and the object of our user

            authorize: async (credentials) => {
                console.log(credentials);
                try {
                    const client = await connectToDatabase();
                    const usersCollection = client.db().collection('users');

                    const user = await usersCollection.findOne({
                        email: credentials.email,
                    });

                    if (!user) {
                        client.close();
                        throw new Error('No user found!');
                    }

                    const isValid = await verifyPassword(
                        credentials.password,
                        user.password
                    );

                    if (!isValid) {
                        client.close();
                        throw new Error('Could not log you in!');
                    }

                    client.close();
                    return { user };

                } catch (error) {
                    //const errorMessage = error.response.data.message[0].messages[0]
                    //throw new Error(errorMessage)
                    throw new Error(error);
                }
            }
        }),
    ],

    //database: `${NEXT_PUBLIC_DATABASE_URL}`,

    //NextAuth lets us choose between saving our data as a session or as a jwt token
    session: {
        jwt: true,
        maxAge: 3 * 24 * 60 * 60,
    },

    //jwt
    jwt: {
        maxAge: 3 * 24 * 60 * 60,
    },

    //getting no-secret error
    //secret: process.env.SECRET,
    secret: "GFISInnovationSolution2020",

    //the callbacks. The jwt function receives the information from the user and send it to our 
    //callback function to be able to use that data in the cookie
    callbacks: {
        //jwt: async (token, user) => {
        jwt: async ({ token, user, account, profile, isNewUser }) => {
            if (user) {
                token.jwt = user.jwt;
                token.user = user.user;
            }
            return Promise.resolve(token);
        },

        session: async ({ session, token, user }) => {
            //session: async (session, token) => {
            session.jwt = token.jwt;
            session.user = token.user;
            return Promise.resolve(session);
        },
    },

    // NextAuth has default pages for login and signup
    pages: {
        signIn: '/',
        error: '/error'
    }
};
const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;