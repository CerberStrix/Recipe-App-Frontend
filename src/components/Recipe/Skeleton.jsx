import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import styles from './Recipe.module.scss';

export const PostSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonInfo}>
            <Skeleton variant="text" width="80%" height={45} />
            <div className={styles.skeletonTags}>
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
            </div>
            <div className={styles.skeletonUser}>
              <div className={styles.skeletonUserDetails}>
                <Skeleton variant="text" width={60} height={20} />
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};
