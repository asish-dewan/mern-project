import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
        const { data } = await addUser({
            variables: { ...formState },
        });

        Auth.login(data.addUser.token);
        } catch (e) {
        console.error(e);
        }
    };

    return (
        <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
            <div className="card">
            <h4 className="card-header">Sign Up</h4>
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
                                <span className="label-text">Username</span>
                            </label>
                            <input name= "username" type="text" placeholder="username" className="input input-bordered" value={formState.name} onChange={handleChange} />
                        </div>
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
                            <button className="btn btn-primary" type= "submit">Sign Up</button>
                        </div>
                    </form>
                )}

                {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
                )}
            </div>
            </div>
        </div>
        </main>
    );
    };

export default Signup;
