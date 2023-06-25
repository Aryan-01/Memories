import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts); //fetching post from redux
  const classes = useStyles();


// The problem which we are facing here of sending the Id to the most child component is solved using redux
  return (
      !posts.length ? <CircularProgress/> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
        </Grid>
      )
  );
}; 

export default Posts;