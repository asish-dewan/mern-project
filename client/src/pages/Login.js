import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
        const { data } = await login({
            variables: { ...formState },
        });

        Auth.login(data.login.token);
        } catch (e) {
        console.error(JSON.stringify(e, null, 2));
        }

        // clear form values
        setFormState({
        email: '',
        password: '',
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6"> Create, Share, Support and Build Connections with other enthusiasts like yourself 📻 </p>
                    </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                    {data ? (
                <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                    <form>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name= "email" type="email" placeholder="email" className="input input-bordered" value={formState.email} onChange={handleChange} />
                        </div>
                        <div className="form-control" onSubmit={handleFormSubmit}>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name= "password" type="password" placeholder="password" className="input input-bordered" value={formState.password} onChange={handleChange}/>
                        {/* <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label> */}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type= "submit">Login</button>
                        </div>
                    </form>
                    )}
                {error && (
                        <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span> {error.message} </span>
                        </div>
                        </div>
                        )}
                </div>
            </div>
            </div>
            </div>
        </main>
    );
};

export default Login;
