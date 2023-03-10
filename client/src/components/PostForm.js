import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const PostForm = () => {
    const [postText, setPostText] = useState('');

    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
        try {
            const { posts } = cache.readQuery({ query: QUERY_POSTS });

            cache.writeQuery({
            query: QUERY_POSTS,
            data: { posts: [...posts, addPost] },
            });
        } catch (e) {
            console.error(e);
        }

        // update me object's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, posts: [...me.posts, addPost] } },
        });
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
        const { data } = await addPost({
            variables: {
                postText,
                postUser: Auth.getProfile().data.username,
            },
        });

        setPostText('');
        } catch (err) {
        console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'postText' && value.length <= 220) {
        setPostText(value);
        setCharacterCount(value.length);
        }
    };

    // Requires refactoring 

    // const fileUpload = form.addEventListener('submit', (e) => {
    //         e.preventDefault()
    //         const formData = new FormData()
    //         formData.append('username', 'Sandra Rodgers')
    //         formData.append('files', file)
        
    //         fetch('http://localhost:8080/upload_files', {
    //         method: 'post',
    //         body: formData,
    //         })
    //         .then((res) => console.log(res))
    //         .catch((err) => ('Error occurred', err))
    //     })

    return (
        <div>
        <h3> Create, Share, Build Connections ! </h3>

        {Auth.loggedIn() ? (
            <>
            <p
                className={`m-0 ${
                characterCount === 220 || error ? 'text-danger' : ''
                }`}
            >
                Character Count: {characterCount}/220
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9">
                <textarea
                    name="postText"
                    placeholder=" "
                    value={postText}
                    className="form-input w-100"
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleChange}
                ></textarea>
                </div>

                <div className="col-12 col-lg-3">
                <button className="btn btn-primary btn-block py-3" type="submit">
                    Add Post
                </button>
                </div>
                {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                    {error.message}
                </div>
                )}
            </form>
            <br></br>
            <div>
            <form>
                <label for="file">Select files</label>
                <input id="file" type="file" name="file" />
                <input type="submit" value="POST to server"></input>
            </form>
            </div>          
            </>
        ) : (
            <p>
                Log in to share ???? {' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </p>
        )}
        </div>
        
    );
    };

export default PostForm;
