import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
        _id
        username
        email
        posts {
            _id
            postText
            createdAt
        }
        }
    }
    `;

export const QUERY_POSTS = gql`
    query getPosts {
        posts {
        _id
        postText
        postUser
        createdAt
        }
    }
    `;

export const QUERY_SINGLE_POST = gql`
    query getSinglePost($postId: ID!) {
        post(postId: $postId) {
        _id
        postText
        postUser
        createdAt
        comments {
            _id
            commentText
            createdAt
        }
        }
    }
    `;

    export const QUERY_ME = gql`
    query me {
        me {
        _id
        username
        email
        posts {
            _id
            postText
            postUser
            createdAt
        }
        }
    }
    `;

